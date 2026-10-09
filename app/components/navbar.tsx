"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  // Slide out while scrolling down so the nav never sits on top of headings
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 120 && y > lastY.current);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Work", href: "/projects" },
    { name: "Contact", href: "mailto:gementizasgg08@gmail.com" },
  ];

  return (
    <nav
      className={`fixed top-8 left-1/2 -translate-x-1/2 z-100 w-auto transition-transform duration-500 ease-out ${
        hidden ? "-translate-y-[200%]" : "translate-y-0"
      }`}
    >
      <div className="flex items-center gap-6 px-6 py-3 bg-background/60 backdrop-blur-lg border border-white/10 rounded-full shadow-2xl">
        <ul className="flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onFocus={() => setHidden(false)}
                  className={`relative inline-block py-3 -my-3 text-sm font-medium tracking-wide transition-all duration-300 ${
                    isActive ? "text-foreground" : "text-foreground/40 hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;