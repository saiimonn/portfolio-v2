"use client"

import { useState, useRef, useEffect } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Preloader from "./components/preloader"
import Landing from "./components/landing/landing-page";
import Nav from "./components/navbar";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const container = useRef(null);
  
  gsap.registerPlugin(useGSAP)

  // Preloader runs once per session and never for reduced-motion users
  useEffect(() => {
    try {
      const seen = sessionStorage.getItem("preloaded") === "1";
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (seen || reduced) setIsLoading(false);
    } catch {}
  }, []);

  const finishLoading = () => {
    try { sessionStorage.setItem("preloaded", "1"); } catch {}
    setIsLoading(false);
  };
  
  useGSAP(() => {
    if (!isLoading) {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(".nav-wrapper",
        { y: -120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          delay: 0.3
        }
      )
        .to(".text-up", {
          y: 0,
          duration: 1.5,
          stagger: 0.2,
        }, "-=0.8");
    }
  }, { scope: container, dependencies: [isLoading] });
  
  return (
    <div ref={container} className="bg-black">
      {isLoading && <Preloader onComplete={finishLoading} />}
      
      <div className={`nav-wrapper fixed left-1/2 z-60 ${isLoading ? 'invisible' : 'visible'}`}>
        <Nav />
      </div>

      <div className={`relative w-full transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Landing />
      </div>
    </div>
  );
}