import Image from "next/image";
import Landing from "./landing/page";
import Nav from "./components/navbar";

export default function Home() {
  return (
    <>
      <Nav />
      <Landing />
    </>
  );
}
