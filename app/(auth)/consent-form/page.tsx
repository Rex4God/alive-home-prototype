import RightContainer from "@/components/auth-components/RightContainer";
import ConsentForm from "@/components/auth-components/ConsentForm";

export default function ConsentFormPage() {
  return (
    <div className="text-[#414242] w-full md:flex justify-between h-screen overflow-y-hidden">
      <ConsentForm />
      <RightContainer />
    </div>
  );
}
