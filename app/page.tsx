import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ParallaxText from "@/components/ParallaxText";
import IoTShowcase from "@/components/Page3";
import Page4 from "@/components/Page4";
import Footer from "@/components/footer";
import SoftwarePage from "@/components/pageRPL";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ParallaxText />
      <IoTShowcase />
      <SoftwarePage />  
      <Page4 />
      <Footer />
    </main>
  );
}
