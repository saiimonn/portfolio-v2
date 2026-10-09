export const SITE_URL = "https://saiimonn.surgestudio.tech";

export const OPEN_GRAPH = {
  type: "website",
  locale: "en_PH",
  siteName: "Simon Gabriel Gementiza",
  images: "/opengraph-image",
} as const;

export const PERSON_ID = `${SITE_URL}/#person`;

// JSON-LD for a <script> tag; "<" is escaped so no string can close the tag early
export const jsonLd = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");
