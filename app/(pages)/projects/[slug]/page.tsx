import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/app/components/site/site-header";
import SiteFooter from "@/app/components/site/site-footer";
import { projects } from "@/app/data/projects";
import { caseStudies } from "@/app/data/case-studies";
import { OPEN_GRAPH, PERSON_ID, SITE_URL, jsonLd } from "@/app/data/site";

type Props = { params: Promise<{ slug: string }> };

const find = (slug: string) => {
  const project = projects.find((p) => p.slug === slug);
  const study = caseStudies[slug];
  return project && study ? { project, study } : null;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.filter((p) => caseStudies[p.slug]).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = find((await params).slug);
  if (!found) return {};
  const { project } = found;
  const title = `${project.name} case study`;
  return {
    title,
    description: project.shortDesc,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      ...OPEN_GRAPH,
      type: "article",
      url: `/projects/${project.slug}`,
      title: `${title} | Simon Gabriel Gementiza`,
      description: project.shortDesc,
      images: project.img[0],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const found = find((await params).slug);
  if (!found) notFound();
  const { project, study } = found;

  const index = projects.indexOf(project);
  const next = projects.slice(index + 1).concat(projects.slice(0, index)).find((p) => caseStudies[p.slug]);
  const link = project.siteLink ?? project.repoLink;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${project.name} case study`,
    description: project.shortDesc,
    url: `${SITE_URL}/projects/${project.slug}`,
    image: `${SITE_URL}${project.img[0]}`,
    author: { "@id": PERSON_ID },
    about: {
      "@type": "CreativeWork",
      name: project.name,
      url: link,
      keywords: project.stack.join(", "),
    },
  };

  return (
    <div className="min-h-svh text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(articleJsonLd) }}
      />
      <SiteHeader />

      <main className="px-6 sm:px-8 md:px-12 pt-16 md:pt-24 pb-24 md:pb-32">
        <Link
          href="/projects"
          className="relative inline-block py-3 -my-3 text-xs uppercase tracking-[0.2em] text-foreground/75 hover:text-foreground transition-colors"
        >
          ← All projects
        </Link>

        <h1 className="mt-6 text-6xl sm:text-7xl md:text-8xl xl:text-9xl font-semibold tracking-tighter leading-[0.9]">
          {project.name}<span className="text-blood">.</span>
        </h1>
        <p className="mt-6 max-w-3xl text-lg md:text-2xl leading-relaxed">
          {project.shortDesc}
        </p>

        <dl className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 border-t border-foreground/20">
          {[
            { label: "Role", value: project.role },
            { label: "When", value: study.period },
            ...(study.release ? [{ label: "Release", value: study.release }] : []),
            { label: "Stack", value: project.stack.join(", ") },
          ].map((f) => (
            <div key={f.label} className="border-b border-foreground/20 py-4">
              <dt className="text-[11px] uppercase tracking-[0.2em] text-foreground/75">{f.label}</dt>
              <dd className="mt-1.5 text-base">{f.value}</dd>
            </div>
          ))}
        </dl>

        {link && (
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full py-3 px-6 font-medium bg-foreground text-background hover:bg-background hover:text-foreground transition-colors"
          >
            {project.siteLink ? "Visit the site ↗" : "View the repository ↗"}
          </Link>
        )}

        <div className="relative mt-16 aspect-16/10 w-full overflow-hidden rounded-lg ring-1 ring-foreground/20 shadow-2xl">
          <Image
            src={project.img[0]}
            alt={`${project.name} screenshot`}
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 90vw"
          />
        </div>

        <div className="mt-20 md:mt-28 flex flex-col gap-16 md:gap-20 max-w-3xl">
          <section>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter mb-6">
              The problem
            </h2>
            <div className="flex flex-col gap-5 text-base md:text-lg leading-relaxed">
              {study.problem.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter mb-6">
              Main features
            </h2>
            <ul className="text-base md:text-lg leading-relaxed">
              {study.features.map((f) => (
                <li key={f.slice(0, 40)} className="border-t border-foreground/20 py-4">
                  {f}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {project.img.length > 1 && (
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.img.slice(1).map((src) => (
              <div
                key={src}
                className="relative aspect-16/10 overflow-hidden rounded-lg ring-1 ring-foreground/20 shadow-2xl"
              >
                <Image
                  src={src}
                  alt={`${project.name} screenshot`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
            ))}
          </div>
        )}

        {next && (
          <Link
            href={`/projects/${next.slug}`}
            className="mt-24 md:mt-32 block border-t border-foreground/20 pt-8 group"
          >
            <span className="text-[11px] uppercase tracking-[0.2em] text-foreground/75">Next case study</span>
            <span className="mt-2 flex text-5xl md:text-8xl font-semibold tracking-tighter items-center gap-4 motion-safe:transition-transform duration-500 group-hover:translate-x-3 group-focus-visible:translate-x-3">
              {next.name} <span aria-hidden="true">→</span>
            </span>
          </Link>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
