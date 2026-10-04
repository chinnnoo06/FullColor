import type { Metadata } from "next";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import ToastNotification from "@/components/ui/ToastNotification";
import localFont from 'next/font/local';
import { DM_Sans, Barlow } from "next/font/google";

import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-barlow",
  display: "swap",
});

const beyno = localFont({
  src: '../assets/fonts/BEYNO.otf',
  weight: '400',
  style: 'normal',
  variable: '--font-beyno-local',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "FullColor | Soluciones para hacer crecer tu negocio",
    template: "%s | FullColor",
  },
  description:
    "Impresión, personalización, publicidad y páginas web para hacer crecer tu negocio. Playeras, termos, tazas, lonas, corte láser, DTF y más.",
  keywords: [
    "impresión",
    "artículos promocionales",
    "personalización",
    "playeras personalizadas",
    "termos grabados",
    "sublimación",
    "DTF",
    "corte láser",
    "lonas",
    "páginas web",
  ],
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "FullColor",
    title: "FullColor | Soluciones para hacer crecer tu negocio",
    description:
      "Impresión, personalización, publicidad y páginas web para hacer crecer tu negocio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${dmSans.variable} ${barlow.variable} ${beyno.variable}`}
    >
      <ReactQueryProvider>
      <body className="bg-thrird text-fourth antialiased min-h-screen">
        {children}
         <ToastNotification />
      </body>
      </ReactQueryProvider>
    </html>
  );
}