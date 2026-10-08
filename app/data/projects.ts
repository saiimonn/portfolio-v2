// projects metadata, newest first; the first five show on the home page
export const projects = [

  {
    number: "01",
    name: "Study Hub",
    slug: "study-hub",
    role: "Co-built, team of 2",
    year: "2026",
    img: [
      "/images/projects/study-hub/landing.png",
      "/images/projects/study-hub/battle.png",
      "/images/projects/study-hub/visualizer.png",
      "/images/projects/study-hub/graph-theory.png"
    ],
    shortDesc: "Every CS course this semester turned into graded drills, a C tracer, and live quiz battles.",
    longDesc: "A study platform for USC computer science courses, used by classmates at studyhub.dcism.org. Course material becomes auto-graded practice: a C tracer that draws pointers and data structures as the program runs, a data-structure visualizer, flashcard decks, exam simulators, and a real-time Battle mode where up to 30 classmates answer the same question at once. Works without an account; progress syncs through Supabase once signed in.",
    stack: ["NextJS", "Tailwindcss", "Supabase", "PostHog"],
    siteLink: "https://studyhub.dcism.org",
  },

  {
    number: "02",
    name: "Nook",
    slug: "nook",
    role: "Mobile + web, team",
    year: "2026",
    img: ["/images/projects/nook/landing.png"],
    shortDesc: "Cebu's cafe guide: a mobile app, an owner portal, and an admin panel on one Supabase backend.",
    longDesc: "A Flutter app for iOS and Android that helps people in Cebu City find and keep track of local cafes, with a browseable feed, a live map, tag- and location-based search, reviews, custom lists, and Been / Want to Try rankings. Nook for Business is the Next.js portal where owners claim their listing and manage hours, photos, menu, tags, and reviews alongside traffic analytics. Nook Admin is the internal panel for reviewing claims, moderating reviews, and curating cafes, tags, crawls, and achievements.",
    stack: ["Flutter", "NextJS", "Supabase", "MapLibre", "PostHog"],
    siteLink: "https://www.nookph.app",
  },

  {
    number: "03",
    name: "Val Residences",
    slug: "val-residences",
    role: "Full-stack, team",
    year: "2025",
    img: [
      "/images/projects/val-residences/AboutUs1.png",
      "/images/projects/val-residences/AboutUs2.png",
      "/images/projects/val-residences/Dashboard2.png",
      "/images/projects/val-residences/Listings.png"
    ],
    shortDesc: "A full-stack apartment management system for my classmates' family business.",
    longDesc: "A comprehensive multi-tenant rental management system that connects landlords, tenants, and prospective tenants and manages the entire rental life cycle.",
    stack: ["ReactJS", "Tailwindcss", "InertiaJS", "Laravel", "MySQL"],
    repoLink: "https://github.com/lucerocris/IM2_val_residences",
  },
];
