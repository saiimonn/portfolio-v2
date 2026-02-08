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

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const items = gsap.utils.toArray(".project-row");
    items.forEach((item: any) => {
      gsap.fromTo(item,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, { scope: container });

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
      overwrite: true
    });

    gsap.to(desc, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out"
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
      ease: "power2.in"
    });

    gsap.to(desc, {
      opacity: 0,
      y: 10,
      duration: 0.3
    });
  };

  return (
    <div ref={container} className="w-full text-white p-8 flex flex-col items-center">
      
      <div className = "py-12">
        <h1 className = "font-light text-blood text-9xl uppercase">Selected Works</h1>
      </div>
      
      {projects.map((item, idx) => (
        <div
          key={idx}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          className="project-row relative w-full border-t border-white/10 py-16 flex flex-col md:flex-row items-center justify-between group cursor-pointer"
        >
          <div className="flex items-start space-x-8 z-10">
            <span className="text-2xl font-light opacity-60 mt-2">[{item.number}]</span>
            <div className="flex flex-col">
              <h1 className="text-6xl md:text-8xl font-medium tracking-tight">
                {item.name}
              </h1>
              <p className="project-desc opacity-0 translate-y-4 text-gray-400 mt-4 max-w-xl text-lg leading-relaxed">
                {item.shortDesc}
              </p>
            </div>
          </div>

          <div className="img-reveal opacity-0 translate-x-12 scale-90 pointer-events-none mt-8 md:mt-0 md:absolute md:right-0 w-full md:w-[400px] aspect-video rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/20">
            <Image
              src={item.img[0]}
              alt={item.name}
              fill
              className="object-cover"
              sizes="400px"
            />
          </div>
        </div>
      ))}

      <Link 
        href="/projects" 
        className="mt-16 bg-white text-black px-10 py-4 rounded-full font-medium hover:scale-105 transition-transform"
      >
        View all projects
      </Link>
    </div>
  );
};

export default ProjectList;