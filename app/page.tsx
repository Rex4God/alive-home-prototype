import FeaturedProperties from "@/components/landing-page/FeaturesProperty";
import PropertyShowcase from "@/components/landing-page/PropertyShowcase";
import WhyChooseUs from "@/components/landing-page/WhyChooseUs";
import Subscribe from "@/components/landing-page/Subscribe";
import Hero from "@/components/landing-page/Hero";
import Faq from "@/components/landing-page/Faq";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
      <Hero />
      <Navbar />
      <PropertyShowcase />
      <FeaturedProperties />
      <WhyChooseUs />
      <Faq />
      <Subscribe />
      <Footer />
    </div>
  );
}
