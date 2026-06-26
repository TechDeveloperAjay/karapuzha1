import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Rooms from "@/components/home/Rooms";
import Amenities from "@/components/home/Amenities";
import Gallery from "@/components/home/Gallery";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import Packages from "@/components/home/Packages";
import LocationSection from "@/components/home/LocationSection";
import NearbyAttractions from "@/components/home/NearbyAttractions";
import VideoSection from "@/components/home/VideoSection";
import BlogSection from "@/components/home/BlogSection";
import { getHeroSlides } from "@/actions/hero";

export default async function Home() {
  const slides = await getHeroSlides(true);

  return (
    <>

      <Hero initialSlides={slides} />
      <About />
      <NearbyAttractions />
      <VideoSection />
      <Packages />
      <Amenities />
      <Rooms />
      {/* <Testimonials /> */}
      <Gallery />
      <BlogSection />
      <LocationSection />
      <CTA />
    </>
  );
}
