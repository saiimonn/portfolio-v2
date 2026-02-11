import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTailwindcss,
  SiReact,
  SiTypescript,
  SiPython,
  SiPhp,
  SiMysql,
  SiNextdotjs,
  SiAlacritty,
  SiVercel,
  SiSpring,
  SiArc,
  SiNodedotjs,
  SiLaravel,
  SiMongodb,
} from "react-icons/si";

const TechCarousel = () => {
  const stack = [
    { Icon: SiHtml5, label: "HTML" },
    { Icon: SiCss3, label: "CSS" },
    { Icon: SiJavascript, label: "Javascript" },
    { Icon: SiTailwindcss, label: "TailwindCSS" },
    { Icon: SiReact, label: "ReactJS" },
    { Icon: SiTypescript, label: "Typescript" },
    { Icon: SiPython, label: "Python" },
    { Icon: SiPhp, label: "PHP" },
    { Icon: SiMysql, label: "MySQL" },
    { Icon: SiNextdotjs, label: "NextJS" },
    { Icon: SiAlacritty, label: "Alacritty" },
    { Icon: SiVercel, label: "Vercel" },
    { Icon: SiSpring, label: "Spring" },
    { Icon: SiArc, label: "Arc" },
    { Icon: SiNodedotjs, label: "NodeJS" },
    { Icon: SiLaravel, label: "Laravel" },
    { Icon: SiMongodb, label: "MongoDB" },
  ];

  const tripleStack = [...stack, ...stack];

  return (
    <div className="w-full py-6 sm:py-8 overflow-hidden">
      <div className="flex">
        <div className="animate-marquee-infinite flex">
          {tripleStack.map((item, index) => (
            <div
              key={index}
              className="group relative mx-6 sm:mx-10 md:mx-12 flex flex-col items-center justify-center cursor-pointer"
            >
              <span className="scale-0 rounded bg-zinc-700 px-2 py-1 text-xs text-foreground transition-all group-hover:scale-100 group-hover:-translate-y-2 opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
                {item.label}
              </span>

              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
                <item.Icon className="w-full h-full text-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechCarousel;
