import HomeOwnerConsentForm from "./HomeOwnerConsentForm";
import DeveloperConsentForm from "./DeveloperConsentForm";
import RealtorConsentForm from "./RealtorConsentForm";
import BuyerConsentForm from "./BuyerConsentForm";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function ConsentForm() {
  const session = await auth();
  const token = session?.user?.token as string;
  const role = session?.user?.role as string;
  if (!token || !role) {
    redirect("/login");
  }
  return (
    <div className="md:w-1/2 h-full bg-[#FDFDFD] overflow-y-scroll pt-10 pb-20 px-6 lg:px-20">
      {role === "HOMEOWNER" && <HomeOwnerConsentForm />}
      {role === "BUYER" && <BuyerConsentForm />}
      {role === "REALTOR" && <RealtorConsentForm />}
      {role === "DEVELOPER" && <DeveloperConsentForm />}
    </div>
  );
}
