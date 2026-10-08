'use client';

import Image, { type StaticImageData } from 'next/image';
import { Marquee } from '@/components/ui/Marquee';
import { Reveal } from '@/components/ui/Reveal';
import { BulletHex } from '@/components/ui/BulletHex';
import { fadeBlur } from '@/utils/motion/reveal';

type TMarqueeBannerProps = {
  image: StaticImageData;
  items: readonly string[];
  imageClassName?: string;
  marqueeClassName?: string;
  bulletClassName?: string;
};

export const MarqueeBanner = ({
  image,
  items,
  imageClassName,
  marqueeClassName = 'bg-primary text-thrird',
  bulletClassName = 'fill-thrird',
}: TMarqueeBannerProps) => {
  return (
    <div>
      <Marquee duration={90} gap={20} className={`${marqueeClassName} py-5`}>
        {items.map((item) => (
          <span
            key={item}
            className="font-barlow flex items-center gap-5 text-sm font-semibold tracking-[0.15em] whitespace-nowrap uppercase lg:text-base"
          >
            {item}
            <BulletHex className={bulletClassName} />
          </span>
        ))}
      </Marquee>

      <Reveal variants={fadeBlur}>
        <div className="relative overflow-hidden">
          <Image
            src={image}
            alt=""
            sizes="100vw"
            placeholder="blur"
            className={`h-[60svh] lg:h-[clamp(500px,90dvh,720px)] w-full object-cover ${imageClassName ?? ''}`}
          />
        </div>
      </Reveal>
    </div>
  );
};
