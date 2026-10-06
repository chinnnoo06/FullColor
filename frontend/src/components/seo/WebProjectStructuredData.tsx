import { TFCWebProject } from '@/schemas/fcWebProject/fcWebProject.schemas';
import { SITE } from '@/utils/data/site';

type TWebProjectStructuredDataProps = {
  project: TFCWebProject;
  imageUrl: string;
};

export const WebProjectStructuredData = ({ project, imageUrl }: TWebProjectStructuredDataProps) => {
  const projectUrl = `${SITE.url}/web/${project.slug}`;

  const creativeWork = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${projectUrl}/#proyecto`,
    name: project.seo.metaTitle,
    description: project.seo.metaDescription,
    url: projectUrl,
    ...(project.images.length > 0 && { image: `${imageUrl}/${project.images[0]}` }),
    ...(project.href && { sameAs: project.href }),
    creator: { '@id': `${SITE.url}/#negocio` },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'FullColor Web', item: `${SITE.url}/web` },
      { '@type': 'ListItem', position: 3, name: project.name, item: projectUrl },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([creativeWork, breadcrumb]) }}
    />
  );
};
