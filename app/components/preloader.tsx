"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const counter = { value: 0 };

      gsap
        .timeline({ onComplete })
        .to(counter, {
          value: 100,
          duration: 1,
          ease: "power2.inOut",
          onUpdate: () => setCount(Math.round(counter.value)),
        })
        .to(".count-text", {
          opacity: 0,
          y: -50,
          duration: 0.4,
          delay: 0.1,
          ease: "power2.in",
        })
        .to(container.current, {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
        });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="fixed inset-0 z-100 flex items-end p-12 bg-[#0a0a0a] text-foreground"
    >
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
