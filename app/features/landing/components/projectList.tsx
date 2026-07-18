"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "../projects";

const ProjectList = () => {
  const container = useRef<HTMLDivElement | null>(null);
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
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
            },
          }
        );
      });

      const mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)"
      }, (context) => {
        const { isDesktop } = context.conditions as any;
        const rows = gsap.utils.toArray<HTMLElement>(".project-row");

        if (isDesktop) {
          rows.forEach((row) => {
            const img = row.querySelector(".img-reveal");
            const desc = row.querySelector(".project-desc");

            if (!img || !desc) return;

            const onEnter = () => {
              gsap.to(img, { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "power3.out", overwrite: true });
              gsap.to(desc, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", overwrite: true });
            };

            const onLeave = () => {
              gsap.to(img, { opacity: 0, x: 20, scale: 0.95, duration: 0.4, ease: "power2.in", overwrite: true });
              gsap.to(desc, { opacity: 0, y: 10, duration: 0.3, ease: "power2.in", overwrite: true });
            };

            row.addEventListener("mouseenter", onEnter);
            row.addEventListener("mouseleave", onLeave);
          });
        } else {
          gsap.set(".img-reveal, .project-desc", { clearProps: "all" });
        }
      });
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="w-full text-white px-6 sm:px-8 md:px-12 py-8 flex flex-col items-center"
    >
      <div className="py-10 md:py-12">
        <h2 className="font-light text-5xl sm:text-7xl md:text-9xl uppercase text-center md:text-left text-blood">
          Selected Works
        </h2>
      </div>

      <div className="w-full flex flex-col">
        {selectedWorks.map((item, idx) => (
          <div
            key={idx}
            className="project-row relative w-full border-t border-white/10 py-10 sm:py-12 md:py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 group"
          >
            <div className="flex items-start space-x-4 sm:space-x-6 md:space-x-8 z-10 w-full md:w-auto">
              <span className="text-lg sm:text-xl md:text-2xl font-light opacity-60 mt-2">
                [{item.number}]
              </span>

              <div className="flex flex-col flex-1">
                <h3 className="text-4xl sm:text-5xl md:text-8xl font-medium tracking-tight">
                  {item.name}
                </h3>

                <p className="project-desc opacity-100 md:opacity-0 md:translate-y-4 text-gray-400 mt-3 sm:mt-4 max-w-xl text-base sm:text-lg leading-relaxed transition-opacity duration-300">
                  {item.shortDesc}
                </p>
              </div>
            </div>

            <div className="img-reveal 
              relative w-full aspect-16/10 mt-6 
              md:absolute md:right-0 md:mt-0 md:w-112.5 md:aspect-video md:opacity-0 md:translate-x-12 md:scale-90 
              pointer-events-none rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/20 transition-all"
            >
              <Image
                src={item.img[0]}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 450px"
                priority={idx < 2}
              />
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/projects"
        className="mt-12 md:mt-16 bg-white text-black px-8 sm:px-10 py-3 sm:py-4 rounded-full font-medium hover:scale-105 transition-transform text-sm sm:text-base"
      >
        View all projects
      </Link>
    </div>
  );
};

export default ProjectList;