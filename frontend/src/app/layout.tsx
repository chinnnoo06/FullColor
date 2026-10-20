import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import ToastNotification from "@/components/ui/ToastNotification";
import localFont from 'next/font/local';
import { DM_Sans, Barlow } from "next/font/google";
import { StructuredData } from "@/components/seo/StructuredData";
import { SITE, SHARED_OPEN_GRAPH, SHARED_TWITTER } from "@/utils/data/site";
import "./globals.css";

const GA_ID  = 'G-LRZ0FW7LFG';
const ADS_ID = 'AW-978013065';

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
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: 'Impresión y personalización',
  keywords: [
    'impresión Guadalajara',
    'personalización de artículos',
    'playeras personalizadas Guadalajara',
    'DTF textil Guadalajara',
    'corte láser Guadalajara',
    'termos grabados',
    'lonas publicitarias',
    'artículos promocionales Guadalajara',
    'páginas web Guadalajara',
    'FullColor',
    'FullColor Depot',
    'FullColor Web',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: { ...SHARED_OPEN_GRAPH, url: '/', title: SITE.title, description: SITE.shortDescription },
  twitter: { ...SHARED_TWITTER, title: SITE.title, description: SITE.shortDescription },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
};

export const viewport: Viewport = {
  themeColor: SITE.themeColor,
  colorScheme: 'dark',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX" className={`${dmSans.variable} ${barlow.variable} ${beyno.variable}`}>
      <body className="bg-thrird text-fourth antialiased min-h-screen">
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
          gtag('config', '${ADS_ID}');
          function gtagSendEvent(url) {
            var callback = function() { if (typeof url === 'string') window.location = url; };
            gtag('event', 'conversion_event_submit_lead_form', {
              'event_callback': callback,
              'event_timeout': 2000,
            });
            return false;
          }
        `}</Script>
        <StructuredData />
        <ReactQueryProvider>
          {children}
          <ToastNotification />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
