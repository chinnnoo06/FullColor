'use client';

import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { HamburgerButton } from './HamburgerButton';
import { AdminMobileNav } from './AdminMobileNav';
import { useHeader } from '@/hooks/ui/useHeader';

export const SimpleHeader = ({ showMenu = false }: { showMenu?: boolean;}) => {
    const { menuVisible, hamburgerRef, actions } = useHeader();

    return (
        <>
            <header className='fixed top-0 inset-x-0 z-100 bg-thrird backdrop-blur-md after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-linear-to-r after:from-primary after:via-secondary after:to-primary'>

                <div className={`relative max-w-[1700px] mx-auto flex items-center w-full px-5 lg:px-15 h-20 gap-10 ${showMenu ? 'justify-between lg:justify-center' : 'justify-center'
                    }`}>

                    <div className="flex items-center justify-start shrink-0">
                        <div className="w-11 xl:w-12 shrink-0 transition-transform duration-300 hover:scale-[1.03]">
                            <Link href="/" className="no-underline" aria-label="Ir al inicio">
                                <Logo sizes="(min-width: 1280px) 192px, 160px" />
                            </Link>
                        </div>
                    </div>

                    {showMenu && (
                        <div className="flex items-center justify-end shrink-0 lg:hidden">
                            <HamburgerButton
                                ref={hamburgerRef}
                                open={menuVisible}
                                toggleMenu={actions.toggleMenu}
                            />
                        </div>
                    )}

                </div>
            </header>

            {showMenu && (
                <AdminMobileNav menuVisible={menuVisible} toggleMenu={actions.toggleMenu} />
            )}
        </>
    )
}
