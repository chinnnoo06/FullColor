import { WhatsAppLineKeySchema, TWhatsAppLineKey } from '@/schemas/enums.schemas';

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

const WHATSAPP_LINES = [
  whatsapp('principal', 'FullColor Principal', '33 1273 6524', '5213312736524'),
  whatsapp('impresiones', 'FullColor Impresiones', '33 1828 8418', '5213318288418'),
  whatsapp('laser-dtf', 'FullColor Láser y DTF', '33 1414 7664', '5213314147664'),
  whatsapp('depot-web', 'FullColor Depot y Web', '33 1300 9184', '5213313009184'),
] as const;

export const CONTACT = {
  whatsapp: {
    ...WHATSAPP_LINES[0],
    label: 'Escríbenos por WhatsApp',
    message: WHATSAPP_MESSAGE,
  },

  whatsappLines: WHATSAPP_LINES,

  email: {
    address: 'fullcolorgdl@gmail.com',
    href: 'mailto:fullcolorgdl@gmail.com',
  },

  social: {
    instagram: {
      url: 'https://www.instagram.com/fullcolorgdl/',
      label: 'Síguenos en Instagram',
    },
    facebook: {
      url: 'https://www.facebook.com/Fullcolorgdl',
      label: 'Síguenos en Facebook',
    },
  },
} as const;
