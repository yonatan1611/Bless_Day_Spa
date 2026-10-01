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
  // First-party fact from the business's own flyer ("Full Service Spa with
  // over 20 years of Experience in Addis Ababa in Wollo Sefer") — see the
  // first-party addendum in docs/research.md.
  yearsExperience: '20+',
  hours: {
    label: 'Daily, 9:30 AM–8:00 PM',
    note: 'Hours shown in public business listings. Please confirm availability before visiting.',
  },
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Bless%20Day%20Spa%2C%20Addis%20Ababa',
  messengerUrl: 'https://m.me/blessdayspa',
  // Verified by matching the business's own phone numbers/address in each
  // profile's bio — see docs/research.md. Facebook itself blocks automated
  // fetching, but its username matches messengerUrl above (m.me/blessdayspa).
  facebookUrl: 'https://www.facebook.com/blessdayspa/',
  instagramUrl: 'https://www.instagram.com/blessdayspa/',
  tiktokUrl: 'https://www.tiktok.com/@bless.day.spa',
} as const
