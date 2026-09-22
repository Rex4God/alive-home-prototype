import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/auth";
// import Trash from "@/components/trash/Trash";

export const metadata: Metadata = {
  title: "Security | Alive Home ai",
  description: "Alive Home AI - AI-driven real estate technology platform",
};
export default async function SecurityPage() {
  const session = await auth();
  const token = session?.user?.token;
  const userId = session?.user?.id;
  if (!session?.user || !token || !userId) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen p-6 pt-24 lg:p-12 xl:p-20 lg:pt-32 xl:pt-32 font-sans text-md">
      <div className="w-full font-sans text-md ">
        <p className="text-2xl font-bold mb-2">Security</p>
        <p className="text-gray-500">Manage the Security of your account</p>
      </div>
      <div className="gap-2 my-6">
        {/* <Trash
          headingText=""
          subHeadingText="No users have been added yet. Click the 'Add User' button above to create a new user."
        /> */}
      </div>
    </main>
  );
}
