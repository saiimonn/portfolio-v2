"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { projects } from "../projects";

const ProjectList = () => {
  const container = useRef(null);
  const imageRef = useRef(null);
  const descRef = useRef(null);
  const [activeImage, setActiveImage] = useState(projects[0].img);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const xTo = gsap.quickTo(imageRef.current, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(imageRef.current, "y", { duration: 0.4, ease: "power3" });
    
    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX - 150);
      yTo(e.clientY - 100);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    const items = gsap.utils.toArray(".project-row");
    items.forEach((item: any) => {
      gsap.fromTo(item,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            end: "top 70%",
            scrub: 1,
          }
        }
      );
    });
    
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: container });
  
  const onEnter = (img: string) => {
    setActiveImage(img);
    gsap.to(imageRef.current, { scale: 1, opacity: 1, duration: 0.3 });
    gsap.fromTo(descRef.current, 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.1 }
    );
  };
  
  const onLeave = () => {
      gsap.to(imageRef.current, { 
        scale: 0, 
        opacity: 0, 
        duration: 0.3, 
        ease: "power2.in" 
      });
  
      gsap.to(descRef.current, { 
        y: -20, 
        opacity: 0, 
        duration: 0.3, 
        ease: "power2.in" 
      });
    };

  return (
    <div ref={container} className = "relative w-full p-12 flex flex-col">
      <div ref={imageRef} className="pointer-events-none fixed top-0 left-0 w-75 h-50 z-50 overflow-hidden rounded-lg opacity-0 scale-0 origin-center">
        
        <Image
          src={activeImage}
          alt={`${activeImage}`}
          fill
          sizes="300px"
          priority
          className = "object-cover"
        />
      </div>
      
      {projects.map((item, idx) => (
        <div
          key={idx}
          onMouseEnter={() => onEnter(item.img)}
          onMouseLeave={onLeave}
          className = "project-row flex flex-row items-center space-x-4 p-8 border-b border-[#363636] text-foreground group cursor-pointer transition-colors"
        >
          <p className = "text-xl tracking-wide opacity-50 group-hover:opacity-100 transition-opacity">
            [{item.number}]
          </p>
          <div className = "flex flex-col space-y-4">
            <h1 className = "text-7xl tracking-tighter group-hover:translate-x-8 transition-transform duration-500">
              {item.name}
            </h1>
            <p ref={descRef} className="opacity-0">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
      
      <div className = "view-all-btn self-center mt-12 border border-[#363636] bg-white text-[#121212] rounded-full px-8 py-4 font-medium cursor-pointer hover:bg-gray-200 transition-colors">
        View all projects
      </div>
    </div>
  );
};

export default ProjectList;