"use client";
import { useEffect, useState } from "react";
import gsap from "gsap";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 1. Numerical Count Logic
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 10); 

    // 2. Exit Animation
    if (count === 100) {
      const tl = gsap.timeline({
        onComplete: onComplete,
      });

      tl.to(".count-text", {
        opacity: 0,
        y: -50,
        duration: 0.5,
        delay: 0.3,
        ease: "power2.in",
      })
      .to(".preloader-container", {
        yPercent: -100, 
        duration: 1.2,
        ease: "power4.inOut",
      });
    }

    return () => clearInterval(interval);
  }, [count, onComplete]);

  return (
    <div className="preloader-container fixed inset-0 z-100 flex items-end p-12 bg-[#0a0a0a] text-foreground">
      <div className="overflow-hidden">
        <div
          className="count-text text-[15vw] font-bold leading-none select-none"
          aria-hidden="true"
        >
          {count}
        </div>
      </div>
    </div>
  );
};

export default Preloader;