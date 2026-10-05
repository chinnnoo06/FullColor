import type { StaticImageData } from 'next/image';
import type { IconType } from 'react-icons';

export type TSlide = {
    image: StaticImageData
    alt: string
    label: string
    shape: 'tall' | 'wide'
}

export type TWebFeature = {
  title: string;
  detail: string;
  image: StaticImageData;
};

export type TNavLink = { label: string; href: string };

export type TSectionSpacing = 'both' | 'top' | 'bottom' | 'none';

export type TSocialLink = { label: string; url: string; icon: IconType };

/** Producto de FullColor Depot. Hoy es data local; en el futuro vendrá del backend. */
export type TProduct = {
  name: string;
  image: StaticImageData;
};

/** Servicio que ofrece Full Color. Hoy es data local; en el futuro vendrá del backend. */
export type TService = {
  slug: string;
  title: string;
  description: string;
  image: StaticImageData;
};

export type TContactSocialItem = {
  icon: IconType;
  label: string;
  handle: string;
  detail: string;
  url: string;
};

export type TContactProcessStep = {
  step: string;
  title: string;
  detail: string;
};

export type TWhatsAppLineCard = {
  key: string;
  label: string;
  display: string;
  number: string;
  url: string;
  image: StaticImageData;
};
