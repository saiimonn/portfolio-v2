"use client"

import Image from "next/image"

interface ProjectCardProps {
  images: string[];
  number: string;
  title: string;
  description: string;
  stack: string[];
}

export default function ProjectCard({ images, number, title, description, stack }: ProjectCardProps) {
  return (
    <div className="overflow-hidden text-white w-full max-w-2xl">
      <div className="group flex h-full flex-col space-y-4 border-b border-b-gray-300/20 py-8">
        
        <div className="relative aspect-square w-full overflow-hidden border border-gray-300/10 bg-[#0a0a0a]">
          
          <div className="flex justify-center items-center h-full transition-all duration-500 group-hover:scale-110 group-hover:blur-sm">
            <h1 className="text-8xl font-thin opacity-20">[{number}]</h1>
          </div>
          

          <div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-all duration-500 ease-out group-hover:opacity-100">
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="grid grid-cols-2 gap-4 w-full h-full transform scale-90 transition-transform duration-500 group-hover:scale-100">  
                {images.map((item, idx) => (
                  <div key={idx} className = "relative size-full rounded-lg overflow-hidden border border-white/10">
                    <Image
                      src={item}
                      alt={`${title} view ${idx}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-bold tracking-tighter uppercase">{title}</h3>
            <p className="text-lg font-mono opacity-40">{number}</p>
          </div>
          
          <p className="text-lg text-gray-400 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2 pt-2">
            {stack.map((item, idx) => (
              <span key={idx} className="border border-white/20 rounded-full py-1 px-4 text-xs font-medium uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                {item}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}