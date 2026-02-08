import Nav from "@/app/components/navbar"
import { projects } from "../landing/projects"
import ProjectCard from "./components/project-card"

export default function ProjectPage() {
  return(
    <>
      <div className = "nav-wrapper fixed left-1/2 z-60">
        <Nav />
      </div>
      
      <div className = "relative w-full font-sans">
        <div className = "flex flex-col">
          <div className = "flex justify-center items-center py-32">
            <h1 className = "text-6xl text-white font-extrabold">Projects</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {projects.map((item, idx) => (
              <ProjectCard
                key={idx}
                images={item.img}
                number={item.number}
                title={item.name}
                description={item.longDesc}
                stack={item.stack}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}