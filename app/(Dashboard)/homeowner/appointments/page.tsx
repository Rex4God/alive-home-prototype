import Trash from "@/components/trash/Trash";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Appointments | Alive Home",
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
        <p className="text-2xl font-bold mb-2">Appointments</p>
        <p className="text-gray-500">
          Manage the clients (buyers) appointment{" "}
        </p>
      </div>
      <div className="gap-2 my-6">
        <Trash
          headingText="No new Appointment Yet"
          subHeadingText="No appointment have been received yet. Check back later."
        />
      </div>
    </main>
  );
}
