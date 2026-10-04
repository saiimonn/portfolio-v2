"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/app/data/projects";

const ProjectList = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const preview = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const selectedWorks = projects.slice(0, 5);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.utils.toArray<HTMLElement>(".project-row").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            clearProps: "opacity",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
            },
          }
        );
      });

      // Desktop preview image trails the cursor
      const el = preview.current;
      if (!el) return;
      // offset right of the cursor so the hovered title stays readable
      gsap.set(el, { xPercent: 12, yPercent: -50 });
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
      const move = (e: PointerEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };
      window.addEventListener("pointermove", move);
      return () => window.removeEventListener("pointermove", move);
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="w-full text-white px-6 sm:px-8 md:px-16 py-8 flex flex-col items-center"
    >
      <div className="w-full flex items-end justify-between py-10 md:py-12">
        <h2 className="font-light text-5xl sm:text-7xl md:text-9xl uppercase tracking-tighter text-blood">
          Selected Works
        </h2>
        <span className="text-lg md:text-2xl opacity-50">
          ({String(selectedWorks.length).padStart(2, "0")})
        </span>
      </div>

      <div className="hidden lg:grid w-full grid-cols-[4rem_1fr_16rem_6rem_18rem] py-4 border-t border-white/10 text-xs uppercase tracking-[0.2em] opacity-40">
        <span>No.</span>
        <span>Project</span>
        <span>Role</span>
        <span>Year</span>
        <span className="text-right">Stack</span>
      </div>

      <ul className="project-list w-full flex flex-col" onMouseLeave={() => setActive(null)}>
        {selectedWorks.map((item, idx) => (
          <li key={item.slug} className="project-row transition-opacity duration-300">
            <Link
              href={`/projects#${item.slug}`}
              onMouseEnter={() => setActive(idx)}
              onFocus={() => setActive(idx)}
              className="w-full border-t border-white/10 py-8 md:py-10 flex flex-col gap-4 lg:grid lg:grid-cols-[4rem_1fr_16rem_6rem_18rem] lg:items-center"
            >
              <span className="text-lg md:text-xl font-light opacity-50">
                [{item.number}]
              </span>
              <h3 className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight">
                {item.name}
              </h3>
              <span className="text-base opacity-70">{item.role}</span>
              <span className="text-base opacity-70">{item.year}</span>
              <span className="text-base opacity-70 lg:text-right">
                {item.stack.join(" · ")}
              </span>

              <div className="relative w-full aspect-16/10 rounded-xl overflow-hidden ring-1 ring-white/20 lg:hidden">
                <Image
                  src={item.img[0]}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div
        ref={preview}
        aria-hidden="true"
        className={`fixed left-0 top-0 z-50 hidden lg:block w-96 aspect-video pointer-events-none rounded-xl overflow-hidden ring-1 ring-white/20 shadow-2xl transition-[opacity,scale] duration-300 ${
          active === null ? "opacity-0 scale-90" : "opacity-100 scale-100 -rotate-3"
        }`}
      >
        {selectedWorks.map((item, idx) => (
          <Image
            key={item.slug}
            src={item.img[0]}
            alt=""
            fill
            sizes="384px"
            className={`object-cover transition-opacity duration-300 ${
              active === idx ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <Link
        href="/projects"
        className="mt-12 md:mt-16 bg-white text-black px-8 sm:px-10 py-3 sm:py-4 rounded-full font-medium hover:scale-105 transition-transform text-sm sm:text-base"
      >
        View all projects →
      </Link>
    </div>
  );
};

export default ProjectList;
