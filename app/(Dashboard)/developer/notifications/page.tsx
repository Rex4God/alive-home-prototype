// import Notification from "@/app/components/student-components/Notifications";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/auth";
import Trash from "@/components/trash/Trash";

export const metadata: Metadata = {
  title: "Notifications | Alive Home",
  description: "Alive Home - AI-driven real estate technology platform",
};

export default async function NotificationPage() {
  const session = await auth();
  const token = session?.user?.token;
  if (!session?.user || !token) {
    redirect("/login");
  }
  return (
    <main className="min-h-screen p-6 pt-24 lg:p-12 xl:p-20 lg:pt-32 xl:pt-32 font-sans text-md">
      <div className="w-full font-sans text-md ">
        <p className="text-2xl font-bold mb-2">Notification</p>
        <p className="max-w-[550px] leading-8 font-light">
          Stay updated with real-time notifications on application requests.
          Alive Home keeps you informed and engaged throughout your
          recommendations . All alerts are personalized and available anytime in
          your dashboard.
        </p>
      </div>
      <div className="gap-2 my-6">
        <Trash
          headingText="No Notifications Yet"
          subHeadingText="No Notification have been received yet. Check back later."
        />
      </div>
    </main>
  );
}
