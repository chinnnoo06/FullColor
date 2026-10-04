'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ADMIN_LINKS } from '@/utils/data/navigation';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { BulletHex } from '../BulletHex';
import { isExactHref } from '@/utils/activeHref';
export const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="hidden lg:block lg:sticky lg:top-20 lg:h-[calc(100vh-4.5rem)] lg:w-80 lg:shrink-0">
            <div className="bg-thrird relative flex h-full flex-col after:absolute after:inset-y-0 after:right-0 after:w-0.5 after:bg-linear-to-b after:from-primary after:via-secondary after:to-primary">
                <nav aria-label="Panel de administración">
                    <ul role="list" className="border-fourth/30 flex flex-col border-t">
                        {ADMIN_LINKS.map(({ href, label }) => {
                            const isActive = isExactHref(pathname, href)

                            return (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        aria-current={isActive ? 'page' : undefined}
                                        className="border-fourth/30 group flex items-center gap-5 border-b px-5 py-5 transition-colors duration-300"
                                    >
                                        <span className={`font-barlow flex-1 text-lg leading-none font-medium uppercase transition-colors duration-300 ${isActive ? 'text-primary' : 'text-fourth group-hover:text-secondary'}`}>
                                            {label}
                                        </span>

                                        <BulletHex className={`transition-colors duration-300 ${isActive ? "fill-primary" : "fill-fourth/20 group-hover:fill-secondary"}`} />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <LogoutButton className="group mt-auto flex items-center gap-5 px-5 py-5 font-barlow text-base font-medium uppercase transition-colors duration-300 hover:bg-red-600/10" />
            </div>
        </aside>
    );
};
