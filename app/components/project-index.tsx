"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import AsciiSpider from "./ascii-spider";
import { projects } from "@/app/data/projects";

export const label = "text-[11px] uppercase tracking-[0.2em] text-foreground/75";

type Props = {
  /** above the list (page title) */
  top?: ReactNode;
  /** below the list */
  bottom?: ReactNode;
  /** show the one-line pitch under each name (Work page) */
  pitch?: boolean;
};

// Numbered project list on the left, preview stage on the right:
// the spider idles, a hovered or focused project wipes in from below
const ProjectIndex = ({ top, bottom, pitch = false }: Props) => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="flex-1 min-h-0 grid lg:grid-cols-2 gap-10 px-6 sm:px-8 md:px-12 py-8 lg:py-6">
      <div className="flex flex-col justify-center-safe gap-8 [@media(max-height:820px)]:gap-5 min-h-0">
        {top}
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
                    {pitch && (
                      <span className="block text-sm sm:text-base text-foreground/90 mt-1 [@media(min-width:1024px)_and_(max-height:820px)]:hidden">
                        {p.shortDesc}
                      </span>
                    )}
                    <span className="hidden sm:block text-sm text-foreground/75 truncate">
                      {p.role} · {p.stack.join(", ")}
                    </span>
                  </span>
                  <span className="text-xs text-foreground/75 tabular-nums">{p.year}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        {bottom}
      </div>

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
                className={`object-cover motion-safe:transition-transform duration-1000 ease-out ${
                  active === i ? "scale-100" : "scale-110"
                }`}
              />
            </div>
          </div>
        ))}
      </aside>
    </div>
  );
};

export default ProjectIndex;
