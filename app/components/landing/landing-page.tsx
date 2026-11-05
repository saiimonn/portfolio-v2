"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LocalTime from "../local-time";
import AsciiSpider from "../ascii-spider";
import { projects } from "@/app/data/projects";
import { experience } from "@/app/data/experience";

const links = [
  { name: "GitHub", url: "https://www.github.com/saiimonn" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/simon-gabriel-gementiza-9abb59279/" },
  { name: "gementizasgg08@gmail.com", url: "mailto:gementizasgg08@gmail.com" },
];

const label = "text-[11px] uppercase tracking-[0.2em] text-foreground/60";

// One screen on desktop: info column left, spider (or hovered project) right
const LandingPage = () => {
  const [active, setActive] = useState<number | null>(null);
  const job = experience.find((e) => e.current && e.org !== "University of San Carlos");

  return (
    <div className="relative w-full min-h-svh lg:h-svh lg:overflow-hidden grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] isolate overflow-hidden text-foreground">
      <div className="hero-gradient -z-10" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="absolute inset-0 -z-10 bg-black/30 pointer-events-none" aria-hidden="true" />
      <div className="grain-overlay -z-10 opacity-[0.06]" aria-hidden="true" />
      <main className="flex flex-col justify-center-safe gap-10 [@media(max-height:820px)]:gap-6 px-6 sm:px-10 lg:pl-[max(4rem,8vw)] lg:pr-10 py-16 lg:py-10 lg:overflow-y-auto">
        <header className="space-y-4">
          <div className="overflow-hidden">
            <h1 className="text-up text-6xl sm:text-7xl xl:text-8xl font-semibold tracking-tighter leading-[0.9]">
              Saiimonn<span className="text-black">.</span>
              <span className="sr-only"> — Simon Gabriel Gementiza, web developer</span>
            </h1>
          </div>
          <div className="overflow-hidden">
            <p className="text-up flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-foreground/60">
              <span>Full-stack developer</span>
              <span aria-hidden="true">·</span>
              <span>
                Cebu, PH <LocalTime /> GMT+8
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-green-400" aria-hidden="true" />
                Available for work
              </span>
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
            {links.map((l) => (
              <li key={l.name}>
                <a
                  href={l.url}
                  {...(l.url.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                  className="relative inline-block py-2 -my-2 text-foreground/80 underline decoration-foreground/20 underline-offset-4 hover:text-black hover:decoration-black transition-colors"
                >
                  {l.name}
                </a>
              </li>
            ))}
          </ul>
        </header>

        <section aria-labelledby="work-heading">
          <h2 id="work-heading" className={`${label} mb-3`}>
            Selected work
          </h2>
          <ul className="project-list border-t border-white/20" onMouseLeave={() => setActive(null)}>
            {projects.map((p, i) => (
              <li key={p.slug} className="project-row border-b border-white/20 transition-opacity duration-300">
                <Link
                  href={`/projects/${p.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-3 py-3"
                >
                  <span className="text-xs text-foreground/60">{p.number}</span>
                  <span>
                    <span className="text-xl sm:text-2xl font-medium tracking-tight group-hover:text-black transition-colors">
                      {p.name}
                    </span>
                    <span className="hidden sm:block text-sm text-foreground/70 mt-0.5 [@media(min-width:1024px)_and_(max-height:820px)]:hidden">{p.shortDesc}</span>
                  </span>
                  <span className="text-xs text-foreground/60">{p.year}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {job && (
          <section aria-labelledby="now-heading">
            <h2 id="now-heading" className={`${label} mb-3`}>
              Now
            </h2>
            <p className="text-base">
              {job.role}
              <span className="text-foreground/70"> at {job.org}</span>
            </p>
            <p className="text-xs text-foreground/60 mt-1">{job.dates}</p>
          </section>
        )}

        <nav aria-label="Pages" className="flex flex-wrap gap-3 text-sm">
          <Link
            href="/projects"
            className="bg-foreground text-background px-5 py-2.5 rounded-full font-medium hover:bg-black hover:text-foreground transition-colors"
          >
            All work →
          </Link>
          <Link
            href="/about"
            className="px-5 py-2.5 rounded-full border border-white/15 hover:border-foreground transition-colors"
          >
            About me →
          </Link>
        </nav>
      </main>

      <aside
        aria-hidden="true"
        className="relative hidden lg:grid place-items-center overflow-hidden border-l border-white/20 [&_pre]:text-foreground/80"
      >
        <div
          className={`absolute inset-0 flex items-center transition-opacity duration-500 ${active === null ? "opacity-100" : "opacity-0"}`}
        >
          <AsciiSpider cols={80} rows={56} />
        </div>
        {projects.map((p, i) => (
          <div
            key={p.slug}
            className={`absolute inset-10 xl:inset-16 grid place-items-center transition-[opacity,scale] duration-500 ${
              active === i ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="relative w-full aspect-16/10 rounded-xl overflow-hidden ring-1 ring-white/15 shadow-2xl">
              <Image src={p.img[0]} alt="" fill sizes="50vw" className="object-cover" />
            </div>
          </div>
        ))}
      </aside>
    </div>
  );
};

export default LandingPage;
