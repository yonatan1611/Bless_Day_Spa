import { business } from '../../content/business'

// Persistent floating entry point to WhatsApp, visible on every public
// page. Kept in the site's own ink/plaster palette (not stock WhatsApp
// green) so it reads as part of this design system rather than a bolted-on
// widget; the glyph alone carries the brand recognition.
export const WhatsAppButton = () => (
  <a
    href={business.whatsappUrl}
    target="_blank"
    rel="noreferrer"
    className="whatsapp-fab"
    aria-label="Chat with us on WhatsApp"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true" className="whatsapp-fab__icon">
      <path
        fill="currentColor"
        d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.15-.15.3-.4.45-.6.15-.2.2-.35.3-.57.1-.22.05-.4-.02-.57-.08-.15-.6-1.45-.83-1.98-.2-.47-.4-.4-.56-.4-.15 0-.37-.02-.57-.02s-.52.07-.8.37c-.27.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.07 3.17 5.06 4.3 2.98 1.13 2.98.76 3.52.7.53-.05 1.73-.7 1.98-1.4.25-.68.25-1.26.17-1.4-.07-.12-.27-.2-.57-.35Z"
      />
      <path
        fill="currentColor"
        d="M12.02 2C6.5 2 2 6.47 2 11.96c0 1.86.52 3.6 1.4 5.1L2 22l5.1-1.33a10.1 10.1 0 0 0 4.92 1.26h.01c5.52 0 10-4.47 10-9.96S17.54 2 12.02 2Zm0 18.2h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.1.81.83-3-.2-.31a8.14 8.14 0 0 1-1.25-4.4c0-4.5 3.69-8.17 8.22-8.17 2.2 0 4.26.86 5.82 2.4a8.1 8.1 0 0 1 2.4 5.77c0 4.5-3.69 8.17-8.23 8.17Z"
      />
    </svg>
  </a>
)
