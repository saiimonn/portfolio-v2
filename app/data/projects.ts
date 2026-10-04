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
    name: "ML Hub",
    slug: "ml-hub",
    role: "Solo — design + build",
    year: "2026",
    img: [
      "/images/projects/ml-hub/ml-hub-landing.png",
      "/images/projects/ml-hub/ml-hub-analytical.png",
      "/images/projects/ml-hub/ml-hub-color-analyzer.png",
      "/images/projects/ml-hub/ml-hub-edge-detector.png"
    ],
    shortDesc: "A unified web platform for testing and showcasing my machine learning models.",
    longDesc: "A personal web platform where I bring together all of my machine learning models in one place. It lets users interact with and test different ML-powered features through a clean and intuitive interface. Built as both a learning space and a showcase, ML-Hub highlights how machine learning models can be deployed and used in real-world web applications.",
    stack: ["NextJS", "Tailwindcss", "FastAPI", "OpenCV"],
    repoLink: "https://www.github.com/saiimonn/ml-hub",
    siteLink: "https://mlearning-hub.vercel.app/",
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
