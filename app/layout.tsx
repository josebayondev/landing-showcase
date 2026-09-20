import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Preloader } from "@/components/preloader";
import { ScrollBlur } from "@/components/scroll-blur";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { ThemeScript } from "@/components/theme-script";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SOCIAL_LINKS,
} from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Fuente variable para titulares (h1-h6), estilo geométrico y expresivo
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Sin metadataBase, las URLs relativas de openGraph/alternates no se
  // resuelven y la tarjeta que comparte LinkedIn se queda sin imagen.
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SOCIAL_LINKS.github }],
  creator: SITE_NAME,
  alternates: { canonical: "/" },
  // La imagen la añade app/opengraph-image.tsx por convención de fichero: no
  // hace falta declararla aquí, Next la inyecta en og:image y twitter:image.
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

// Datos estructurados para que los buscadores relacionen el sitio con la
// persona y sus perfiles públicos.
const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: "Software Developer",
  email: `mailto:${SOCIAL_LINKS.email}`,
  sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.github],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        {/* Primer tabulador de la página: deja saltarse el navbar. Invisible
            hasta que recibe el foco con teclado. */}
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-full focus:border focus:border-black/10 focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium dark:focus:border-white/10"
        >
          Saltar al contenido
        </a>

        {/* Después del skip link, que tiene que seguir siendo el primer
            elemento tabulable del body. */}
        <Preloader />

        <ScrollBlur />
        <Navbar />
        <ScrollIndicator />

        <main id="content" className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
