"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Lenis drives the scroll, GSAP's ticker drives Lenis so ScrollTriggers stay in sync
const SmoothScroll = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ anchors: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Lenis keeps its own scroll target, so reset it on every route change
  // or it carries the previous page's position over (e.g. footer -> /about)
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    const { hash } = window.location;
    if (hash && document.querySelector(hash)) {
      lenis.scrollTo(hash, { immediate: true, offset: -96 });
    } else {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
};

export default SmoothScroll;
