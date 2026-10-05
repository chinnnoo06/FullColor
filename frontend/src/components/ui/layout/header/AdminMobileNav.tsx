'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ADMIN_LINKS } from '@/utils/data/navigation';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { BulletHex } from '@/components/ui/BulletHex';
import { isExactHref } from '@/utils/activeHref';

type TAdminMobileNavProps = {
    menuVisible: boolean;
    toggleMenu: () => void;
};

export const AdminMobileNav = ({ menuVisible, toggleMenu }: TAdminMobileNavProps) => {
    const pathname = usePathname();

    useEffect(() => {
        if (!menuVisible) return;
        const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') toggleMenu(); };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [menuVisible, toggleMenu]);

    return (
        <div
            inert={!menuVisible}
            aria-hidden={!menuVisible}
            className={`lg:hidden fixed inset-x-0 top-20 bottom-0 z-95 ${menuVisible ? '' : 'pointer-events-none'}`}
        >
            <button
                type="button"
                aria-label="Cerrar menú"
                onClick={toggleMenu}
                className={`bg-thrird/75 absolute inset-0 cursor-pointer backdrop-blur-sm transition-opacity duration-500 ${menuVisible ? 'opacity-100' : 'opacity-0'}`}
            />

            <aside
                aria-label="Menú de administración"
                className={`bg-thrird absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col shadow-2xl shadow-black/50 transition-transform duration-500 before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-linear-to-b before:from-primary before:via-secondary before:to-primary ${menuVisible ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex h-full flex-col overflow-x-hidden overflow-y-auto overscroll-contain p-5">
                    <span className="font-barlow text-primary inline-flex items-center gap-2.5 text-xs tracking-[0.15em] uppercase">
                        <span className="bg-primary h-px w-7.5" />
                        Panel
                    </span>

                    <nav aria-label="Navegación de administración" className="mt-5">
                        <ul role="list" className="border-fourth/30 flex flex-col border-t">
                            {ADMIN_LINKS.map(({ href, label }, i) => {
                                const isActive = isExactHref(pathname, href)

                                return (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            onClick={toggleMenu}
                                            aria-current={isActive ? 'page' : undefined}
                                            style={{ transitionDelay: menuVisible ? `${150 + i * 50}ms` : '0ms' }}
                                            className={`group border-fourth/30 flex items-center gap-5 border-b py-5 transition-all duration-500 ${menuVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                                        >
                                            <span className={`font-barlow flex-1 text-xl leading-none font-medium uppercase transition-colors duration-300 ${isActive ? 'text-primary' : 'text-fourth group-hover:text-secondary'}`}>
                                                {label}
                                            </span>

                                            <BulletHex className={`transition-colors duration-300 ${isActive ? 'fill-primary' : 'fill-fourth/20 group-hover:fill-secondary'}`} />
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    <div
                        style={{ transitionDelay: menuVisible ? `${150 + ADMIN_LINKS.length * 50}ms` : '0ms' }}
                        className={`mt-auto pt-10 transition-all duration-500 ${menuVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                    >
                        <LogoutButton />
                    </div>
                </div>
            </aside>
        </div>
    );
};
