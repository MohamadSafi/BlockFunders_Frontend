import Footer from "@/components/Footer/Footer";
import Benefits from "@/components/Home/Benefits";
import FeaturedSection from "@/components/Home/Featured";
import { benefitOne, benefitTwo } from "../components/Home/Data";
import ShuffleHero from "@/components/Home/Hero";
import { ResponsiveNavbar } from "@/components/navbar/Navbar";

export default function Home() {
  return (
    <main className="w-screen h-auto p-4">
      <ResponsiveNavbar />
      <ShuffleHero />
      <FeaturedSection />
      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitTwo} />
      <Footer />
    </main>
  );
}
