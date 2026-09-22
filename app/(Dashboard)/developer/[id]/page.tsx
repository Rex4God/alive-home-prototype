// import StudentDetails from "@/app/components/student-components/StudentDetails";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { use } from "react";

export default async function StudentDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const freelancerId = id;
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (!freelancerId) {
    notFound();
  }

  return (
    <>
      <main className="min-h-screen p-6 lg:p-12 xl:p-20 xl:px-2 xl:pl-16">
        {/* <StudentDetails companyId={companyId} session={session} /> */}
      </main>
    </>
  );
}
