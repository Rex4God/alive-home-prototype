import RightContainer from "@/components/auth-components/RightContainer";
import LoginHome from "@/components/auth-components/LoginHome";

export default async function LoginPage() {
  return (
    <div className="text-[#1F4D36] md:flex justify-between h-screen overflow-y-hidden">
      <LoginHome />
      <RightContainer />
    </div>
  );
}
