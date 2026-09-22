import RightContainer from "@/components/auth-components/RightContainer";
import ConsentForm from "@/components/auth-components/ConsentForm";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default function ConsentFormPage() {
  return (
    <div className="text-[#414242] w-full md:flex justify-between h-screen overflow-y-hidden">
      <ConsentForm />
      <RightContainer />
    </div>
  );
}
