import { TFCDepotProduct } from '@/schemas/fcDepotProduct/fcDepotProduct.schemas';
import { SITE } from '@/utils/data/site';

type TDepotProductStructuredDataProps = {
  product: TFCDepotProduct;
  imageUrl: string;
};

export const DepotProductStructuredData = ({ product, imageUrl }: TDepotProductStructuredDataProps) => {
  const productUrl = `${SITE.url}/depot/${product.slug}`;

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${productUrl}/#producto`,
    name: product.seo.metaTitle,
    description: product.seo.metaDescription,
    url: productUrl,
    image: product.images.map((img) => `${imageUrl}/${img}`),
    ...(product.colors.length > 0 && { color: product.colors.map((c) => c.name).join(', ') }),
    brand: { '@type': 'Brand', name: SITE.name },
    manufacturer: { '@id': `${SITE.url}/#negocio` },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'MXN',
      price: product.retailPrice,
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${SITE.url}/#negocio` },
    },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'FullColor Depot', item: `${SITE.url}/depot` },
      { '@type': 'ListItem', position: 3, name: product.name, item: productUrl },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([productSchema, breadcrumb]) }}
    />
  );
};
