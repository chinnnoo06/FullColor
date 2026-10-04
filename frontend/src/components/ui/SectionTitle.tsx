'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { rotatorY, rotatorTransition } from '@/utils/motion/rotator';

type TSectionTitleProps = {
  lead: string;
  rotating: string;
  trail?: string;
  tone?: 'dark' | 'light';
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  size?: 'section' | 'hero';
};

const TONE = {
  dark: 'text-fourth',
  light: 'text-thrird',
} as const;

const SIZE = {
  section: 'text-[2rem] small:text-[2.25rem] md:text-[3rem] lg:text-[4rem]',
  hero: 'text-[2.5rem] small:text-[2.75rem] md:text-[3.5rem] lg:text-[4.5rem] xl:text-[5rem] 2xl:text-[5.5rem]',
} as const;

const LINE = 'h-[1.2em]';

export const SectionTitle = ({
  lead,
  rotating,
  trail,
  tone = 'dark',
  align = 'left',
  as: Heading = 'h2',
  size = 'section',
}: TSectionTitleProps) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { amount: 0 });
  const reduced = useReducedMotion();

  const copia = (tenue: boolean, aria: boolean) => (
    <span
      aria-hidden={aria}
      className={`flex items-center ${LINE} ${tenue ? 'text-primary/75' : 'text-primary'}`}
    >
      {rotating}
    </span>
  );

  return (
    <Heading
      ref={ref}
      className={`${SIZE[size]} ${TONE[tone]} font-barlow uppercase font-bold leading-[1.2] tracking-[-0.02em] ${align === 'center' ? 'text-center' : ''}`}
    >
      {lead}{' '}
      <span className={`inline-block max-w-full overflow-hidden align-bottom ${LINE}`}>
        <motion.span
          className="flex flex-col"
          animate={{ y: inView && !reduced ? rotatorY : '0%' }}
          transition={rotatorTransition}
        >
          {copia(false, false)}
          {copia(true, true)}
          {copia(false, true)}
        </motion.span>
      </span>
      {trail ? ` ${trail}` : ''}
    </Heading>
  );
};