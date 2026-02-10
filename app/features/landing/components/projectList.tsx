"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "../projects";

const ProjectList = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const items = gsap.utils.toArray(".project-row");
      items.forEach((item: any) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    },
    { scope: container },
  );

  const onEnter = (e: React.MouseEvent) => {
    const row = e.currentTarget;
    const imgContainer = row.querySelector(".img-reveal");
    const desc = row.querySelector(".project-desc");

    gsap.to(imgContainer, {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
      overwrite: true,
    });

    gsap.to(desc, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const onLeave = (e: React.MouseEvent) => {
    const row = e.currentTarget;
    const imgContainer = row.querySelector(".img-reveal");
    const desc = row.querySelector(".project-desc");

    gsap.to(imgContainer, {
      opacity: 0,
      x: 20,
      scale: 0.95,
      duration: 0.4,
      ease: "power2.in",
    });

    gsap.to(desc, {
      opacity: 0,
      y: 10,
      duration: 0.3,
    });
  };

  return (
    <div
      ref={container}
      className="w-full text-white px-6 sm:px-8 md:px-12 py-8 flex flex-col items-center"
    >
      <div className="py-10 md:py-12">
        <h1 className="font-light text-blood text-5xl sm:text-7xl md:text-9xl uppercase text-center md:text-left">
          Selected Works
        </h1>
      </div>

      {projects.map((item, idx) => (
        <div
          key={idx}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          className="project-row relative w-full border-t border-white/10 py-10 sm:py-12 md:py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-0 group cursor-pointer"
        >
          <div className="flex items-start space-x-4 sm:space-x-6 md:space-x-8 z-10">
            <span className="text-lg sm:text-xl md:text-2xl font-light opacity-60 mt-2">
              [{item.number}]
            </span>
            <div className="flex flex-col">
              <h1 className="text-4xl sm:text-5xl md:text-8xl font-medium tracking-tight">
                {item.name}
              </h1>
              <p className="project-desc opacity-100 md:opacity-0 md:translate-y-4 text-gray-400 mt-3 sm:mt-4 max-w-xl text-base sm:text-lg leading-relaxed">
                {item.shortDesc}
              </p>
            </div>
          </div>

          <div className="img-reveal opacity-100 md:opacity-0 md:translate-x-12 md:scale-90 pointer-events-none mt-2 sm:mt-4 md:mt-0 md:absolute md:right-0 w-full md:w-[400px] aspect-video rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/20">
            <Image
              src={item.img[0]}
              alt={item.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        </div>
      ))}

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
