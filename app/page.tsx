import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Work />
      <About />
      <Contact />
    </>
  );
}
