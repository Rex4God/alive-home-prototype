import RightContainer from "@/components/auth-components/RightContainer";
import Signup from "@/components/auth-components/Signup";

export default function SignUp() {
  return (
    <div className="text-[#414242] md:flex justify-between h-screen overflow-y-hidden">
      <Signup />
      <RightContainer />
    </div>
  );
}
