import type { IconType } from 'react-icons'
import { FCWebTechnologySchema, TFCWebTechnology } from '@/schemas/enums.schemas';
export type { TFCWebTechnology } from '@/schemas/enums.schemas';
import img1 from '@/assets/media/img29.webp';
import img2 from '@/assets/media/img30.webp';
import img3 from '@/assets/media/img31.webp';
import img4 from '@/assets/media/img32.webp';
import { FaReact } from 'react-icons/fa'
import {
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiNestjs,
} from 'react-icons/si'

export const WEB_FEATURES = [
  {
    title: 'Planeación estratégica',
    detail: 'Conocemos tu negocio y sus objetivos para desarrollar un plan web a tu medida.',
    image: img1,
  },
  {
    title: 'Diseño personalizado',
    detail: 'Creamos una página web única, adaptada a la identidad y necesidades de tu marca.',
    image: img2,
  },
  {
    title: 'Diseño responsivo',
    detail: 'Tu sitio se adapta a computadoras, tabletas y celulares para una experiencia óptima.',
    image: img3,
  },
  {
    title: 'Asesoría y atención al cliente',
    detail: 'Te acompañamos durante el proceso y resolvemos tus dudas para garantizar la mejor experiencia.',
    image: img4
  },
];

export const FC_WEB_TECHNOLOGIES = FCWebTechnologySchema.options;

export const FC_WEB_TECHNOLOGIES_MAP: Record<TFCWebTechnology, { icon: IconType; color: string; label: string }> = {
    javascript:  { icon: SiJavascript,  color: '#f0db4f', label: 'JavaScript'  },
    typescript:  { icon: SiTypescript,  color: '#3178c6', label: 'TypeScript'  },
    tailwind:    { icon: SiTailwindcss, color: '#38bdf8', label: 'Tailwind'    },
    react:       { icon: FaReact,       color: '#61dafb', label: 'React'       },
    nextjs:      { icon: SiNextdotjs,   color: '#ffffff', label: 'Next.js'     },
    expressjs:   { icon: SiExpress,     color: '#ffffff', label: 'Express.js'  },
    nestjs:      { icon: SiNestjs,      color: '#e0234e', label: 'NestJS'      },
    mongodb:     { icon: SiMongodb,     color: '#47A248', label: 'MongoDB'     },
    postgresql:  { icon: SiPostgresql,  color: '#336791', label: 'PostgreSQL'  },
}

export const WEB_BUSINESS_TYPES = [
  'Restaurantes', 'Consultorios', 'Boutiques', 'Talleres', 'Despachos', 'Gimnasios', 'Estéticas', 'Escuelas',
] as const;
