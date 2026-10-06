import { WhatsAppLineKeySchema, TWhatsAppLineKey } from '@/schemas/enums.schemas';
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa6';
import ImgPrincipal from '@/assets/media/img1.webp';
import ImgImpresiones from '@/assets/media/img21.webp';
import ImgLaserDtf from '@/assets/media/img22.webp';
import ImgDepotWeb from '@/assets/media/img23.webp';

const WHATSAPP_MESSAGE = 'Hola, me interesa cotizar un proyecto con FullColor.';

export const WHATSAPP_LINE_KEYS = WhatsAppLineKeySchema.options;

export type { TWhatsAppLineKey };

const whatsapp = (key: TWhatsAppLineKey, label: string, display: string, number: string) => ({
  key,
  label,
  display,
  number,
  url: `https://wa.me/${number}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
});

export const WHATSAPP_LINES = [
  whatsapp('principal', 'FullColor Principal', '33 1273 6524', '5213312736524'),
  whatsapp('impresiones', 'FullColor Impresiones', '33 1828 8418', '5213318288418'),
  whatsapp('laser-dtf', 'FullColor Láser y DTF', '33 1414 7664', '5213314147664'),
  whatsapp('depot-web', 'FullColor Depot y Web', '33 1300 9184', '5213313009184'),
] as const;

export const CONTACT_WHATSAPP = {
  ...WHATSAPP_LINES[0],
  label: 'Escríbenos por WhatsApp',
  message: WHATSAPP_MESSAGE,
} as const;

export const CONTACT_EMAIL = {
  address: 'fullcolorgdl@gmail.com',
  href: 'mailto:fullcolorgdl@gmail.com',
} as const;

export const CONTACT_ADDRESS = {
  display: 'C. José Fernando Abascal y Souza 362, San Juan de Dios, 44360 Guadalajara, Jal.',
  href: 'https://maps.app.goo.gl/AztD2dKHkeXam8bNA',
} as const;

export const CONTACT_SOCIAL = {
  instagram: {
    url: 'https://www.instagram.com/fullcolorgdl/',
    label: 'Síguenos en Instagram',
  },
  facebook: {
    url: 'https://www.facebook.com/Fullcolorgdl',
    label: 'Síguenos en Facebook',
  },
} as const;

export const CONTACT_SOCIAL_ITEMS = [
  {
    icon: FaInstagram,
    label: 'Instagram',
    handle: '@fullcolorgdl',
    detail: 'Trabajos, procesos y novedades del taller.',
    url: CONTACT_SOCIAL.instagram.url,
  },
  {
    icon: FaFacebookF,
    label: 'Facebook',
    handle: 'Fullcolorgdl',
    detail: 'Promociones, proyectos terminados y más.',
    url: CONTACT_SOCIAL.facebook.url,
  },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    handle: '33 1273 6524',
    detail: 'Escríbenos directo y te respondemos rápido.',
    url: CONTACT_WHATSAPP.url,
  },
];

export const CONTACT_STEPS = [
  {
    step: '01',
    title: 'Escríbenos',
    detail: 'Llena el formulario o contáctanos por WhatsApp en la línea que mejor se adapte a lo que necesitas.',
  },
  {
    step: '02',
    title: 'Cotizamos',
    detail: 'Te enviamos una propuesta con precios, tiempos y opciones. Sin compromiso, respondemos rápido.',
  },
  {
    step: '03',
    title: 'Producimos',
    detail: 'Aprobada la cotización, comenzamos la producción y te mantenemos informado en cada etapa.',
  },
];

export const WHATSAPP_LINE_CARDS = [
  {
    key: 'principal',
    label: 'FullColor Principal',
    display: '33 1273 6524',
    number: '5213312736524',
    url: `https://wa.me/5213312736524?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    image: ImgPrincipal,
  },
  {
    key: 'impresiones',
    label: 'FullColor Impresiones',
    display: '33 1828 8418',
    number: '5213318288418',
    url: `https://wa.me/5213318288418?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    image: ImgImpresiones,
  },
  {
    key: 'laser-dtf',
    label: 'FullColor Láser y DTF',
    display: '33 1414 7664',
    number: '5213314147664',
    url: `https://wa.me/5213314147664?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    image: ImgLaserDtf,
  },
  {
    key: 'depot-web',
    label: 'FullColor Depot y Web',
    display: '33 1300 9184',
    number: '5213313009184',
    url: `https://wa.me/5213313009184?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    image: ImgDepotWeb,
  },
];
