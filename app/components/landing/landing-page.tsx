"use client";

import ProjectIndex, { label } from "../project-index";
import SiteHeader from "../site/site-header";
import { experience } from "@/app/data/experience";
import { EMAIL, SOCIALS } from "@/app/data/site";

const NAME = "Saiimonn";
const links = [...SOCIALS.slice(0, 2), { name: "Email", url: `mailto:${EMAIL}` }];

// One screen on desktop: header, project index + preview stage, giant name along the bottom
const LandingPage = () => {
  const job = experience.find((e) => e.current && e.org !== "University of San Carlos");

  return (
    <div className="relative w-full min-h-svh lg:h-svh overflow-hidden flex flex-col text-foreground">
      <div className="overflow-hidden">
        <div className="text-up">
          <SiteHeader />
        </div>
      </div>

      <ProjectIndex
        bottom={
          <div className="flex flex-wrap items-end justify-between gap-6 text-sm">
            {job && (
              <p>
                <span className={`${label} block mb-1`}>Now</span>
                {job.role} <span className="text-foreground/80">at {job.org}</span>
              </p>
            )}
            <ul className="flex gap-5">
              {links.map((l) => (
                <li key={l.name}>
                  <a
                    href={l.url}
                    {...(l.url.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                    className="relative inline-block py-2 -my-2 underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground transition-colors"
                  >
                    {l.name} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      {/* signature */}
      <div className="overflow-hidden px-4 md:px-8">
        <h1
          aria-label="Saiimonn — Simon Gabriel Gementiza, web developer"
          className="flex font-bold uppercase leading-[0.8] tracking-tighter whitespace-nowrap text-[min(19vw,30svh)] -ml-[0.04em]"
        >
          {NAME.split("").map((c, i) => (
            <span key={i} aria-hidden="true" className="char-up inline-block">
              {c}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};

export default LandingPage;
