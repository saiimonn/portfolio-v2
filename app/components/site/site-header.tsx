"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LocalTime from "../local-time";
import { EMAIL } from "@/app/data/site";

const nav = [
  { name: "Index", href: "/" },
  { name: "Work", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: `mailto:${EMAIL}` },
];

const isActive = (path: string, href: string) =>
  href === "/" ? path === "/" : path.startsWith(href);

// Same bar on every page: name, meta, nav with the current page underlined
const SiteHeader = () => {
  const path = usePathname();

  return (
    <header className="grid grid-cols-[auto_1fr] lg:grid-cols-4 items-center gap-x-6 px-6 sm:px-8 md:px-12 pt-6 md:pt-8 text-[11px] sm:text-xs uppercase tracking-[0.2em]">
      <Link href="/" className="relative py-2 -my-2 normal-case tracking-tight text-base font-semibold">
        Saiimonn<span className="text-background">.</span>
        <span className="sr-only"> — home</span>
      </Link>
      <span className="hidden lg:block text-center text-foreground/75">
        Cebu, PH <LocalTime /> GMT+8
      </span>
      <span className="hidden lg:flex items-center justify-center gap-2 text-foreground/75">
        <span className="relative flex size-2" aria-hidden="true">
          <span className="absolute inset-0 rounded-full bg-green-400 opacity-75 motion-safe:animate-ping" />
          <span className="relative size-2 rounded-full bg-green-400" />
        </span>
        Available for work
      </span>
      <nav aria-label="Main">
        <ul className="flex justify-end gap-4 sm:gap-5">
          {nav.map((l) => {
            const active = isActive(path, l.href);
            return (
              <li key={l.name}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative inline-block py-2 -my-2 underline underline-offset-4 transition-colors ${
                    active
                      ? "text-foreground decoration-foreground"
                      : "text-foreground/75 decoration-transparent hover:text-foreground hover:decoration-foreground/50"
                  }`}
                >
                  {l.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default SiteHeader;
