import ForgotPassword from "@/components/auth-components/ForgotPassword";
import RightContainer from "@/components/auth-components/RightContainer";

export default async function ForgotPasswordPage() {
  return (
    <div className="text-[#414242] md:flex justify-between h-screen overflow-y-hidden">
      <ForgotPassword />
      <RightContainer />
    </div>
  );
}
