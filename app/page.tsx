import Home from "./components/home";
import ContributionGraph from "./components/contribution-graph";
import { getContributions } from "./data/github";

// Server shell: fetch the GitHub calendar (cached a day), hand it to the client landing
export default async function Page() {
  const contributions = await getContributions();
  return <Home contributions={contributions && <ContributionGraph data={contributions} />} />;
}
