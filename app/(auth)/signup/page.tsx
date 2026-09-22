import RightContainer from "@/components/auth-components/RightContainer";
import Signup from "@/components/auth-components/Signup";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default function SignUp() {
  return (
    <div className="text-[#414242] md:flex justify-between h-screen overflow-y-hidden">
      <Signup />
      <RightContainer />
    </div>
  );
}
