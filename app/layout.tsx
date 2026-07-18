import type { Metadata } from "next";
import localFont from "next/font/local"
import "./globals.css";
import AppProvider from "./provider";

const generalSans = localFont({
  src: '../public/fonts/GeneralSans-Regular.woff2',
  display: 'swap',
})

const SITE_URL = "https://saiimonn.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Simon Gabriel Gementiza - Web Developer",
    template: "%s | Simon Gementiza"
  },
  description: 
    "Simon Gabriel Gementiza (Saiimonn) is a web developer building full-stack applications with Next.js, React, and Laravel. See selected projects and get in touch.",
  keywords: ["Simon Gabriel Gementiza", "saiimonn", "web developer", "Next.js", "React", "Laravel"],
  authors: [{ name: "Simon Gabriel Gementiza", url: SITE_URL }],
  creator: "Simon Gabriel Gementiza",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: SITE_URL,
    siteName: "Simon Gabriel Gementiza",
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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Simon Gabriel Gementiza",
  alternateName: "saiimonn",
  url: SITE_URL,
  image: `${SITE_URL}/images/me.jpg`,
  jobTitle: "Web Developer",
  email: "gementizasgg08@gmail.com",
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
  url: SITE_URL,
  name: "Simon Gabriel Gementiza",
  author: { "@id": `${SITE_URL}/#person` },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${generalSans.className} antialiased`}
      >
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
