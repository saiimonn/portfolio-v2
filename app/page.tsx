"use client"

import { useState, useRef, useEffect } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Preloader from "./components/preloader"
import Landing from "./components/landing/landing-page";

// Set before first paint by the inline script in layout.tsx
const skipIntro = () => document.documentElement.dataset.preloaded === "1";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const container = useRef(null);

  gsap.registerPlugin(useGSAP)

  // Preloader runs once per session and never for reduced-motion users
  useEffect(() => {
    if (skipIntro()) setIsLoading(false);
  }, []);

  const finishLoading = () => {
    try { sessionStorage.setItem("preloaded", "1"); } catch {}
    setIsLoading(false);
  };

  // The hero text ships visible in the HTML so it can paint as LCP; on a first
  // visit it is tucked away under the preloader and slid back in afterwards
  useGSAP(() => {
    if (isLoading) {
      if (!skipIntro()) gsap.set(".text-up", { yPercent: 110 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.to(".text-up", {
      yPercent: 0,
      duration: 1.5,
      stagger: 0.2,
      delay: 0.2,
    });
  }, { scope: container, dependencies: [isLoading] });

  return (
    <div ref={container} className="bg-black">
      {isLoading && <Preloader onComplete={finishLoading} />}

      <Landing />
    </div>
  );
}
