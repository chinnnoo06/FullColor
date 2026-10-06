import { SITE, BUSINESS } from '@/utils/data/site';
import { CONTACT_SOCIAL } from '@/utils/data/contact';

const socialProfiles = [
  CONTACT_SOCIAL.instagram.url,
  CONTACT_SOCIAL.facebook.url,
];

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE.url}/#negocio`,
  name: SITE.name,
  legalName: BUSINESS.legalName,
  description: SITE.description,
  url: SITE.url,
  image: `${SITE.url}${SITE.ogImage}`,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  hasMap: BUSINESS.mapsUrl,
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.locality,
    addressRegion: BUSINESS.address.region,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: BUSINESS.address.country,
  },
  areaServed: [
    { '@type': 'City', name: 'Guadalajara' },
    { '@type': 'City', name: 'Zapopan' },
    { '@type': 'Country', name: 'México' },
  ],
  sameAs: socialProfiles,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: BUSINESS.openingHours.days,
      opens: BUSINESS.openingHours.opens,
      closes: BUSINESS.openingHours.closes,
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios de impresión y personalización',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Impresión digital', description: 'Impresión de alta calidad en lonas, vinilos, papel y más soportes.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'DTF textil', description: 'Estampado full color en playeras, hoodies, gorras y cualquier textil.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Corte y grabado láser', description: 'Corte y grabado de precisión en madera, acrílico, cuero y metal.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Artículos personalizados', description: 'Termos, tazas, bolsas y artículos promocionales con tu marca.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Publicidad y señalética', description: 'Lonas, banners, roll ups, señalética y displays publicitarios.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Páginas web', description: 'Diseño y desarrollo de páginas web a medida para negocios locales.' } },
    ],
  },
};

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  name: SITE.name,
  url: SITE.url,
  inLanguage: 'es-MX',
  publisher: { '@id': `${SITE.url}/#negocio` },
};

export const StructuredData = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify([localBusiness, website]) }}
  />
);
