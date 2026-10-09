// long-form write-ups for /projects/[slug], keyed by the slug in projects.ts;
// facts come from each project's git history and docs, without contribution stats
export type CaseStudy = {
  period: string;
  release?: string;
  problem: string[];
  features: string[];
};

export const caseStudies: Record<string, CaseStudy> = {
  "study-hub": {
    period: "Sep 2026 to now",
    release: "1.13.0",
    problem: [
      "Lecture decks and exercise sheets don't tell you whether you got the answer right. Study Hub turns each CS course this semester into problems the app can check, all in one place, and usable on a phone between classes.",
      "It started as two separate tools, a single HTML page of IAS notes and a Graph Theory app, and grew into one app for every course.",
    ],
    features: [
      "A C tracer. Paste a program and step through it line by line, with pointers drawn as arrows to what they point at. It stops on the line that reads an uninitialized variable or indexes past the end of an array, where real C would print garbage.",
      "Drills graded by running the code. The app takes each answer key from the tracer's recorded steps, so no answer is typed in by hand.",
      "A data-structure visualizer that builds lists, stacks, queues, trees, and graphs one operation at a time.",
      "Course material for Programming 1 and 2, DSA, IAS, Graph Theory, and Automata Theory, with flashcard decks, exam simulators, and a switch for exam conditions.",
      "Battle mode, where up to 30 classmates answer the same question at once and see the scores live.",
      "No account needed. Progress stays in the browser, and signing in syncs it across devices.",
    ],
  },

  nook: {
    period: "Feb 2026 to now",
    release: "1.1.3",
    problem: [
      "Nook helps people in Cebu City find cafes and keep track of the ones they've tried.",
      "Cafe owners also needed a way to keep their own listing right, and the team needed one place to review owners and moderate reviews. So Nook is three apps on one backend.",
    ],
    features: [
      "The iOS and Android app has a feed, a live map, search by tag and location, reviews, custom lists, and Been and Want to Try rankings.",
      "Cafe crawls with stamps you collect at each stop, and share cards for your crawls.",
      "Nook for Business, where owners claim their cafe and manage hours, photos, menu, tags, and reviews, with a traffic dashboard for their listing.",
      "Nook Admin, where the team reviews ownership claims, moderates reviews, and curates cafes, tags, crawls, and achievements.",
      "Sign in with Apple, and directions that open in whichever maps app you use.",
    ],
  },

  "val-residences": {
    period: "Jun to Jul 2025",
    problem: [
      "Running rental units means tracking listings, applications, leases, rent, and repairs. Val Residences puts the whole rental cycle in one system, from the first listing to the last bill.",
    ],
    features: [
      "Listings that prospective tenants can apply to, with the apply button hidden once a unit is occupied.",
      "Application tracking. Applicants see their status, and the landlord reviews documents and approves or rejects from one queue.",
      "Leases and move-in. Existing tenants can be added by hand and get an email to set their password.",
      "Monthly bills generated on the 1st, overdue bills flagged daily, and payment by GCash, PayMaya, or bank transfer with proof the landlord confirms.",
      "Maintenance requests that tenants file and the landlord tracks.",
      "A landlord dashboard with monthly revenue, rent collection, and financial reports, plus email alerts for new applications, bills, overdue payments, and repair requests.",
    ],
  },
};
