import { SITE } from './site';
import type { TLegalSection } from '@/types/content.types';

export const PRIVACIDAD_SECTIONS: TLegalSection[] = [
  {
    title: 'Responsable',
    content: `FullColor, con presencia en Guadalajara, Jalisco, México, es responsable del tratamiento de los datos personales que se recaban a través de este sitio web (${SITE.url}).`,
  },
  {
    title: 'Datos que recopilamos',
    content: 'Al usar el formulario de contacto recopilamos únicamente tu nombre y el mensaje que redactas (asunto y detalles de tu proyecto). No solicitamos correo electrónico, número telefónico ni ningún dato adicional.',
  },
  {
    title: 'Cómo usamos tus datos',
    content: 'La información del formulario se utiliza exclusivamente para responder a tu solicitud de cotización. El mensaje se envía directamente a una línea de WhatsApp de FullColor para darte atención personalizada.',
  },
  {
    title: 'Con quién se comparten',
    content: 'Tus datos no se venden, alquilan ni comparten con terceros. El único destino es la línea de WhatsApp de FullColor seleccionada, a través del servicio de mensajería de Meta (WhatsApp).',
  },
  {
    title: 'Cookies y analítica',
    content: 'Este sitio utiliza Google Analytics para conocer estadísticas anónimas de visitas (páginas vistas, dispositivos, país de origen). No se vinculan con tu identidad personal. También usamos Google Ads para medir el rendimiento de campañas publicitarias a partir de eventos de conversión anónimos.',
  },
  {
    title: 'Tus derechos',
    content: 'Puedes ejercer tus derechos de acceso, rectificación, cancelación u oposición (ARCO) escribiéndonos a través del formulario de contacto o directamente por WhatsApp. Haremos lo posible por atenderte en un plazo de 5 días hábiles.',
  },
  {
    title: 'Cambios a este aviso',
    content: 'Podemos actualizar este aviso en cualquier momento. La versión vigente estará siempre disponible en esta misma página.',
  },
];
