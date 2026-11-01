import { FiLogOut } from 'react-icons/fi';

export const NAV_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'FullColor Depot', href: '/depot' },
  { label: 'FullColor Web', href: '/web' },
  { label: 'Contacto', href: '/contacto' },
];

export const LEGAL_LINKS = [
  { label: 'Privacidad y aviso legal', href: '/privacidad' },
];

export const ADMIN_LINKS = [
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
