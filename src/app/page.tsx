import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Rooms from "@/components/home/Rooms";
import Amenities from "@/components/home/Amenities";
import Gallery from "@/components/home/Gallery";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import Packages from "@/components/home/Packages";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Packages />
      <Amenities />
      <Rooms />
      <Testimonials />
      <Gallery />
      <CTA />
    </>
  );
}
