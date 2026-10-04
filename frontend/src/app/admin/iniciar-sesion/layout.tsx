import { SimpleHeader } from '@/components/ui/layout/header/SimpleHeader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Iniciar sesión | Panel · Octa Building Studio' },
  robots: { index: false, follow: false, nocache: true },
};

export default function LoginLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SimpleHeader />

      <main className='pt-20'>{children}</main>
    </>
  );
}
