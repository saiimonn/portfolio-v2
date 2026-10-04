import Link from "next/link";
import LocalTime from "../local-time";

const socials = [
  { name: "GitHub", url: "https://www.github.com/saiimonn" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/simon-gabriel-gementiza-9abb59279/" },
  { name: "Instagram", url: "https://www.instagram.com/_saiimonn/" },
  { name: "Facebook", url: "https://www.facebook.com/simongabriel.gementiza/" },
];

const Footer = () => {
  return (
    <footer className="bg-background text-foreground border-t border-white/5 pt-24 md:pt-32 pb-10 px-6 sm:px-8 md:px-16">
      <p className="text-xs sm:text-sm uppercase tracking-[0.2em] opacity-50 mb-6">
        Got a project?
      </p>
      <h2 className="text-[14vw] md:text-[13vw] font-bold uppercase leading-[0.85] tracking-tighter">
        Let&apos;s build
        <br />
        something.
      </h2>

      <div className="mt-12 md:mt-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <Link
          href="mailto:gementizasgg08@gmail.com"
          className="text-2xl sm:text-3xl md:text-4xl font-medium text-blood underline decoration-1 underline-offset-8 hover:text-foreground transition-colors break-all"
        >
          gementizasgg08@gmail.com →
        </Link>

        <ul className="flex flex-wrap gap-x-8 gap-y-2">
          {socials.map((s) => (
            <li key={s.name}>
              <Link
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base md:text-lg opacity-80 hover:opacity-100 hover:text-blood transition-colors"
              >
                {s.name} ↗
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-20 md:mt-32 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-2 text-xs sm:text-sm opacity-50">
        <p>© 2026 Simon Gementiza</p>
        <p>
          Cebu, PH — <LocalTime />
        </p>
        <a href="#top" className="hover:opacity-100">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
};

export default Footer;
