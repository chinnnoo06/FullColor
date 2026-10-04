'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HamburgerButton } from './HamburgerButton';
import { useHeader } from '@/hooks/ui/useHeader';
import { MobileNav } from './MobileNav';
import { Logo } from '../../Logo';
import { isActiveHref } from '@/utils/activeHref';
import { NAV_LINKS } from '@/utils/data/navigation';
import { SocialButtons } from '@/components/ui/buttons/SocialButtons';

export const Header = () => {
  const { menuVisible, hamburgerRef, actions } = useHeader()
  const pathname = usePathname();

  return (
    <>
      <header className='fixed top-0 inset-x-0 z-100 bg-thrird backdrop-blur-md after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-linear-to-r after:from-primary after:via-secondary after:to-primary'
      >

        <div className="relative max-w-[1700px] mx-auto flex justify-between items-center w-full px-5 xl:px-15 h-20 gap-10">

          <div className="flex items-center justify-start shrink-0">
            <div className="w-11 xl:w-12 shrink-0 transition-transform duration-300 hover:scale-[1.03]">
              <Link href="/" className="no-underline" aria-label="Ir al inicio">
                <Logo sizes="(min-width: 1280px) 192px, 160px" />
              </Link>
            </div>
          </div>

          <div className='hidden lg:flex grow justify-center'>
            <nav aria-label="Navegación principal">
              <ul role="list" className="flex items-center gap-10 xl:gap-15">
                {NAV_LINKS.map((link) => {
                  const isActive = isActiveHref(pathname, link.href)

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={isActive ? 'page' : undefined}
                        className="group relative inline-block py-2.5"
                      >
                        <span
                          className={`uppercase text-base xl:text-lg font-medium font-barlow leading-none transition-colors duration-300 ${isActive ? 'text-primary' : 'text-fourth group-hover:text-secondary'}`}
                        >
                          {link.label}
                        </span>
                        <span aria-hidden="true"
                          className={`absolute inset-x-0 bottom-0 h-[1.5px] origin-left ${isActive ? 'bg-primary scale-x-100' : 'bg-secondary scale-x-0 transition-transform duration-300 group-hover:scale-x-100'}`}
                        />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          <div className="hidden shrink-0 lg:block">
            <SocialButtons />
          </div>

          <div className="flex items-center justify-end shrink-0 lg:hidden">
            <HamburgerButton
              ref={hamburgerRef}
              open={menuVisible}
              toggleMenu={actions.toggleMenu}
            />
          </div>
        </div>

      </header>

      <MobileNav menuVisible={menuVisible} toggleMenu={actions.toggleMenu} />
    </>
  );
}
