"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Nav from "@/app/components/navbar";
import Link from "next/link";

export default function AboutPage() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      // Initial states
      gsap.set(".line-reveal", { y: "100%" });
      gsap.set(".fade-reveal", { opacity: 0, y: 12 });

      // Timeline
      tl.to(".line-reveal", {
        y: 0,
        duration: 1.2,
        stagger: 0.08,
        delay: 0.2,
      }).to(
        ".fade-reveal",
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
        },
        "-=0.6"
      );
    },
    { scope: container }
  );

  return (
    <>
      <div className="nav-wrapper fixed left-1/2 z-60">
        <Nav />
      </div>
      
      <section
        ref={container}
        className="min-h-screen bg-[#121212] text-foreground flex items-center"
      >
        <div className="mx-auto max-w-4xl px-6">
          {/* Body text */}
          <div className="space-y-6 text-zinc-300 leading-relaxed text-base md:text-lg">
            <div>
              <h1 className = "text-2xl font-semibold line-reveal">Bio</h1>
              <p className="fade-reveal">
                20-year-old born in Cebu, Philippines. A second year student at the University of San Carlos. I develop full stack web-based projects.
                <span className = "font-semibold">Based in Cebu, Philippines</span>
              </p>
            </div>

            <div>
              <h1 className = "text-2xl font-semibold line-reveal">Skills</h1>
              <p className="fade-reveal">
                I work across both frontend and backend, building modern web applications using Next.js, React, Tailwind CSS, Node.js, Express, and MySQL.
                I’m currently exploring <span className="font-semibold">Machine Learning</span>, with a growing interest in computer vision and data analysis.
              </p>
            </div>

  
            <div>
              <h1 className = "text-2xl font-semibold line-reveal">Connect</h1>
              <p className="fade-reveal">
                For inquiries, email me at <span className = "hover:text-foreground hover:cursor-pointer">gementizasgg08@gmail.com</span>
              </p>
            </div>
          </div>
  

          <div className="mt-8 overflow-hidden flex w-full space-x-4">
            <Link href = "/fb" className = "hover:underline fade-reveal">
              <p>Facebook</p>
            </Link>
            
            <Link href = "/ig" className = "hover:underline fade-reveal">
              <p>Instagram</p>
            </Link>
            
            <Link href = "/git" className = "hover:underline fade-reveal">
              <p>Github</p>
            </Link>
            
            <Link href = "/linkedin" className = "hover:underline fade-reveal">
              <p>LinkedIn</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
