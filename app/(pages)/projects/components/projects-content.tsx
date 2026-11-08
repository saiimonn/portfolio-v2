import ProjectIndex from "@/app/components/project-index";
import SiteHeader from "@/app/components/site/site-header";
import SiteFooter from "@/app/components/site/site-footer";

// Same shell as the landing: one screen on desktop, index left, preview right
export default function ProjectPage() {
  return (
    <div className="min-h-svh lg:h-svh overflow-hidden flex flex-col text-foreground">
      <SiteHeader />
      <ProjectIndex
        pitch
        top={
          <h1 className="text-5xl sm:text-6xl xl:text-7xl font-semibold tracking-tighter leading-[0.9]">
            Work<span className="text-background">.</span>
            <span className="sr-only"> — projects by Simon Gabriel Gementiza</span>
          </h1>
        }
      />
      <SiteFooter />
    </div>
  );
}
