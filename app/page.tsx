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
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      <div className={`nav-wrapper fixed top-8 left-1/2 z-60 ${isLoading ? 'invisible' : 'visible'}`}>
        <Nav />
      </div>

      <div className={`relative w-full transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Landing />
      </div>
    </div>
  );
}