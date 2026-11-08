import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "./components/site/site-header";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="min-h-svh flex flex-col text-foreground">
      <SiteHeader />
      <main className="flex-1 flex flex-col justify-end px-4 md:px-8 pb-6">
        <p className="px-2 md:px-4 text-lg md:text-2xl">
          This page wandered off.{" "}
          <Link href="/" className="underline decoration-foreground/40 underline-offset-4 hover:decoration-foreground">
            Back to the index →
          </Link>
        </p>
        <h1 className="font-bold leading-[0.8] tracking-tighter text-[min(45vw,60svh)] -ml-[0.04em]">
          404<span className="text-background">.</span>
        </h1>
      </main>
    </div>
  );
}
