export const SITE = {
  name: 'FullColor',
  url: 'https://fullcolorgdl.com',
  locale: 'es_MX',
  title: 'FullColor | Impresión, personalización y páginas web en Guadalajara',
  description: 'Taller de impresión y personalización en Guadalajara. Playeras DTF, termos grabados, lonas, corte láser y páginas web para hacer crecer tu negocio.',
  shortDescription: 'Impresión, personalización y páginas web para negocios en Guadalajara.',
  ogImage: '/og-image.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'FullColor – Impresión, personalización y páginas web para negocios en Guadalajara',
} as const;

export const BUSINESS = {
  legalName: 'FullColor GDL',
  email: 'fullcolorgdl@gmail.com',
  phone: '+523312736524',
  address: {
    street: 'C. José Fernando Abascal y Souza 362',
    neighborhood: 'San Juan de Dios',
    locality: 'Guadalajara',
    region: 'Jalisco',
    postalCode: '44360',
    country: 'MX',
  },
  mapsUrl: 'https://maps.app.goo.gl/NZQxKuxFAz175UZx8',
  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '18:00',
  },
} as const;
