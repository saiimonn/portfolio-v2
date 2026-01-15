"use client"

import { useState, useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Preloader from "./components/preloader"
import Landing from "./(pages)/landing/page";
import Nav from "./components/navbar";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const container = useRef(null);
  
  gsap.registerPlugin(useGSAP)
  
  useGSAP(() => {
    if (!isLoading) {
      const tl = gsap.timeline();

      tl.fromTo(".nav-wrapper", 
        { yPercent: -120, opacity: 0 }, 
        { 
          yPercent: 1, 
          opacity: 1, 
          duration: 1.2, 
          ease: "power4.out",
          delay: 0.2
        }
      )
      .from(".hero-content", {
        y: 60,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out",
      }, "-=0.8");
    }
  }, { scope: container, dependencies: [isLoading] });
  
  return (
    <div ref={container} className="bg-black">
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      <div className={`nav-wrapper relative z-60  ${isLoading ? 'invisible' : 'visible'}`}>
        <Nav />
      </div>

      <div className={`relative w-full transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Landing />
      </div>
    </div>
  );
}