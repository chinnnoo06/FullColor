import type { MetadataRoute } from 'next';
import { SITE } from '@/utils/data/site';
import { getFCDepotProductsService } from '@/services/server/fcDepotProduct.service';
import { getFCWebProjectsService } from '@/services/server/fcWebProject.service';

export const revalidate = 3600;

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: SITE.url,                        lastModified: new Date(), changeFrequency: 'monthly', priority: 1   },
  { url: `${SITE.url}/servicios`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${SITE.url}/depot`,             lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
  { url: `${SITE.url}/web`,               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${SITE.url}/contacto`,          lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.5 },
];

const collectDepotProducts = async () => {
  const products = [];
  try {
    const first = await getFCDepotProductsService();
    products.push(...first.fcDepotProducts);
    for (let page = 2; page <= first.pagination.totalPages; page++) {
      const next = await getFCDepotProductsService(page);
      products.push(...next.fcDepotProducts);
    }
  } catch { /* API caída: no bloquea el sitemap */ }
  return products;
};

const collectWebProjects = async () => {
  const projects = [];
  try {
    const first = await getFCWebProjectsService();
    projects.push(...first.fcWebProjects);
    for (let page = 2; page <= first.pagination.totalPages; page++) {
      const next = await getFCWebProjectsService(page);
      projects.push(...next.fcWebProjects);
    }
  } catch { /* API caída: no bloquea el sitemap */ }
  return projects;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [depotProducts, webProjects] = await Promise.all([
    collectDepotProducts(),
    collectWebProjects(),
  ]);

  const depotRoutes: MetadataRoute.Sitemap = depotProducts.map((p) => ({
    url: `${SITE.url}/depot/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const webRoutes: MetadataRoute.Sitemap = webProjects.map((p) => ({
    url: `${SITE.url}/web/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...STATIC_ROUTES, ...depotRoutes, ...webRoutes];
}
