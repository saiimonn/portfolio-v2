"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Nav from "@/app/components/navbar";
import Link from "next/link";

const socials = [
  { name: "Facebook", url: "https://www.facebook.com/simongabriel.gementiza/" },
  { name: "Instagram", url: "https://www.instagram.com/_saiimonn/" },
  { name: "Github", url: "https://www.github.com/saiimonn" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/simon-gabriel-gementiza-9abb59279/"}
]

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
          stagger: 0.1,
        },
        "-=0.8"
      )
      .to(".nav-wrapper", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }, "-=0.5");
    },
    { scope: container }
  );

  return (
    <div ref={container} className="bg-[#121212] min-h-screen">
      <div className="nav-wrapper fixed left-1/2 -translate-x-1/2 top-6 z-50">
        <Nav />
      </div>
      
      <section className="min-h-screen text-zinc-300 flex items-center">
        <div className="mx-auto max-w-4xl px-6">
          <div className="space-y-12 leading-relaxed text-base">
            
            <div>
              <div className="overflow-hidden mb-2">
                <h1 className="text-sm font-semibold uppercase text-zinc-500 line-reveal">Bio</h1>
              </div>
              <p className="fade-reveal text-lg text-white font-light">
                20-year-old student at the University of San Carlos. I develop full-stack web projects with a focus on modern architecture.
              </p>
            </div>

            <div>
              <div className="overflow-hidden mb-2">
                <h1 className="text-sm font-semibold uppercase text-zinc-500 line-reveal">Skills</h1>
              </div>
              <p className="fade-reveal text-lg">
                I work across the stack using <span className="text-white">Next.js, React, Tailwind CSS, Node.js, and MySQL</span>. 
                Currently exploring <span className="text-white font-semibold">Machine Learning</span>, with specific interests in computer vision and data analysis.
              </p>
            </div>

            <div>
              <div className="overflow-hidden mb-2">
                <h1 className="text-sm font-semibold uppercase text-zinc-500 line-reveal">Connect</h1>
              </div>
              <p className="fade-reveal mb-6 text-lg">
                For inquiries, reach out via
                <Link href = "mailto:gementizasgg08@gmail.com">
                  <span className="text-white border-b border-zinc-700 hover:border-white transition-colors cursor-pointer"> gementizasgg08@gmail.com</span>
                </Link>
              </p>
              
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {socials.map((platform) => (
                  <Link
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel = "noopener noreferrer"
                    className="fade-reveal text-sm hover:text-white transition-colors"
                  >
                    {platform.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}