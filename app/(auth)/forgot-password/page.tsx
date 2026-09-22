import ForgotPassword from "@/components/auth-components/ForgotPassword";
import RightContainer from "@/components/auth-components/RightContainer";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default async function ForgotPasswordPage() {
  return (
    <div className="text-[#414242] md:flex justify-between h-screen overflow-y-hidden">
      <ForgotPassword />
      <RightContainer />
    </div>
  );
}
