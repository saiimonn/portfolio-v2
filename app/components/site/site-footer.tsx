import LocalTime from "../local-time";
import { EMAIL, SOCIALS } from "@/app/data/site";

const links = [{ name: "Email", url: `mailto:${EMAIL}` }, ...SOCIALS];

// Thin bar closing every inner page
const SiteFooter = () => (
  <footer
    id="contact"
    className="mx-6 sm:mx-8 md:mx-12 py-6 border-t border-foreground/20 grid grid-cols-1 sm:grid-cols-[1fr_auto] lg:grid-cols-4 gap-3 text-[11px] sm:text-xs uppercase tracking-[0.2em] text-foreground/75"
  >
    <p>© 2026 Simon Gementiza</p>
    <p className="hidden lg:block text-center">
      Cebu, PH <LocalTime />
    </p>
    <ul className="lg:col-span-2 flex flex-wrap sm:justify-end gap-5">
      {links.map((l) => (
        <li key={l.name}>
          <a
            href={l.url}
            {...(l.url.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
            className="relative inline-block py-2 -my-2 text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground transition-colors"
          >
            {l.name}
          </a>
        </li>
      ))}
    </ul>
  </footer>
);

export default SiteFooter;
