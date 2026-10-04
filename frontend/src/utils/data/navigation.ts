import { TNavLink, TSocialLink } from '@/types/content.types';
import { FiLogOut } from 'react-icons/fi';
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa6';
import { CONTACT } from './contact';

export const NAV_LINKS: TNavLink[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'FullColor Depot', href: '/depot' },
  { label: 'FullColor Web', href: '/web' },
  { label: 'Contacto', href: '/contacto' },
];

export const SOCIAL_LINKS: TSocialLink[] = [
  { label: CONTACT.social.instagram.label, url: CONTACT.social.instagram.url, icon: FaInstagram },
  { label: CONTACT.social.facebook.label, url: CONTACT.social.facebook.url, icon: FaFacebookF },
  { label: CONTACT.whatsapp.label, url: CONTACT.whatsapp.url, icon: FaWhatsapp },
];

export const LEGAL_LINKS: TNavLink[] = [
  { label: 'Privacidad y aviso legal', href: '/privacidad' },
  { label: 'Licencia y Creditos', href: '/creditos' },
];

export const ADMIN_LINKS: TNavLink[] = [
  { label: 'Categorías de FC', href: '/admin/fullcolor-categorias-servicios' },
  { label: 'Crear categoría de FC', href: '/admin/fullcolor-categorias-servicios/crear' },
  { label: 'Servicios de FC', href: '/admin/fullcolor-servicios' },
  { label: 'Crear servicio de FC', href: '/admin/fullcolor-servicios/crear' },
  { label: 'Productos de FC Depot', href: '/admin/fullcolor-depot-productos' },
  { label: 'Crear Producto de FC Depot', href: '/admin/fullcolor-depot-productos/crear' },
  { label: 'Projectos de FC Web', href: '/admin/fullcolor-web-projectos' },
  { label: 'Crear Projecto de FC Web', href: '/admin/fullcolor-web-projectos/crear' },
];

export const ADMIN_LOGOUT = { label: 'Cerrar sesión', icon: FiLogOut } as const;
