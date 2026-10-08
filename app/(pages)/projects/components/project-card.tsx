"use client";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  stack: string[];
  repoLink?: string;
  siteLink?: string;
}

export default function ProjectCard({
  image,
  title,
  description,
  stack,
  repoLink,
  siteLink,
}: ProjectCardProps) {
  return (
    <div className="overflow-hidden text-white w-full">
      <div className="flex h-full flex-col md:flex-row md:items-center gap-4 md:gap-12 border-b border-b-gray-300/20 py-8">
        <div className="relative aspect-16/10 w-full md:w-1/2 shrink-0 overflow-hidden rounded-xl border border-gray-300/10 bg-background">
          <Image
            src={image}
            alt={`${title} landing page`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="space-y-4 md:flex-1">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter uppercase">
              {title}
            </h2>
          </div>

          <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
            {stack.map((item, idx) => (
              <span
                key={idx}
                className="border border-white/20 rounded-full py-1 px-4 text-xs font-medium uppercase tracking-widest opacity-60"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-row gap-2">
            {repoLink && (
              <Link
                href={repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="border rounded-full py-2 px-4 bg-white text-black hover:bg-white/20 hover:text-white ease-in transition-colors"
              >
                Repository
              </Link>
            )}

            {siteLink && (
              <Link
                href={siteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="border rounded-full py-2 px-4 bg-white text-black hover:bg-white/20 hover:text-white ease-in transition-colors"
              >
                Website
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
