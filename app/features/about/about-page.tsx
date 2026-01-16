"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Footer from "@/app/features/landing/components/footer";

const sections = [
  { id: "01", title: "Philosophy", sub: "Design Meets Logic", desc: "I believe that the best digital products are born where machine learning and intuitive design converge." },
  { id: "02", title: "Expertise", sub: "Modern Tech Stack", desc: "Specializing in Next.js, GSAP, and AI integration to build seamless, high-performance web experiences." },
  { id: "03", title: "Background", sub: "Based in Cebu", desc: "Drawing inspiration from the vibrant tech community in the Philippines to deliver global standards." }
];

export default function AboutPage() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray(".about-card");

    cards.forEach((card: any, i) => {
      // Create the shrinking effect as subsequent cards scroll over
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: "top top", 
          endTrigger: container.current,
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          scrub: true,
          invalidateOnRefresh: true,
        },
        // Gently scale down and fade out to create depth in the stack
        scale: 1 - (cards.length - i) * 0.05, 
        opacity: 0.3,
        filter: "blur(4px)", // Reduced from 10px for better legibility
      });
    });

  }, { scope: container });

  return (
    <div ref={container} className="relative bg-background text-white px-8 md:px-16 min-h-screen">
      {/* Title Section */}
      <div className="pt-40 pb-20">
        <h1 className="text-8xl md:text-[12rem] font-bold tracking-tighter leading-none mb-20">
          ABOUT <span className="text-blood">ME</span>
        </h1>
      </div>

      {/* Main Stacking Cards Section */}
      <main className="max-w-7xl mx-auto flex flex-col gap-0 pb-40">
        {sections.map((section, idx) => (
          <div 
            key={section.id} 
            className="about-card sticky top-0 h-[80vh] w-full flex flex-col bg-[#121212] border-t border-white/10 rounded-t-[40px] shadow-2xl overflow-hidden"
            style={{ 
                top: `${idx * 40 + 100}px`, // Added 100px buffer for your Navbar
                zIndex: idx 
            }} 
          >
            {/* Section Header */}
            <div className="p-10 flex items-center justify-between border-b border-white/5 bg-[#121212]">
              <div className="flex items-center gap-6">
                <span className="text-xl font-mono text-blood">[{section.id}]</span>
                <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
                  {section.title}
                </h2>
              </div>
              <p className="hidden md:block text-sm opacity-50 uppercase tracking-widest">Scroll to explore</p>
            </div>

            {/* Section Content */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-10 p-10 items-center">
              <div className="space-y-6">
                <h3 className="text-4xl font-semibold leading-tight">{section.sub}</h3>
                <p className="text-lg opacity-70 leading-relaxed max-w-md">{section.desc}</p>
              </div>
              <div className="relative aspect-square md:aspect-video w-full rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                <Image 
                  src="/images/me.jpg" 
                  alt={section.title} 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </main>


    </div>
  );
}