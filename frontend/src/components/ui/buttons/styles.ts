import { TLinkButtonVariant, TLinkButtonWidth } from './types';

export const BUTTON_BASE =
  'group inline-flex items-center justify-center gap-2.5 rounded-xl border px-5 py-2.5 text-sm font-medium transition-colors duration-300 lg:text-base cursor-pointer';

export const BUTTON_VARIANT: Record<TLinkButtonVariant, string> = {
  primary: 'border-primary bg-primary text-fourth hover:border-secondary hover:bg-secondary',
  secondary: 'border-fourth bg-transparent text-fourth hover:border-primary hover:bg-primary hover:text-thrird',
  thrird: 'border-primary bg-transparent text-primary hover:border-primary hover:bg-primary hover:text-thrird',
};

export const BUTTON_WIDTH: Record<TLinkButtonWidth, string> = {
  fit: 'w-fit',
  full: 'w-full',
  responsive: 'w-full small:w-fit',
};

export const BUTTON_ICON =
  'size-4 shrink-0 stroke-1 lg:size-4.5';
