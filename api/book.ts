// Vercel Edge Function — POST /api/book.
//
// This is the "simple email" path (see docs/booking-email-setup.md): no
// database, no admin login, no appointment calendar. It just takes what the
// booking stepper already collects (src/components/booking/BookingStepper.tsx)
// and emails it to the business via Resend, so a request doesn't depend on
// the visitor remembering to also click through to Messenger.
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

export const config = { runtime: 'edge' }

type BookingRequest = {
  experience?: string
  preferredDate?: string
  preferredTime?: string
  name?: string
  contact?: string
}

const jsonResponse = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

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
  const contact = body.contact?.trim()
  if (!name || !contact) {
    return jsonResponse(400, { error: 'Name and contact are required.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const notifyEmail = process.env.BOOKING_NOTIFY_EMAIL
  if (!apiKey || !notifyEmail) {
    // Server misconfigured — the client falls back to Messenger/phone in this case.
    return jsonResponse(500, { error: 'Email is not configured on the server yet.' })
  }

  const preferredTime = [body.preferredDate, body.preferredTime].filter(Boolean).join(' ') || 'Not specified'
  const lines = [
    `Experience: ${body.experience || 'Not specified'}`,
    `Preferred time: ${preferredTime}`,
    `Name: ${name}`,
    `Contact: ${contact}`,
  ]

  const looksLikeEmail = /.+@.+\..+/.test(contact)

  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.BOOKING_FROM_EMAIL || 'Bless Day Spa website <onboarding@resend.dev>',
      to: [notifyEmail],
      reply_to: looksLikeEmail ? contact : undefined,
      subject: `New appointment request — ${name}`,
      text: lines.join('\n'),
    }),
  })

  if (!emailRes.ok) {
    const detail = await emailRes.text()
    return jsonResponse(502, { error: 'Failed to send the email.', detail })
  }

  return jsonResponse(200, { ok: true })
}
