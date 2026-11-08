"use client";
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AsciiSpider from "@/app/components/ascii-spider";
import SiteHeader from "@/app/components/site/site-header";
import SiteFooter from "@/app/components/site/site-footer";
import { label } from "@/app/components/project-index";
import { experience } from "@/app/data/experience";

const stack = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Laravel", "Supabase", "FastAPI", "OpenCV", "MySQL"];

export default function AboutPage({ contributions }: { contributions?: ReactNode }) {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(".line-reveal", { yPercent: 100, duration: 1.2, delay: 0.1 })
        .from(".fade-reveal", { opacity: 0, y: 12, duration: 0.9, stagger: 0.08 }, "-=0.8");
    },
    { scope: container },
  );

  return (
    <div ref={container} className="min-h-svh flex flex-col text-foreground">
      <SiteHeader />

      <div className="flex-1 grid lg:grid-cols-2 gap-10 px-6 sm:px-8 md:px-12">
        <main className="flex flex-col gap-12 py-12 lg:py-20">
          <div className="overflow-hidden">
            <h1 className="line-reveal text-5xl sm:text-6xl xl:text-7xl font-semibold tracking-tighter leading-[0.9]">
              About<span className="text-blood">.</span>
              <span className="sr-only"> Simon Gabriel Gementiza</span>
            </h1>
          </div>

          <section className="fade-reveal">
            <h2 className={`${label} mb-3`}>Bio</h2>
            <p className="text-lg md:text-xl leading-relaxed">
              Simon Gabriel Gementiza (Saiimonn) is a full-stack web developer from Cebu City,
              Philippines. He studies computer science at the University of San Carlos and, since
              June 2026, works as a software engineer intern at EvoTech Software Solutions,
              building features for a Laravel platform that helps Amazon sellers recover
              reimbursements. He builds with Next.js, React, TypeScript, Laravel, and Supabase.
              His projects include Study Hub, a study platform his USC classmates use for graded
              drills and live quiz battles, and Nook, a cafe guide for Cebu with a Flutter app and
              an owner portal.
            </p>
          </section>

          <section className="fade-reveal">
            <h2 className={`${label} mb-3`}>Stack</h2>
            <ul className="flex flex-wrap gap-2">
              {stack.map((s) => (
                <li key={s} className="border border-foreground/30 rounded-full px-4 py-1.5 text-sm">
                  {s}
                </li>
              ))}
            </ul>
          </section>

          <section className="fade-reveal">
            <h2 className={`${label} mb-3`}>Experience</h2>
            <ul className="border-t border-foreground/20">
              {experience.map((e) => (
                <li key={`${e.role}-${e.org}`} className="border-b border-foreground/20 py-5 flex flex-col gap-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <p className="text-lg md:text-xl">
                      <span className="font-medium">{e.role}</span>{" "}
                      <span className="text-foreground/80">at {e.org}</span>
                    </p>
                    <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/75 shrink-0">
                      {e.current && <span className="size-2 rounded-full bg-green-400" aria-hidden="true" />}
                      {e.dates}
                    </span>
                  </div>
                  {e.desc && <p className="text-base text-foreground/85 leading-relaxed">{e.desc}</p>}
                </li>
              ))}
            </ul>
          </section>

          {contributions && <section className="fade-reveal">{contributions}</section>}
        </main>

        {/* spider stays in view while the bio scrolls */}
        <aside aria-hidden="true" className="relative hidden lg:block">
          <div className="sticky top-0 h-svh flex items-center justify-center [&_pre]:text-foreground/80">
            <AsciiSpider cols={80} rows={48} />
          </div>
        </aside>
      </div>

      <SiteFooter />
    </div>
  );
}
