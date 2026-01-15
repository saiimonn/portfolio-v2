"use client";

import Image from "next/image";
import Link from "next/link";
import TechCarousel from "@/app/features/landing/components/techCarousel";
import ProjectList from "@/app/features/landing/components/projectList";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Footer from "./components/footer";

const LandingPage = () => {
  const mainRef = useRef(null);
  const aboutContainer = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".about-content > *", {
      scrollTrigger: {
        trigger: aboutContainer.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
    });

  }, { scope: mainRef });

  return (
    <div ref={mainRef} className="relative w-full font-sans bg-black">
      
      {/* --- STICKY HERO SECTION --- */}
      <section className="hero-section sticky top-0 h-screen w-full overflow-hidden z-0 bg-black border-b border-white/5">
        <div className="grain-overlay opacity-[0.06] z-20 pointer-events-none" />
        <div className="absolute inset-0 bg-black/30 pointer-events-none z-10" />
        
        <div className="absolute inset-0 -z-10">
          <video autoPlay loop muted playsInline className="h-full w-full object-cover">
            <source src="/video/bg2.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative flex flex-col justify-between h-full w-full p-8 md:p-16 z-30">
          <div className="flex items-center w-full h-full" />

          <div className="flex flex-row justify-between items-end w-full">
            <div className="text-white">
              <div className="overflow-hidden">
                <h1 className="text-up text-7xl md:text-8xl text-[#FFFFF0] font-extrabold tracking-tighter leading-none translate-y-[110%]">
                  Saiimonn
                </h1>
              </div>
              <div className="overflow-hidden">
                <h3 className="text-up text-xl md:text-4xl opacity-70 translate-y-[110%]">
                  Web Development • Machine Learning
                </h3>
              </div>
            </div>
          
            <div className="text-right text-white">
              <div className="overflow-hidden">
                <h2 className="text-up text-3xl md:text-6xl font-bold translate-y-[110%]">
                  Full-Stack Developer
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="text-up text-xl md:text-4xl opacity-70 translate-y-[110%]">
                  Based in Cebu, Philippines
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT (Covers Hero) --- */}
      <main className="relative z-40 bg-[#121212] shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
        
        {/* About Me Section */}
        <section ref={aboutContainer} className="about-content flex w-full h-auto py-32 px-8 text-white border-b border-white/5">
          <div className="flex items-center justify-start">
            <h2 className="text-8xl font-medium text-blood uppercase tracking-tighter whitespace-nowrap" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              About Me
            </h2>
          </div>
          <div className="flex flex-1 items-center justify-center px-12 gap-32">
            <div className="relative size-128 aspect-square bg-gray-900 shrink-0 rounded-sm overflow-hidden">
               <Image src="/images/me.jpg" alt="Sai" fill className="object-cover opacity-80" /> 
            </div>
            <div className="max-w-xl">
              <h3 className="text-7xl font-semibold text-blood mb-8">Hello I&apos;m Sai</h3>
              <p className="text-lg leading-relaxed opacity-80">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
            </div>
          </div>
        </section>

        <div className="py-24 bg-[#0a0a0a] border-b border-white/5">
          <TechCarousel />
        </div>
        
        {/* Project List Section */}
        <section className="bg-[#121212]">
          <ProjectList />
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default LandingPage;