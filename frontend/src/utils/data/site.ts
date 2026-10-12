
import type { Metadata } from 'next';

export const SITE = {
  name: 'FullColor',
  url: 'https://fullcolorgdl.com',
  locale: 'es_MX',
  title: 'FullColor | Impresión, personalización y páginas web en Guadalajara',
  description: 'Taller de impresión y personalización en Guadalajara. Playeras DTF, termos grabados, lonas, corte láser y páginas web para hacer crecer tu negocio.',
  shortDescription: 'Impresión, personalización y páginas web para negocios en Guadalajara.',
  ogImage: '/og-image.jpeg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'FullColor – Impresión, personalización y páginas web para negocios en Guadalajara',
  themeColor: '#76B82A',
  logo: '/icon.png',
} as const;

export const OG_IMAGE = {
  url: SITE.ogImage,
  width: SITE.ogImageWidth,
  height: SITE.ogImageHeight,
  alt: SITE.ogImageAlt,
};

export const SHARED_OPEN_GRAPH: NonNullable<Metadata['openGraph']> = {
  type: 'website',
  locale: SITE.locale,
  siteName: SITE.name,
  images: [OG_IMAGE],
};

export const SHARED_TWITTER: NonNullable<Metadata['twitter']> = {
  card: 'summary_large_image',
  images: [{ url: SITE.ogImage, alt: SITE.ogImageAlt }],
};

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
