// Vercel Edge Function — POST /api/book.
//
// This is the "simple email" path (see docs/booking-email-setup.md): no
// database, no admin login, no appointment calendar. It just takes what the
// booking stepper already collects (src/components/booking/BookingStepper.tsx)
// and emails it to the business via Resend, so a request doesn't depend on
// the visitor remembering to also click through to Messenger. If the
// visitor gave an email address, it also sends them a short confirmation so
// they know the request actually went somewhere.
//
// Requires two environment variables set in the Vercel project (not in the
// client bundle — this file only runs on the server):
//   RESEND_API_KEY      — from https://resend.com
//   BOOKING_NOTIFY_EMAIL — the inbox that should receive requests
// Optional:
//   BOOKING_FROM_EMAIL   — defaults to Resend's shared sandbox sender, which
//                          works without verifying a domain but can land in
//                          spam; verify a domain in Resend and set this once
//                          the business wants a nicer "from" address.

import { business } from '../src/content/business'

export const config = { runtime: 'edge' }

type BookingRequest = {
  experience?: string
  preferredDate?: string
  preferredTime?: string
  name?: string
  phone?: string
  email?: string
}

const jsonResponse = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

type EmailRow = { label: string; value: string }

// A small shared layout so the two emails (business notification, visitor
// confirmation) look like they come from the same place. Inline styles and
// a table for the row layout, since email clients don't reliably support
// stylesheets or flex/grid.
const renderEmailHtml = (options: { eyebrow: string; title: string; intro: string; rows: EmailRow[]; footerHtml: string }) => {
  const rowsHtml = options.rows
    .map(
      (row) => `
        <tr>
          <td style="padding:10px 0;border-top:1px solid #DAD6CC;color:#6b6b63;font-size:13px;width:150px;vertical-align:top;">${escapeHtml(row.label)}</td>
          <td style="padding:10px 0;border-top:1px solid #DAD6CC;color:#1C1612;font-size:14px;line-height:1.5;">${escapeHtml(row.value)}</td>
        </tr>`,
    )
    .join('')

  return `
<div style="background:#E3E6DD;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <div style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #DAD6CC;">
    <div style="background:#1C1612;padding:26px 32px;">
      <p style="margin:0;color:#D98CA0;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">${escapeHtml(options.eyebrow)}</p>
      <h1 style="margin:8px 0 0;color:#E3E6DD;font-size:21px;font-weight:600;">${escapeHtml(options.title)}</h1>
    </div>
    <div style="padding:28px 32px;">
      <p style="margin:0 0 18px;color:#1C1612;font-size:15px;line-height:1.55;">${escapeHtml(options.intro)}</p>
      <table style="width:100%;border-collapse:collapse;">${rowsHtml}</table>
      <p style="margin:22px 0 0;color:#6b6b63;font-size:13px;line-height:1.6;">${options.footerHtml}</p>
    </div>
  </div>
</div>`.trim()
}

const sendEmail = (options: { apiKey: string; from: string; to: string; replyTo?: string; subject: string; html: string; text: string }) =>
  fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${options.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: options.from,
      to: [options.to],
      reply_to: options.replyTo,
      subject: options.subject,
      html: options.html,
      text: options.text,
    }),
  })

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed' })
  }

  let body: BookingRequest
  try {
    body = await request.json()
  } catch {
    return jsonResponse(400, { error: 'Invalid request body' })
  }

  const name = body.name?.trim()
  const phone = body.phone?.trim()
  const email = body.email?.trim()
  if (!name || !phone) {
    return jsonResponse(400, { error: 'Name and phone are required.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const notifyEmail = process.env.BOOKING_NOTIFY_EMAIL
  if (!apiKey || !notifyEmail) {
    // Server misconfigured — the client falls back to Messenger/phone in this case.
    return jsonResponse(500, { error: 'Email is not configured on the server yet.' })
  }

  const experience = body.experience || 'Not specified'
  const preferredTime = [body.preferredDate, body.preferredTime].filter(Boolean).join(' ') || 'Not specified'
  const from = process.env.BOOKING_FROM_EMAIL || 'Bless Day Spa website <onboarding@resend.dev>'

  const notifyRows: EmailRow[] = [
    { label: 'Experience', value: experience },
    { label: 'Preferred time', value: preferredTime },
    { label: 'Name', value: name },
    { label: 'Phone', value: phone },
    ...(email ? [{ label: 'Email', value: email }] : []),
  ]
  const notifyHtml = renderEmailHtml({
    eyebrow: 'New appointment request',
    title: name,
    intro: email
      ? 'A visitor submitted a booking request through the website. Reply directly to this email, or use the details below, to reach them.'
      : 'A visitor submitted a booking request through the website. Use the details below to reach them.',
    rows: notifyRows,
    footerHtml: 'Sent automatically from the Bless Day Spa website booking form.',
  })
  const notifyText = [
    `Experience: ${experience}`,
    `Preferred time: ${preferredTime}`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    ...(email ? [`Email: ${email}`] : []),
  ].join('\n')

  const notifyRes = await sendEmail({
    apiKey,
    from,
    to: notifyEmail,
    replyTo: email,
    subject: `New appointment request from ${name}`,
    html: notifyHtml,
    text: notifyText,
  })

  if (!notifyRes.ok) {
    const detail = await notifyRes.text()
    return jsonResponse(502, { error: 'Failed to send the email.', detail })
  }

  // Best-effort only: the spa has already been notified above, so a failure
  // here (for example a Resend sandbox restriction) shouldn't make the
  // visitor's request look like it failed.
  if (email) {
    const confirmationHtml = renderEmailHtml({
      eyebrow: 'Request received',
      title: `Thanks, ${name}.`,
      intro: `${business.name} has received your request below. This is a request, not a confirmed booking: ${business.name} will reach out directly to confirm the time.`,
      rows: [
        { label: 'Experience', value: experience },
        { label: 'Preferred time', value: preferredTime },
      ],
      footerHtml: `Prefer to reach out directly? Call <a href="tel:${business.phone}" style="color:#1C1612;">${escapeHtml(business.phoneDisplay)}</a> or message on <a href="${business.messengerUrl}" style="color:#1C1612;">Facebook</a>.`,
    })
    const confirmationText = [
      `Thanks, ${name}. ${business.name} has received your request below.`,
      'This is a request, not a confirmed booking: ' + business.name + ' will reach out directly to confirm the time.',
      '',
      `Experience: ${experience}`,
      `Preferred time: ${preferredTime}`,
      '',
      `Prefer to reach out directly? Call ${business.phoneDisplay} or message on Facebook: ${business.messengerUrl}`,
    ].join('\n')

    try {
      const confirmationRes = await sendEmail({
        apiKey,
        from,
        to: email,
        subject: `We've received your ${business.name} request`,
        html: confirmationHtml,
        text: confirmationText,
      })
      if (!confirmationRes.ok) {
        console.error('Booking confirmation email failed:', await confirmationRes.text())
      }
    } catch (err) {
      console.error('Booking confirmation email threw:', err)
    }
  }

  return jsonResponse(200, { ok: true })
}
