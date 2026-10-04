import { TService } from '@/types/content.types';
import img1 from '@/assets/media/img1.webp';
import img2 from '@/assets/media/img2.webp';
import img3 from '@/assets/media/img3.webp';
import img4 from '@/assets/media/img4.webp';
import img5 from '@/assets/media/img5.webp';
import img6 from '@/assets/media/img6.webp';
import img7 from '@/assets/media/img7.webp';

export const SERVICES: TService[] = [
  {
    slug: 'impresion-digital',
    title: 'Impresión digital',
    description: 'Couché, opalina, adherible, bond y albanene con acabados brillantes, mate o barnizados.',
    image: img4,
  },
  {
    slug: 'impresion-offset',
    title: 'Impresión offset',
    description: 'Tarjetas de presentación, volantes, notas y papelería corporativa en tirajes grandes.',
    image: img5,
  },
  {
    slug: 'gran-formato',
    title: 'Lonas y gran formato',
    description: 'Lonas, vinil, microperforado y canvas para fachadas, eventos y puntos de venta.',
    image: img1,
  },
  {
    slug: 'playeras-personalizadas',
    title: 'Playeras personalizadas',
    description: 'Serigrafía, DTF, vinil textil y sublimación para uniformes, eventos y equipos.',
    image: img2,
  },
  {
    slug: 'sublimacion',
    title: 'Sublimación',
    description: 'Tazas, termos, aluminio, telas y porta gafetes con tu diseño a todo color.',
    image: img5,
  },
  {
    slug: 'corte-grabado-laser',
    title: 'Corte y grabado láser',
    description: 'Grabado en termos, madera, acrílico y piel. Detalle fino para regalos y reconocimientos.',
    image: img3,
  },
  {
    slug: 'termos-tazas',
    title: 'Termos y tazas',
    description: 'Termos grabados o sublimados y tazas mágicas, blancas o de color para tu marca.',
    image: img6,
  },
  {
    slug: 'regalos-corporativos',
    title: 'Regalos corporativos',
    description: 'Libretas, tablas grabadas, llaveros y kits personalizados para clientes y equipo.',
    image: img7,
  },
  {
    slug: 'publicidad-displays',
    title: 'Publicidad y displays',
    description: 'Coroplast, estireno, trovicel, banderas, caballetes y señalética con instalación.',
    image: img1,
  },
  {
    slug: 'paginas-web',
    title: 'Páginas web',
    description: 'Diseño y desarrollo de tu sitio para que tu marca también crezca en línea.',
    image: img2,
  },
];
