import PropertyInsights from "@/components/molecules/PropertyInsight";
import { StatisticsCard } from "@/components/cards/StatisticsCard";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return (
    <main className="min-h-screen p-6 pt-24 lg:p-12 xl:p-20 lg:pt-32 xl:pt-32 font-sans text-md">
      <div className="w-full font-sans text-md ">
        <p className="text-2xl font-bold mb-2">Analytics</p>
        <p className="text-gray-500">Manage the Analytics of your account</p>
      </div>
      <div className="my-8 grid grid-cols-2 gap-3 xl:grid-cols-4 xl:gap-6">
        <StatisticsCard title={"Saved Properties"} value={20} />
        <StatisticsCard title={"New Recommendations"} value={40} />
        <StatisticsCard title={"Saved Properties"} value={50} />
        <StatisticsCard title={"Saved Properties"} value={80} />
      </div>
      <PropertyInsights />
    </main>
  );
}
