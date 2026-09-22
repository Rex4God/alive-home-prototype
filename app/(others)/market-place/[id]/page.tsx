import MarketPlaceDetails from "@/components/molecules/MarketPlaceDetails";
import Subscribe from "@/components/landing-page/Subscribe";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { redirect } from "next/navigation";
import { use } from "react";

export default function MarketPlaceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const propertyId = id;
  if (!propertyId) {
    redirect("/not-found");
  }
  return (
    <div className="min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <MarketPlaceDetails propertyId={propertyId} />
      <Subscribe />
      <Footer />
    </div>
  );
}
