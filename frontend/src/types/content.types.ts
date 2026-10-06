import type { StaticImageData } from 'next/image';
import type { IconType } from 'react-icons';

export type TWebFeature = {
  title: string;
  detail: string;
  image: StaticImageData;
};

/** Producto de FullColor Depot. Hoy es data local; en el futuro vendrá del backend. */
export type TProduct = {
  name: string;
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
