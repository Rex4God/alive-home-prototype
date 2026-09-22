import ResetPassword from "@/components/auth-components/ResetPassword";
import RightContainer from "@/components/auth-components/RightContainer";

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
