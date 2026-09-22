import MarketPlace from "@/components/molecules/MarketPlace";
import Subscribe from "@/components/landing-page/Subscribe";
import Faq from "@/components/landing-page/Faq";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

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
