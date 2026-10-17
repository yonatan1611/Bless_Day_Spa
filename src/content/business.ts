// Single source of truth for verified business facts.
// Every field here traces back to docs/research.md. Do not add unverified
// details (exact address, email, WhatsApp) until the business confirms them.

export const business = {
  name: 'Bless Day Spa',
  city: 'Addis Ababa, Ethiopia',
  areaDescription: 'Wollo Sefer, just off Ethio-China Road',
  landmark: 'Near the Meskel Flower roundabout',
  servesDescription: 'A full-service day spa for women and men.',
  // Confirmed by the site maintainer as the main number to call — see the
  // phone-number update in docs/research.md. phone is the raw tel: target;
  // phoneDisplay is the human-readable form shown in the UI.
  phone: '+251912646675',
  phoneDisplay: '+251 91 264 6675',
  // The business's office landline (previously seen unconfirmed in
  // directory listings as `011 416 9211`; confirmed by the site maintainer
  // October 2026 — see docs/research.md).
  officePhone: '+251114169211',
  officePhoneDisplay: '+251 11 416 9211',
  // First-party fact from the business's own flyer ("Full Service Spa with
  // over 20 years of Experience in Addis Ababa in Wollo Sefer") — see the
  // first-party addendum in docs/research.md.
  yearsExperience: '20+',
  hours: {
    label: 'Daily, 9:30 AM-8:00 PM',
    note: 'Hours shown in public business listings. Please confirm availability before visiting.',
  },
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Bless%20Day%20Spa%2C%20Addis%20Ababa',
  messengerUrl: 'https://m.me/blessdayspa',
  // Same verified number as `phone` above — confirmed by the site maintainer
  // as also being the business's WhatsApp number.
  whatsappUrl: 'https://wa.me/251912646675?text=' + encodeURIComponent('Hi! I\'d like to book an appointment at Bless Day Spa.'),
  // Lets a CTA ask about a specific treatment by name instead of the
  // generic message above (e.g. from a treatment detail page).
  whatsappUrlFor: (treatmentTitle: string) =>
    'https://wa.me/251912646675?text=' +
    encodeURIComponent(`Hi! I'd like to book ${treatmentTitle} at Bless Day Spa.`),
  // Verified by matching the business's own phone numbers/address in each
  // profile's bio — see docs/research.md. Facebook itself blocks automated
  // fetching, but its username matches messengerUrl above (m.me/blessdayspa).
  facebookUrl: 'https://www.facebook.com/blessdayspa/',
  instagramUrl: 'https://www.instagram.com/blessdayspa/',
  tiktokUrl: 'https://www.tiktok.com/@bless.day.spa',
} as const
