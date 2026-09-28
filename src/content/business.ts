// Single source of truth for verified business facts.
// Every field here traces back to docs/research.md. Do not add unverified
// details (exact address, phone, email, WhatsApp) until the business confirms them.

export const business = {
  name: 'Bless Day Spa',
  city: 'Addis Ababa, Ethiopia',
  areaDescription: 'Wollo Sefer, just off Ethio-China Road',
  landmark: 'Near the Meskel Flower roundabout',
  servesDescription: 'A full-service day spa for women and men.',
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
} as const
