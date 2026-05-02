
// projects metadata
export const projects = [
  {
    number: "01",
    name: "ML Hub",
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
    number: "02",
    name: "Val Residences",
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

  {
    number: "03",
    name: "Tipsy Trails",
    img: [
      "/images/projects/tipsy-trails/brands_carousel.png",
      "/images/projects/tipsy-trails/footer.png",
      "/images/projects/tipsy-trails/our_story.png",
      "/images/projects/tipsy-trails/signature_cocktails.png"
    ],
    shortDesc: "Frontend-driven CMS website for a mobile bar brand",
    longDesc: "Developed a responsive, CMS-powered website for Tipsy Trails Mobile Bar to showcase their menu, brand story, and services. Integrated Payload CMS and Supabase for content management, enabling dynamic updates without redeployment. Focused on clean UI/UX, smooth animations, and scalable component architecture.",
    stack: ["NextJS", "Tailwindcss", "Supabase", "PayloadCMS"],
    repoLink: "https://github.com/lucerocris/tipsytrails"
  },

  {
    number: "04",
    name: "Nitpicker",
    img: [
      "/images/projects/nitpicker/landing.png",
      "/images/projects/nitpicker/mock_exam.png",
      "/images/projects/nitpicker/mock_exam_prep.png",
      "/images/projects/nitpicker/prev_exams.png"
    ],
    shortDesc: "Interactive mock exam platform for PhilNITS preparation.",
    longDesc: "Helped build an interactive mock exam platform to help students prepare for the PhilNITS certification. Implemented timed exams, question navigation, and preparation flows with a focus on usability and performance. Utilized animations to enhance user engagement and simulate real testing environments.",
    stack: ["NextJS", "Tailwindcss", "Framer Motion"],
    repoLink: "https://github.com/noni-was-taken/NitPicker",
    siteLink: "https://nitpicker.dcism.org"
  }
]