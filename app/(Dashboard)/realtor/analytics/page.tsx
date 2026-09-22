import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/auth";
import SavedProperties from "@/components/molecules/SavedProperties";

export const metadata: Metadata = {
  title: "Saved Property | Alive Home",
  description: "Alive Home AI - AI-driven real estate technology platform",
};
export default async function TestPage() {
  const session = await auth();
  const token = session?.user?.token;
  const userId = session?.user?.id;
  if (!session?.user || !token || !userId) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen p-6 pt-24 lg:p-12 xl:p-20 lg:pt-32 xl:pt-32 font-sans text-md">
      <div className="w-full font-sans text-md ">
        <p className="text-2xl font-bold mb-2">Analytics</p>
        <p className="text-gray-500">Manage the Analytics here</p>
      </div>

      <SavedProperties />
    </main>
  );
}
