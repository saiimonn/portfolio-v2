"use client";

import { useRef } from "react";
import Nav from "@/app/components/navbar";
import { projects } from "../landing/projects";
import ProjectCard from "./components/project-card";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ProjectPage() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from(".project-card-wrapper", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        clearProps: "all",
      });

      gsap.from(".nav-wrapper", {
        y: -20,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className="bg-black min-h-screen">
      <div className="nav-wrapper fixed left-1/2 -translate-x-1/2 top-6 z-50">
        <Nav />
      </div>

      <div className="relative w-full font-sans pt-24 sm:pt-28 md:pt-32 px-4 sm:px-6 md:px-12 pb-16 sm:pb-20 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          {projects.map((item, idx) => (
            <div key={idx} className="project-card-wrapper">
              <ProjectCard
                key={idx}
                images={item.img}
                number={item.number}
                title={item.name}
                description={item.longDesc}
                stack={item.stack}
                repoLink={item.repoLink}
                siteLink={item.siteLink}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
