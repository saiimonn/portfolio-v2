import type { Metadata, Viewport } from "next";
import localFont from "next/font/local"
import "./globals.css";
import AppProvider from "./provider";
import { OPEN_GRAPH, PERSON_ID, SITE_URL, jsonLd } from "./data/site";

const generalSans = localFont({
  src: '../public/fonts/GeneralSans-Variable.woff2',
  weight: '200 700',
  display: 'swap',
  variable: '--font-general',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Simon Gabriel Gementiza - Web Developer",
    template: "%s | Simon Gabriel Gementiza"
  },
  description: 
    "Simon Gabriel Gementiza (Saiimonn) is a web developer building full-stack applications with Next.js, React, and Laravel. See selected projects and get in touch.",
  authors: [{ name: "Simon Gabriel Gementiza", url: SITE_URL }],
  creator: "Simon Gabriel Gementiza",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    ...OPEN_GRAPH,
    url: "/",
    title: "Simon Gabriel Gementiza - Web Developer",
    description: "Web developer building full-stack applications with Next.js, React, and Laravel.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simon Gabriel Gementiza - Web Developer",
    description: "Web developer building full-stack applications with Next.js, React, and Laravel.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // verification: { google: "<token from Search Console>" },
};

export const viewport: Viewport = {
  themeColor: "#121212",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Simon Gabriel Gementiza",
  alternateName: ["Saiimonn", "Simon Gementiza", "Sai"],
  description:
    "Full-stack web developer and computer science student at the University of San Carlos in Cebu City, Philippines, building with Next.js, React, Laravel, and Supabase.",
  url: SITE_URL,
  image: `${SITE_URL}/images/me.jpg`,
  jobTitle: "Full-Stack Web Developer",
  email: "gementizasgg08@gmail.com",
  worksFor: { "@type": "Organization", name: "EvoTech Software Solutions Inc." },
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of San Carlos" },
  homeLocation: { "@type": "Place", name: "Cebu City, Philippines" },
  knowsAbout: ["Next.js", "React", "TypeScript", "Laravel", "Supabase", "Flutter", "Full-stack web development"],
  sameAs: [
    "https://github.com/saiimonn",
    "https://www.linkedin.com/in/simon-gabriel-gementiza-9abb59279/",
    "https://www.instagram.com/_saiimonn",
    "https://www.facebook.com/simongabriel.gementiza",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Simon Gabriel Gementiza",
  inLanguage: "en",
  author: { "@id": PERSON_ID },
  publisher: { "@id": PERSON_ID },
};

// Runs before first paint so returning visitors never see the preloader flash
const preloadFlagScript = `try{if(sessionStorage.getItem("preloaded")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.preloaded="1"}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preloadFlagScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(websiteJsonLd) }}
        />
      </head>
      <body
        id="top"
        className={`${generalSans.variable} font-sans antialiased`}
      >
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
