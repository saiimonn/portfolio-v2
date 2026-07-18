import type { Metadata } from "next";
import ProjectPage from "@/app/features/projects/projects-page";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work by Simon Gabriel Gementiza — ML Hub, Val Residences, Tipsy Trails, and Nitpicker. Built with Next.js, React, Laravel, and Supabase.",
  alternates: { canonical: "/projects" },
};

export default function Projects() {
  return(
    <ProjectPage />
  )
}