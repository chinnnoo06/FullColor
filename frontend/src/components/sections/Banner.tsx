'use client';

import Image, { type StaticImageData } from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { fadeBlur } from '@/utils/motion/reveal';

type TBannerProps = {
  image: StaticImageData;
  className?: string;
};

export const Banner = ({ image, className }: TBannerProps) => {
  return (
    <Reveal variants={fadeBlur}>
      <div className="relative overflow-hidden">
        <Image
          src={image}
          alt=""
          sizes="100vw"
          placeholder="blur"
          className={`h-[60svh] lg:h-[clamp(500px,80dvh,720px)] w-full object-cover ${className}`}
        />

      </div>
    </Reveal>
  );
};
