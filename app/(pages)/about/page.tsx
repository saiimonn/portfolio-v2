import type { Metadata } from "next";
import { OPEN_GRAPH, PERSON_ID, SITE_URL, jsonLd } from "@/app/data/site";
import AboutPage from "./components/about-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Simon Gabriel Gementiza (saiimonn) — a web developer working with Next.js, React, Laravel, and Supabase. Background, stack, and how to get in touch.",
  alternates: { canonical: "/about" },
  openGraph: {
    ...OPEN_GRAPH,
    url: "/about",
    title: "About | Simon Gabriel Gementiza",
    description: "About Simon Gabriel Gementiza (saiimonn) — web developer working with Next.js, React, Laravel, and Supabase.",
  },
};

const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: `${SITE_URL}/about`,
  name: "About Simon Gabriel Gementiza",
  mainEntity: { "@id": PERSON_ID },
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

const About = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(profileJsonLd) }}
      />
      <AboutPage />
    </>
  )
}

export default About;