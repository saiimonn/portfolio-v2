import type { Metadata } from "next";
import { OPEN_GRAPH } from "@/app/data/site";
import AboutPage from "./components/about-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Simon Gabriel Gementiza (saiimonn) — a web developer working with Next.js, React, Laravel, and Supabase. Background, stack, and how to get in touch.",
  alternates: { canonical: "/about" },
  openGraph: {
    ...OPEN_GRAPH,
    url: "/about",
    title: "About | Simon Gementiza",
    description: "About Simon Gabriel Gementiza (saiimonn) — web developer working with Next.js, React, Laravel, and Supabase.",
  },
};

const About = () => {
  return (
    <>
      <AboutPage />
    </>
  )
}

export default About;