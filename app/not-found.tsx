import Link from "next/link";
import Nav from "./components/navbar";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground flex flex-col items-center justify-center px-6 text-center">
      <div className="grain-overlay opacity-[0.06]" />
      <Nav />
      <h1 className="text-[40vw] md:text-[28vw] font-bold leading-[0.8] tracking-tighter text-blood">
        404
      </h1>
      <p className="mt-6 text-xl md:text-3xl opacity-80">This page wandered off.</p>
      <Link
        href="/"
        className="mt-10 bg-foreground text-background px-10 py-4 rounded-full font-medium hover:scale-105 transition-transform"
      >
        ← Back home
      </Link>
    </main>
  );
}
