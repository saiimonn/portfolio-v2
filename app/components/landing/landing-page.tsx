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
  { name: "Email", url: "mailto:gementizasgg08@gmail.com" },
];

const NAME = "Saiimonn";
const label = "text-[11px] uppercase tracking-[0.2em] text-foreground/75";

// One screen on desktop: meta bar, project index + preview stage, giant name along the bottom
const LandingPage = () => {
  const [active, setActive] = useState<number | null>(null);
  const job = experience.find((e) => e.current && e.org !== "University of San Carlos");

  return (
    <div className="relative isolate w-full min-h-svh lg:h-svh overflow-hidden flex flex-col text-foreground">
      <div className="hero-gradient -z-10" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="absolute inset-0 -z-10 bg-black/30 pointer-events-none" aria-hidden="true" />
      <div className="grain-overlay -z-10 opacity-[0.06]" aria-hidden="true" />

      {/* meta bar */}
      <header className="overflow-hidden px-6 sm:px-8 md:px-12 pt-6 md:pt-8">
        <div className="text-up grid grid-cols-2 lg:grid-cols-4 gap-y-3 gap-x-6 text-[11px] sm:text-xs uppercase tracking-[0.2em] text-foreground/75">
          <span>Full-stack developer</span>
          <span className="lg:text-center">
            Cebu, PH <LocalTime /> GMT+8
          </span>
          <span className="flex items-center gap-2 lg:justify-center">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inset-0 rounded-full bg-green-400 opacity-75 motion-safe:animate-ping" />
              <span className="relative size-2 rounded-full bg-green-400" />
            </span>
            Available for work
          </span>
          <ul className="col-span-2 lg:col-span-1 flex gap-5 lg:justify-end">
            {links.map((l) => (
              <li key={l.name}>
                <a
                  href={l.url}
                  {...(l.url.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                  className="relative inline-block py-2 -my-2 text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground transition-colors"
                >
                  {l.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* index + preview */}
      <div className="flex-1 min-h-0 grid lg:grid-cols-2 gap-10 px-6 sm:px-8 md:px-12 py-8 lg:py-6">
        <main className="flex flex-col justify-center-safe gap-8 [@media(max-height:820px)]:gap-5 min-h-0">
          <section aria-labelledby="work-heading">
            <div className="flex items-baseline justify-between mb-2">
              <h2 id="work-heading" className={label}>
                Selected work
              </h2>
              <span className={label}>({String(projects.length).padStart(2, "0")})</span>
            </div>
            <ul className="project-list border-t border-foreground/20" onMouseLeave={() => setActive(null)}>
              {projects.map((p, i) => (
                <li key={p.slug} className="project-row border-b border-foreground/20 transition-opacity duration-300">
                  <Link
                    href={`/projects/${p.slug}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                    className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-3 py-3 [@media(max-height:820px)]:py-2"
                  >
                    <span className="text-xs text-foreground/75 tabular-nums">{p.number}</span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-3 text-3xl sm:text-4xl xl:text-5xl font-medium tracking-tighter leading-tight motion-safe:transition-transform duration-500 ease-out group-hover:translate-x-3 group-focus-visible:translate-x-3">
                        {p.name}
                        <span
                          aria-hidden="true"
                          className="text-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                        >
                          ↗
                        </span>
                      </span>
                      <span className="hidden sm:block text-sm text-foreground/80 truncate">
                        {p.role} · {p.stack.join(", ")}
                      </span>
                    </span>
                    <span className="text-xs text-foreground/75 tabular-nums">{p.year}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <div className="flex flex-wrap items-end justify-between gap-6">
            {job && (
              <p className="text-sm">
                <span className={`${label} block mb-1`}>Now</span>
                {job.role} <span className="text-foreground/80">at {job.org}</span>
              </p>
            )}
            <nav aria-label="Pages" className="flex gap-3 text-sm">
              <Link
                href="/projects"
                className="bg-foreground text-background px-5 py-2.5 rounded-full font-medium hover:bg-background hover:text-foreground transition-colors"
              >
                All work →
              </Link>
              <Link
                href="/about"
                className="px-5 py-2.5 rounded-full border border-foreground/30 hover:border-foreground transition-colors"
              >
                About me →
              </Link>
            </nav>
          </div>
        </main>

        {/* preview stage: spider idles, hovered project wipes in from below */}
        <aside aria-hidden="true" className="relative hidden lg:block min-h-0 overflow-hidden">
          <div
            className={`absolute inset-0 flex items-center justify-center [&_pre]:text-foreground/80 transition-opacity duration-500 ${
              active === null ? "opacity-100" : "opacity-0"
            }`}
          >
            <AsciiSpider cols={80} rows={48} />
          </div>
          {projects.map((p, i) => (
            <div key={p.slug} className="absolute inset-0 grid place-items-center">
              <div
                className={`relative w-full aspect-16/10 overflow-hidden rounded-lg ring-1 ring-foreground/20 shadow-2xl motion-safe:transition-[clip-path] duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
                  active === i ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(100%_0_0_0)]"
                }`}
              >
                <Image
                  src={p.img[0]}
                  alt=""
                  fill
                  sizes="50vw"
                  className={`object-cover motion-safe:transition-transform duration-1000 ease-out ${active === i ? "scale-100" : "scale-110"}`}
                />
              </div>
            </div>
          ))}
        </aside>
      </div>

      {/* signature */}
      <div className="overflow-hidden px-4 md:px-8">
        <h1
          aria-label="Saiimonn — Simon Gabriel Gementiza, web developer"
          className="flex font-bold uppercase leading-[0.8] tracking-tighter whitespace-nowrap text-[min(19vw,30svh)] -ml-[0.04em]"
        >
          {NAME.split("").map((c, i) => (
            <span key={i} aria-hidden="true" className="char-up inline-block">
              {c}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};

export default LandingPage;
