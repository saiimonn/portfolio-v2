"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Nav from "@/app/components/navbar";
import AsciiSpider from "@/app/components/ascii-spider";
import Footer from "@/app/components/landing/footer";
import { experience } from "@/app/data/experience";

const stack = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Laravel", "Supabase", "FastAPI", "OpenCV", "MySQL"];

export default function AboutPage() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      gsap.set(".line-reveal", { y: "100%" });
      gsap.set(".fade-reveal", { opacity: 0, y: 12 });
      gsap.set(".nav-wrapper", { opacity: 0, y: -20 });

      tl.to(".line-reveal", {
        y: 0,
        duration: 1.2,
        stagger: 0.1,
        delay: 0.2,
      })
        .to(
          ".fade-reveal",
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.08,
          },
          "-=0.8",
        )
        .to(
          ".nav-wrapper",
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.5",
        );
    },
    { scope: container },
  );

  return (
    <div ref={container} className="bg-background min-h-screen text-foreground">
      <div className="nav-wrapper fixed left-1/2 -translate-x-1/2 top-6 z-50">
        <Nav />
      </div>

      <section className="px-6 sm:px-8 md:px-16 pt-32 md:pt-40 pb-24 md:pb-32">
        <div className="overflow-hidden">
          <h1 className="line-reveal text-[22vw] md:text-[14vw] font-bold uppercase leading-[0.85] tracking-tighter text-blood">
            About<span className="sr-only"> Simon Gabriel Gementiza</span>
          </h1>
        </div>

        <div className="mt-12 md:mt-20 grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-24">
          <div className="fade-reveal relative w-full aspect-4/5 rounded-sm overflow-hidden grid place-items-center">
            <AsciiSpider cols={48} rows={36} />
          </div>

          <div className="flex flex-col gap-12">
            <div className="fade-reveal">
              <h2 className="text-xs uppercase tracking-[0.2em] opacity-45 mb-3">Bio</h2>
              <p className="text-lg md:text-2xl leading-relaxed opacity-90">
                20-year-old CS student at the University of San Carlos, Cebu. I design and
                build full-stack web apps, and lately, machine learning tools that run in the
                browser.
              </p>
            </div>

            <div className="fade-reveal">
              <h2 className="text-xs uppercase tracking-[0.2em] opacity-45 mb-3">Stack</h2>
              <ul className="flex flex-wrap gap-2">
                {stack.map((s) => (
                  <li
                    key={s}
                    className="border border-white/20 rounded-full px-4 py-2 text-sm opacity-85"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="fade-reveal">
              <h2 className="text-xs uppercase tracking-[0.2em] opacity-45 mb-3">Experience</h2>
              <ul>
                {experience.map((e) => (
                  <li
                    key={`${e.role}-${e.org}`}
                    className="border-t border-white/10 py-5 flex flex-col gap-1.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <p className="text-lg md:text-xl">
                        <span className="font-medium">{e.role}</span>{" "}
                        <span className={e.current ? "text-blood" : "opacity-60"}>
                          @ {e.org}
                        </span>
                      </p>
                      <span className="flex items-center gap-2 text-sm opacity-50">
                        {e.current && (
                          <span className="size-2 rounded-full bg-green-400" aria-hidden="true" />
                        )}
                        {e.dates}
                      </span>
                    </div>
                    <p className="text-base opacity-60">{e.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
