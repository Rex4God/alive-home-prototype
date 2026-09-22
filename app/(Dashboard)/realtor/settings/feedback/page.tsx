import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/auth";
import Trash from "@/components/trash/Trash";

export const metadata: Metadata = {
  title: "Feedback | Alive Home",
  description: "Alive Home - AI-driven real estate technology platform",
};
export default async function FeedbackPage() {
  const session = await auth();
  const token = session?.user?.token;
  const userId = session?.user?.id;
  if (!session?.user || !token || !userId) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen p-6 pt-24 lg:p-12 xl:p-20 lg:pt-32 xl:pt-32 font-sans text-md">
      <div className="w-full font-sans text-md ">
        <p className="text-2xl font-bold mb-2">Feedback</p>
        <p className="text-gray-500">Manage the Feedback of your account</p>
      </div>
      <div className="gap-2 my-6">
        <Trash
          headingText="No Feedback Yet"
          subHeadingText="No feedback found yet. Check back later or contact support for assistance."
        />
      </div>
    </main>
  );
}
