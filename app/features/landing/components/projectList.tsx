"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const ProjectList = () => {
  const container = useRef(null);

  const projects = [
    { number: "01", name: "Web experience" },
    { number: "02", name: "Digital products & services" },
    { number: "03", name: "Branding" },
    { number: "04", name: "Social and campaigns" },
    { number: "05", name: "Apex Analytics" },
  ];

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const items = gsap.utils.toArray(".project-row");
    
    items.forEach((item: any) => {
      gsap.fromTo(item, 
        { 
          opacity: 0, 
          y: 50,
          borderBottomColor: "rgba(54, 54, 54, 0)" 
        },
        {
          opacity: 1,
          y: 0,
          borderBottomColor: "#363636",
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            end: "top 70%",
            scrub: 1,
          }
        }
      );
    });

    // Animate the "View all" button
    gsap.from(".view-all-btn", {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".view-all-btn",
        start: "top 95%",
        toggleActions: "play none none reverse"
      }
    });

  }, { scope: container });

  return (
    <div ref={container} className="w-full p-12 flex flex-col">
      {projects.map((item, idx) => (
        <div 
          key={idx}
          className="project-row flex flex-row space-x-4 p-8 border-b border-[#363636] text-white group cursor-pointer transition-colors hover:bg-white/5"
        >
          <p className="text-xl tracking-wide opacity-50 group-hover:opacity-100 transition-opacity">
            [{ item.number }]
          </p>
          <h1 className="text-7xl tracking-tighter group-hover:translate-x-4 transition-transform duration-500">
            { item.name }
          </h1>
        </div>
      ))}
      
      <div className="view-all-btn self-center mt-12 border border-[#363636] bg-white text-[#121212] rounded-full px-8 py-4 font-medium cursor-pointer hover:bg-gray-200 transition-colors">
        View all projects
      </div>
    </div>
  );
};

export default ProjectList;