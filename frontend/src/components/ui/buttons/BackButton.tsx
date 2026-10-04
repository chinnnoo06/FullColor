'use client';

import { useRouter } from 'next/navigation';
import { HiArrowUpRight } from 'react-icons/hi2';
import { TBackButtonProps } from './types';
import { BUTTON_BASE, BUTTON_ICON, BUTTON_VARIANT, BUTTON_WIDTH } from './styles';

export const BackButton = ({ label = 'Volver', variant = 'primary', width = 'fit' }: TBackButtonProps) => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={`${BUTTON_BASE} ${BUTTON_WIDTH[width]} ${BUTTON_VARIANT[variant]}`}
    >
      {label}
      <HiArrowUpRight aria-hidden="true" className={BUTTON_ICON} />
    </button>
  );
};
