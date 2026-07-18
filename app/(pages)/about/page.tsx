import type { Metadata } from "next";
import AboutPage from "./components/about-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Simon Gabriel Gementiza (saiimonn) — a web developer working with Next.js, React, Laravel, and Supabase. Background, stack, and how to get in touch.",
  alternates: { canonical: "/about" },
};

const About = () => {
  return (
    <>
      <AboutPage />
    </>
  )
}

export default About;