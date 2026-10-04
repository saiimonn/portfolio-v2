import Link from "next/link";
import Nav from "./components/navbar";

export default function NotFound() {
  return (
    <main className="relative min-h-svh overflow-hidden bg-background text-foreground flex flex-col items-center justify-center px-6 text-center">
      <div className="hero-gradient" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      <div className="grain-overlay opacity-[0.06]" />
      <Nav />
      <h1 className="relative text-[40vw] md:text-[28vw] font-bold leading-[0.8] tracking-tighter text-foreground">
        404
      </h1>
      <p className="relative mt-6 text-xl md:text-3xl opacity-80">This page wandered off.</p>
      <Link
        href="/"
        className="relative mt-10 bg-foreground text-background px-10 py-4 rounded-full font-medium hover:scale-105 transition-transform"
      >
        ← Back home
      </Link>
    </main>
  );
}
