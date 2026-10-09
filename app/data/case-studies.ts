// long-form write-ups for /projects/[slug], keyed by the slug in projects.ts;
// facts come from each project's git history and docs, without contribution stats
export type CaseStudy = {
  period: string;
  release?: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const caseStudies: Record<string, CaseStudy> = {
  "study-hub": {
    period: "Sep 2026 to now",
    release: "1.13.0",
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "Lecture decks and exercise sheets don't tell you whether you got the answer right. I wanted every course I'm taking this semester turned into problems with an answer the app can check, all in one place, and usable on a phone between classes.",
          "Study Hub replaced two earlier things I had built for myself: a single 968-line HTML page of IAS notes and a separate Graph Theory app. We merged both into one Next.js app and kept adding courses.",
        ],
      },
      {
        heading: "The C interpreter",
        paragraphs: [
          "The biggest piece I wrote is the tracer. It runs on a C interpreter I wrote in TypeScript, about 3,600 lines between the parser and the runner. It models gcc on 64-bit Linux and records every step of a program, so the app can replay it line by line and draw pointers as arrows to what they point at.",
          "It stops when a program reads an uninitialized variable or indexes past the end of an array. Real C would carry on and print garbage. The tracer stops on the line that caused it.",
          "Drills don't store answers. The app runs the program and takes the answer key from the recorded steps. Adding a drill means writing a program, and a wrong answer key can't happen unless the interpreter is wrong.",
        ],
      },
      {
        heading: "What else I built",
        paragraphs: [
          "Most of the course content is mine: the Programming 1 lessons and problems, twelve units of DSA drills, Automata Theory, the IAS crypto drills and 562-card deck, Graph Theory lectures 6 to 9, the data-structure visualizer, and the feedback box.",
          "Cris built Battle mode, account sync, and the PostHog setup, and later widened the tracer to cover more shapes of programs. Battle has no game server. The player who has been in the room longest hosts it from their own browser over a Supabase Realtime channel, and the next-oldest player takes over if they leave. It holds up to 30 people. Answer times come from each player's device, which someone could fake, but for a classroom quiz that trade is fine.",
        ],
      },
      {
        heading: "Decisions",
        paragraphs: [
          "It works without an account. Progress lives in the browser, and signing in syncs it to Supabase, one row per store, merging changes from two devices instead of letting the newer one win.",
          "Most people open it cold on a phone, so every control is at least 44px tall and exam conditions are a single switch on each drill.",
        ],
      },
    ],
  },

  nook: {
    period: "Feb 2026 to now",
    release: "1.1.3",
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "Nook helps people in Cebu City find cafes and keep track of the ones they've tried. The app has a feed, a live map, search by tag and location, reviews, custom lists, and Been and Want to Try rankings.",
          "Cafe owners needed a way to keep their own listing right, so Nook has a second product for them, plus an internal panel for our team.",
        ],
      },
      {
        heading: "How it fits together",
        paragraphs: [
          "Three apps share one Supabase project. The Flutter app is what people download. Nook for Business is a Next.js portal where owners claim their cafe and manage hours, photos, menu, tags, and reviews. Nook Admin is where we review claims, moderate reviews, and curate cafes and crawls.",
          "Search runs through Supabase edge functions that mix keyword and embedding search. Review photos go to DigitalOcean Spaces. Owner analytics come from a Vercel cron job that pulls each cafe's traffic from PostHog.",
          "Cris wrote most of the mobile app. When the database drifted from what was in git, we rebuilt the backend repo from the live production database. Before that, only 14 of 47 database functions and 3 of 11 edge functions existed in any repo.",
        ],
      },
      {
        heading: "My part",
        paragraphs: [
          "On mobile I set up the iOS build, added Sign in with Apple, added a chooser for which maps app opens directions, and fixed MapLibre crashes around the camera and pins. I capped how much memory cafe photos take when they decode, redesigned the Profile, Settings, Lists, Been, and Search screens, built the share overlays for cafe crawls, and shipped releases 1.1.1 and 1.1.2.",
          "On the owner portal I added dark mode, then spent a day hardening it. Analytics windows now use Manila time instead of the server's, the PostHog sync pages through results instead of stopping at the first batch, and uploads check the real file bytes and that the menu item belongs to the owner.",
          "On the admin panel I redid the dashboard into two bands, things that need attention and things that are growing, and fixed bugs like search text breaking PostgREST filters, claim approvals that could double-apply on retry, and an admin being able to delete their own account. In the backend I made revoking an owner invite also remove that owner's access.",
        ],
      },
    ],
  },

  "val-residences": {
    period: "Jun to Jul 2025",
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "Val Residences needed one system for the whole rental cycle: a listing, an application, a lease, moving in, then monthly bills and maintenance requests until the tenant leaves.",
        ],
      },
      {
        heading: "How it works",
        paragraphs: [
          "It's Laravel with Inertia and React. There's one users table with a type column for landlord, tenant, and prospective tenant, and each type gets its own model through single-table inheritance. A middleware checks the type before any landlord or tenant route runs.",
          "Two scheduled commands do the bookkeeping. One generates every tenant's bill at 9am on the first of the month, and the other marks unpaid bills overdue each day. The app emails people when an application changes status, a bill is generated, a payment goes overdue, or a maintenance request comes in.",
        ],
      },
      {
        heading: "My part",
        paragraphs: [
          "I did most of the frontend. That covers the landing, About, and Contact pages, the login and sign-up modals, the header that changes by role, and the sidebar. On the tenant side I built the dashboard, the listings grid with its apply modal, the application status page, the GCash, PayMaya, and bank transfer payment pages, and the maintenance request page. On the landlord side I built rent collection and the financial report tabs.",
          "On the backend I wrote the tenant and user controllers, the email notifications, and the two billing commands. Near the end I broke the tenant dashboard into reusable components.",
        ],
      },
      {
        heading: "Decisions",
        paragraphs: [
          "Payments are manual. Tenants pay through GCash, PayMaya, or a bank transfer and upload proof, and the landlord confirms it. We skipped a payment gateway, so nothing moves until the landlord checks the proof.",
          "We cut features to ship: subscriptions, exports, and an expenses table all came out. Revenue on the dashboard went from yearly to monthly. Existing tenants can be added by hand and get a password reset email, so the landlord didn't have to make them reapply. Occupied units hide the apply button.",
        ],
      },
    ],
  },
};
