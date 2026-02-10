"use client";

import Image from "next/image";
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

  useGSAP(
    () => {
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
    },
    { scope: mainRef },
  );

  return (
    <div ref={mainRef} className="relative w-full font-sans bg-black">
      {/* --- STICKY HERO SECTION --- */}
      <section className="hero-section sticky top-0 h-screen w-full overflow-hidden z-0 bg-black border-b border-white/5">
        <div className="grain-overlay opacity-[0.06] z-20 pointer-events-none" />
        <div className="absolute inset-0 bg-black/30 pointer-events-none z-10" />

        <div className="absolute inset-0 -z-10">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source src="/video/bg2.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative flex flex-col justify-between h-full w-full p-6 sm:p-8 md:p-16 z-30">
          <div className="flex items-center w-full h-full" />

          <div className="flex flex-col gap-8 md:flex-row md:justify-between md:items-end w-full">
            <div className="text-foreground">
              <div className="overflow-hidden">
                <h1 className="text-up text-5xl sm:text-6xl md:text-8xl text-[#FFFFF0] font-extrabold tracking-tighter leading-none translate-y-[110%]">
                  Saiimonn
                </h1>
              </div>
              <div className="overflow-hidden">
                <h3 className="text-up text-base sm:text-lg md:text-4xl opacity-70 translate-y-[110%]">
                  Web Development • Machine Learning
                </h3>
              </div>
            </div>

            <div className="text-left md:text-right text-foreground">
              <div className="overflow-hidden">
                <h2 className="text-up text-2xl sm:text-3xl md:text-6xl font-bold translate-y-[110%]">
                  Full-Stack Developer
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="text-up text-base sm:text-xl md:text-4xl opacity-70 translate-y-[110%]">
                  Based in Cebu, Philippines
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <main className="relative z-40 bg-[#121212] shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
        {/* About Me */}
        <section
          ref={aboutContainer}
          className="about-content flex flex-col md:flex-row w-full h-auto py-20 md:py-32 px-6 md:px-8 text-foreground border-b border-foreground/5 gap-10 md:gap-0"
        >
          <div className="flex items-center justify-start">
            <h2 className="text-4xl md:text-8xl font-medium text-blood uppercase tracking-tighter md:whitespace-nowrap md:[writing-mode:vertical-rl] md:rotate-180">
              About Me
            </h2>
          </div>
          <div className="flex flex-1 flex-col md:flex-row items-center justify-center px-0 md:px-12 gap-10 md:gap-32">
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-[32rem] md:h-[32rem] aspect-square bg-gray-900 shrink-0 rounded-sm overflow-hidden">
              <Image
                src="/images/me.jpg"
                alt="Sai"
                fill
                className="object-cover opacity-80"
              />
            </div>
            <div className="max-w-xl text-center md:text-left">
              <h3 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-blood mb-6 md:mb-8">
                Hello I&apos;m Sai
              </h3>
              <p className="text-base sm:text-lg leading-relaxed opacity-80">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </div>
        </section>

        <div className="py-24 bg-[#0a0a0a] border-b border-white/5">
          <TechCarousel />
        </div>

        {/* Project List */}
        <section className="bg-[#121212]">
          <ProjectList />
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default LandingPage;
