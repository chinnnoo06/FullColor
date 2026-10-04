'use client';

import { HiArrowRight } from 'react-icons/hi2';
import { TLinkButtonVariant, TLinkButtonWidth } from './types';
import { BUTTON_BASE, BUTTON_ICON, BUTTON_VARIANT, BUTTON_WIDTH } from './styles';

type TButtonProps = React.ComponentPropsWithRef<'button'> & {
  variant?: TLinkButtonVariant;
  width?: TLinkButtonWidth;
  loading?: boolean;
  loadingText?: string;
};

export const Button = ({
  children,
  variant = 'primary',
  width = 'fit',
  loading = false,
  loadingText = 'Enviando…',
  disabled,
  className,
  type = 'button',
  ...props
}: TButtonProps) => {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`${BUTTON_BASE} ${BUTTON_WIDTH[width]} ${BUTTON_VARIANT[variant]} disabled:cursor-not-allowed disabled:opacity-50 ${className ?? ''}`}
    >
      {loading ? loadingText : children}
      <HiArrowRight aria-hidden="true" className={BUTTON_ICON} />
    </button>
  );
};
