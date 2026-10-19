import type { Metadata } from 'next';
import { SHARED_OPEN_GRAPH, SHARED_TWITTER } from '@/utils/data/site';
import { PRIVACIDAD_SECTIONS } from '@/utils/data/privacidad';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SectionTitle } from '@/components/ui/SectionTitle';

export const metadata: Metadata = {
  title: 'Privacidad y Aviso Legal',
  description: 'Aviso de privacidad de FullColor. Conoce qué datos recopilamos, cómo los usamos y para qué.',
  alternates: { canonical: '/privacidad' },
  robots: { index: false, follow: false },
  openGraph: { ...SHARED_OPEN_GRAPH, url: '/privacidad', title: 'Privacidad y Aviso Legal | FullColor', description: 'Aviso de privacidad de FullColor.' },
  twitter: { ...SHARED_TWITTER, title: 'Privacidad y Aviso Legal | FullColor', description: 'Aviso de privacidad de FullColor.' },
};

export default function PrivacidadPage() {
  return (
    <section id="privacidad-aviso" data-section="privacidad-aviso" className="bg-thrird py-15 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-5 lg:px-15">
        <div className="flex flex-col gap-10 lg:gap-15 max-w-3xl">

          <div className="flex flex-col gap-5">
            <SectionLabel>Legal</SectionLabel>
            <SectionTitle as="h1" lead="Privacidad y" rotating="aviso legal" />
            <p className="text-fourth/60 text-sm lg:text-base">
              Última actualización: octubre 2025
            </p>
          </div>

          <div className="flex flex-col gap-10">
            {PRIVACIDAD_SECTIONS.map((s) => (
              <div key={s.title} className="flex flex-col gap-2.5">
                <h2 className="font-barlow text-fourth text-lg lg:text-xl font-bold uppercase">
                  {s.title}
                </h2>
                <p className="text-fourth/75 text-sm lg:text-base leading-relaxed">
                  {s.content}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
