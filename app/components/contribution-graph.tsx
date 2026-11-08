import type { CSSProperties } from "react";
import { GITHUB_USER, type Contributions } from "@/app/data/github";

const shade = ["bg-foreground/10", "bg-foreground/35", "bg-foreground/55", "bg-foreground/80", "bg-foreground"];

// GitHub-style calendar: one column per week, Sunday on top
const ContributionGraph = ({ data }: { data: Contributions }) => {
  const lead = new Date(`${data.days[0].date}T00:00:00Z`).getUTCDay();
  const total = data.total.toLocaleString("en-US");

  return (
    <a
      href={`https://github.com/${GITHUB_USER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full max-w-md"
    >
      <span className="block mb-2 text-[11px] uppercase tracking-[0.2em] text-foreground/75 group-hover:text-foreground transition-colors">
        {total} contributions in the last year ↗
      </span>
      <span
        role="img"
        aria-label={`${total} GitHub contributions in the last year`}
        className="grid grid-rows-7 grid-flow-col auto-cols-fr gap-[2px]"
      >
        {Array.from({ length: lead }, (_, i) => (
          <span key={`pad-${i}`} />
        ))}
        {data.days.map((d, i) => (
          <span
            key={d.date}
            title={`${d.count} on ${d.date}`}
            style={{ "--i": Math.floor((i + lead) / 7) } as CSSProperties}
            className={`intro-cell aspect-square rounded-[1px] ${shade[d.level]}`}
          />
        ))}
      </span>
    </a>
  );
};

export default ContributionGraph;
