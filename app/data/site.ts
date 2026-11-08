export const SITE_URL = "https://saiimonn.surgestudio.tech";

export const OPEN_GRAPH = {
  type: "website",
  locale: "en_PH",
  siteName: "Simon Gabriel Gementiza",
  images: "/opengraph-image",
} as const;

export const PERSON_ID = `${SITE_URL}/#person`;

export const EMAIL = "gementizasgg08@gmail.com";

export const SOCIALS = [
  { name: "GitHub", url: "https://www.github.com/saiimonn" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/simon-gabriel-gementiza-9abb59279/" },
  { name: "Instagram", url: "https://www.instagram.com/_saiimonn/" },
];

// JSON-LD for a <script> tag; "<" is escaped so no string can close the tag early
export const jsonLd = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");
