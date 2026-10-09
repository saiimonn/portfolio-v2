import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/app/components/navbar";
import Footer from "@/app/components/landing/footer";
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
    <div className="bg-background min-h-screen text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(articleJsonLd) }}
      />
      <div className="nav-wrapper fixed left-1/2 -translate-x-1/2 top-6 z-50">
        <Nav />
      </div>

      <main className="px-6 sm:px-8 md:px-16 pt-32 md:pt-40 pb-24 md:pb-32">
        <Link
          href="/projects"
          className="inline-block py-3 -my-3 text-xs uppercase tracking-[0.2em] opacity-50 hover:opacity-100"
        >
          ← All projects
        </Link>

        <h1 className="mt-6 text-[15vw] md:text-[10vw] font-bold uppercase leading-[0.85] tracking-tighter text-blood">
          {project.name}
        </h1>
        <p className="mt-6 max-w-3xl text-lg md:text-2xl leading-relaxed opacity-90">
          {project.shortDesc}
        </p>

        <dl className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 border-t border-white/10">
          {[
            { label: "Role", value: project.role },
            { label: "When", value: study.period },
            ...(study.release ? [{ label: "Release", value: study.release }] : []),
            { label: "Stack", value: project.stack.join(", ") },
          ].map((f) => (
            <div key={f.label} className="border-b border-white/10 py-4">
              <dt className="text-xs uppercase tracking-[0.2em] opacity-45">{f.label}</dt>
              <dd className="mt-1.5 text-base opacity-85">{f.value}</dd>
            </div>
          ))}
        </dl>

        {link && (
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block border rounded-full py-3 px-6 bg-white text-black hover:bg-white/20 hover:text-white ease-in transition-colors"
          >
            {project.siteLink ? "Visit the site ↗" : "View the repository ↗"}
          </Link>
        )}

        <div className="relative mt-16 aspect-16/10 w-full overflow-hidden rounded-xl border border-white/10">
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
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-blood mb-6">
              The problem
            </h2>
            <div className="flex flex-col gap-5 text-base md:text-lg leading-relaxed opacity-85">
              {study.problem.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-blood mb-6">
              Main features
            </h2>
            <ul className="text-base md:text-lg leading-relaxed">
              {study.features.map((f) => (
                <li key={f.slice(0, 40)} className="border-t border-white/10 py-4 opacity-85">
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
                className="relative aspect-16/10 overflow-hidden rounded-xl border border-white/10"
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
            className="mt-24 md:mt-32 block border-t border-white/10 pt-8 group"
          >
            <span className="text-xs uppercase tracking-[0.2em] opacity-45">Next case study</span>
            <span className="mt-2 block text-5xl md:text-8xl font-medium tracking-tight group-hover:text-blood transition-colors">
              {next.name} →
            </span>
          </Link>
        )}
      </main>

      <Footer />
    </div>
  );
}
