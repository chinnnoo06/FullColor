'use client';

import { useEffect } from 'react';
import { LinkButton } from '@/components/ui/buttons/LinkButton';
import { Button } from '@/components/ui/buttons/Button';

type TErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: TErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-5 px-5 lg:px-15 text-center">
      <p className="font-barlow text-primary text-7xl leading-none font-bold lg:text-9xl">500</p>

      <h1 className="font-barlow text-secondary text-2xl lg:text-3xl font-bold uppercase">
        Algo salió mal
      </h1>

      <p className="text-fourth/75 max-w-md text-base lg:text-lg">
        No pudimos cargar esta página. Suele ser algo momentáneo: vuelve a intentarlo en unos
        segundos o regresa al inicio.
      </p>

      <div className="flex flex-col items-center gap-5 sm:flex-row">
        <Button variant="secondary" onClick={reset}>Reintentar</Button>

        <LinkButton href="/">Volver Al Inicio</LinkButton>
      </div>
    </main>
  );
}
