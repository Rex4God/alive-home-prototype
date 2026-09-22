import ResetPassword from "@/components/auth-components/ResetPassword";
import RightContainer from "@/components/auth-components/RightContainer";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const token = searchParams?.token;
  const userId = searchParams.userId;
  return (
    <div className="text-[#414242] md:flex justify-between h-screen overflow-y-hidden">
      <ResetPassword token={token} userId={userId} />
      <RightContainer />
    </div>
  );
}
