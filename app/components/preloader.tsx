"use client";
import { useEffect, useState } from "react";
import gsap from "gsap";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 15); 

    if (count === 100) {
      const tl = gsap.timeline({
        onComplete: onComplete, 
      });

      tl.to(".preloader-text", {
        opacity: 0,
        duration: 0.5,
        delay: 0.5,
      })
      .to(".preloader-screen", {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
      });
    }

    return () => clearInterval(interval);
  }, [count, onComplete]);

  return (
    <div className="preloader-screen fixed inset-0 z-100 flex items-end p-12 bg-[#0a0a0a] text-white">
      <div className="preloader-text overflow-hidden">
        <h1 className="text-[15vw] font-bold leading-none select-none">
          {count}
        </h1>
      </div>
    </div>
  );
};

export default Preloader;