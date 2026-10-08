import type { Metadata } from "next";
import { OPEN_GRAPH } from "@/app/data/site";
import ProjectPage from "./components/projects-content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work by Simon Gabriel Gementiza — Study Hub, Nook, and Val Residences. Built with Next.js, React, Flutter, Laravel, and Supabase.",
  alternates: { canonical: "/projects" },
  openGraph: {
    ...OPEN_GRAPH,
    url: "/projects",
    title: "Projects | Simon Gementiza",
    description: "Selected work by Simon Gabriel Gementiza — Study Hub, Nook, and Val Residences.",
  },
};

export default function Projects() {
  return(
    <ProjectPage />
  )
}