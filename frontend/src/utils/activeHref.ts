
export function isActiveHref(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isExactHref(pathname: string, href: string) {
  return pathname === href;
}
