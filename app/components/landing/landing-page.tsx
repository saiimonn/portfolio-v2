"use client";

import TechCarousel from "./tech-carousel";
import ProjectList from "./project-list";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Footer from "./footer";
import LocalTime from "../local-time";
import AsciiSpider from "../ascii-spider";

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

        <div className="hero-gradient -z-10" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="relative flex flex-col justify-between h-full w-full px-6 sm:px-8 md:px-16 pt-28 md:pt-32 pb-6 md:pb-10 z-30 text-foreground">
          <div className="overflow-hidden">
            <div className="text-up translate-y-[110%] flex justify-between gap-4 whitespace-nowrap text-[11px] sm:text-xs uppercase tracking-[0.2em] opacity-75">
              <span>Full-Stack Developer</span>
              <span className="hidden lg:flex items-center gap-2">
                <span className="size-2 rounded-full bg-green-400" aria-hidden="true" />
                Available for work
              </span>
              <span>
                Cebu, PH — <LocalTime /><span className="hidden sm:inline"> GMT+8</span>
              </span>
            </div>
          </div>

          <div className="overflow-hidden">
            <h1 className="text-up translate-y-[110%] text-[17.5vw] font-bold uppercase leading-[0.8] whitespace-nowrap tracking-tighter text-[#FFFFF0] -ml-[0.04em]">
              Saiimonn
            </h1>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <main className="relative z-40 bg-background shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
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
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-lg md:h-128 aspect-square shrink-0 rounded-sm overflow-hidden grid place-items-center">
              <AsciiSpider cols={50} rows={30} />
            </div>
            <div className="max-w-xl text-center md:text-left">
              <h3 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-blood mb-6 md:mb-8">
                Hello, I&apos;m Sai
              </h3>
              <p className="text-base sm:text-lg leading-relaxed opacity-80 text-justify">
                I&apos;m a computer science student who designs and develops full-stack web
                applications as well as analyze data.
                <br /><br />
                I work effectively in collaborative environments, adapt quickly to new
                tools and technologies, and learn fast. But more importantly, I build fast
                and with intention.
              </p>
            </div>
          </div>
        </section>

        <div className="py-24 border-b border-white/5">
          <TechCarousel />
        </div>

        {/* Project List */}
        <section>
          <ProjectList />
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default LandingPage;
