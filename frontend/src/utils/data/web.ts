import type { IconType } from 'react-icons'
import { FCWebTechnologySchema, TFCWebTechnology } from '@/schemas/enums.schemas';
export type { TFCWebTechnology } from '@/schemas/enums.schemas';
import img12 from '@/assets/media/img12.webp';
import img13 from '@/assets/media/img13.webp';
import img14 from '@/assets/media/img14.webp';
import img18 from '@/assets/media/img18.webp';
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
    title: 'Adaptable a tu giro',
    detail: 'Estructura y contenido pensados para lo que vende tu negocio.',
    image: img18,
  },
  {
    title: 'Totalmente personalizable',
    detail: 'Colores, secciones y textos a tu medida, sin plantillas rígidas.',
    image: img12,
  },
  {
    title: 'Responsiva',
    detail: 'Se ve bien en celular, tablet y computadora.',
    image: img14,
  },
  {
    title: 'Rápida y optimizada',
    detail: 'Carga ligera para que el cliente no se vaya antes de conocerte.',
    image: img13,
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
