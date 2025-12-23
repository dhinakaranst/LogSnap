import Hero from "@/components/Hero";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar"
import KeyFeatures from "@/components/KeyFeatures";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
       <KeyFeatures />
      <About />
      <Contact />
      <Footer />
    </main>
    
  );
}
