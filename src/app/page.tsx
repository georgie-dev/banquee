import Image from "next/image";
import { Nav, Banner } from "@/components";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
    <Nav/>
    <div className="w-full min-h-min flex items-center justify-center">
      <Banner/>
    </div>
    </main>
  );
}
