import Trash from "@/components/trash/Trash";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/auth";
import Message from "@/components/molecules/Message";

export const metadata: Metadata = {
  title: "Message | Alive Home",
  description: "Alive Home - AI-driven real estate technology platform",
};
export default async function MessagePage() {
  const session = await auth();
  const token = session?.user?.token;
  const userId = session?.user?.id;
  if (!session?.user || !token || !userId) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen p-6 pt-24 lg:p-12 xl:p-20 lg:pt-32 xl:pt-32 font-sans text-md">
      <div className="w-full font-sans text-md ">
        {/* <p className="text-2xl font-bold mb-2">Message</p> */}
        {/* <p className="text-gray-500">Manage the Message of your account</p> */}
      </div>
      <Message />
    </main>
  );
}
