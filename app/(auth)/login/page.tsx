import RightContainer from "@/components/auth-components/RightContainer";
import LoginHome from "@/components/auth-components/LoginHome";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default async function LoginPage() {
  return (
    <div className="text-[#1F4D36] md:flex justify-between h-screen overflow-y-hidden">
      <LoginHome />
      <RightContainer />
    </div>
  );
}
