"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathname = usePathname();
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Work", href: "/projects" },
    { name: "Contact", href: "mailto:gementizasgg08@gmail.com" },
  ];

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-100 w-auto">
      <div className="flex items-center gap-6 px-6 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full shadow-2xl">
        <ul className="flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-all duration-300 ${
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