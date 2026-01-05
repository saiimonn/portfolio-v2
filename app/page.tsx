import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center font-sans bg-[--background]">
      <h1 className = "text-[6rem] font-bold tracking-tighter text-foreground">White Text</h1>
      <h1 className = "text-[10rem] font-extrabold tracking-tighter text-blood">BATMAN</h1>
    </div>
  );
}
