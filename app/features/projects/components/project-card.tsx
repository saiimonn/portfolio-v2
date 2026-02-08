"use client"

import Image from "next/image"

interface ProjectCardProps {
  firstImageSrc: string;
  secondImageSrc: string;
  number: string;
  title: string;
  description: string;
}

export default function ProjectCard({ firstImageSrc, secondImageSrc, number, title, description }: ProjectCardProps) {
  return (
    <div className="overflow-hidden text-white">
      <div className = "h-full transform-none">
        <div className = "group flex h-full flex-col space-y-1 border-b border-b-gray-300 py-4">
          <div className = "relative aspect-square w-full overflow-hidden">
            <div className = "relative aspect-square w-full duration-150 motion-safe:group-hover:blur-xs">
              <Image
                src={firstImageSrc}
                alt = "TEST PREVIEW"
                fill
                priority
                className = "object-cover"
              />
            </div>
            
            <div className = "motion-reduce:hidden">
              <div className="pointer-events-none absolute inset-0 bg-black opacity-0 transition-opacity duration-150 group-hover:opacity-70" />
              <div className="pointer-events-none absolute top-1/2 left-1/2 aspect-4800/3600 w-full -translate-x-1/2 -translate-y-1/2 scale-70 opacity-0 transition-all duration-300 ease-out group-hover:scale-75 group-hover:opacity-100">
                <Image
                  src={secondImageSrc}
                  alt = "TEST PREVIEW"
                  fill
                  priority
                  className = "object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className = "flex items-end justify-between">
            <h3 className="text-2xl leading-none font-bold -tracking-[0.02em] uppercase md:text-3xl">{title}</h3>
            <p className="text-base leading-none font-bold -tracking-[0.02em]">{number}</p>
          </div>
          
          <p className = "text-lg leading-[1.1] -tracking-[0.02em] opacity-60">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}