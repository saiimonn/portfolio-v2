import type { Metadata } from "next";
import { OPEN_GRAPH, PERSON_ID, SITE_URL, jsonLd } from "@/app/data/site";
import { projects } from "@/app/data/projects";
import ProjectPage from "./components/projects-content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work by Simon Gabriel Gementiza — Study Hub, Nook, and Val Residences. Built with Next.js, React, Flutter, Laravel, and Supabase.",
  alternates: { canonical: "/projects" },
  openGraph: {
    ...OPEN_GRAPH,
    url: "/projects",
    title: "Projects | Simon Gabriel Gementiza",
    description: "Selected work by Simon Gabriel Gementiza — Study Hub, Nook, and Val Residences.",
  },
};

const projectsJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  url: `${SITE_URL}/projects`,
  name: "Projects by Simon Gabriel Gementiza",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.name,
        description: p.shortDesc,
        url: p.siteLink ?? p.repoLink,
        image: `${SITE_URL}${p.img[0]}`,
        dateCreated: p.year,
        creator: { "@id": PERSON_ID },
        keywords: p.stack.join(", "),
      },
    })),
  },
};

export default function Projects() {
  return(
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(projectsJsonLd) }}
      />
      <ProjectPage />
    </>
  )
}