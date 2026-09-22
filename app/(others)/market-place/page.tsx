import MarketPlace from "@/components/molecules/MarketPlace";
import Subscribe from "@/components/landing-page/Subscribe";
import Faq from "@/components/landing-page/Faq";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";

export default function MarketPlacePage() {
  return (
    <div className="min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <MarketPlace />
      <Faq />
      <Subscribe />
      <Footer />
    </div>
  );
}
