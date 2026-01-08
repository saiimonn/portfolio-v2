import StackIcon from "tech-stack-icons";


const TechCarousel = () => {
  const stack = [
    { name: "html5", label: "HTML" }, { name: "css3", label: "CSS" }, { name: "js", label: "Javascript" }, 
    { name: "tailwindcss", label: "TailwindCSS" }, { name: "react", label: "ReactJS" },{ name: "typescript", label: "Typescript" }, 
    { name: "python", label: "Python" }, { name: "php", label: "PHP" }, { name: "mysql", label: "MySQL" }, 
    { name: "nextjs2", label: "NextJS" }, { name: "alacritty", label: "Alacritty" }, { name: "java", label: "Java" }, 
    { name: "vercel", label: "Vercel" }, { name: "spring", label: "Spring" }, { name: "arc", label: "Arc" }, 
    { name: "nodejs", label: "NodeJS" }, { name: "laravel", label: "Laravel" }, { name: "mongodb", label: "MongoDB" }, 
  ];
  
  const tripleStack = [...stack, ...stack];
  
  return(
    <>
      <div className = "w-full py-8 overflow-hidden">
        <div className = "flex">
          <div className = "animate-marquee-infinite">
            {tripleStack.map((item, index) => (
              <div 
                key = {index}
                className = "group relative mx-12 flex flex-col items-center justify-center cursor-pointer"
              >
                <span className="scale-0 rounded bg-zinc-700 px-2 py-1 text-xs text-white transition-all group-hover:scale-100 group-hover:-translate-y-2 opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
                  {item.label}
                </span>
                
                <div className="w-12 h-12 md:w-16 md:h-16 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                  <StackIcon name={item.name} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default TechCarousel;