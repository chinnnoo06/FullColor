'use client';

import Link from 'next/link';
import { HiArrowUpRight } from 'react-icons/hi2';
import { TLinkButtonProps } from './types';
import { BUTTON_BASE, BUTTON_ICON, BUTTON_VARIANT, BUTTON_WIDTH } from './styles';

export const LinkButton = ({ href, children, variant = 'primary', width = 'fit' }: TLinkButtonProps) => {
  const isExternal = /^https?:\/\//.test(href);

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`${BUTTON_BASE} ${BUTTON_WIDTH[width]} ${BUTTON_VARIANT[variant]}`}
    >
      {children}
      <HiArrowUpRight aria-hidden="true" className={BUTTON_ICON} />
    </Link>
  );
};
