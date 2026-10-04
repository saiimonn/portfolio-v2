import type { Metadata } from "next";
import ProjectPage from "./components/projects-content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work by Simon Gabriel Gementiza — Otus, Study Hub, ML Hub, Tipsy Trails, Val Residences, and Nitpicker. Built with Next.js, React, Laravel, and Supabase.",
  alternates: { canonical: "/projects" },
};

export default function Projects() {
  return(
    <ProjectPage />
  )
}