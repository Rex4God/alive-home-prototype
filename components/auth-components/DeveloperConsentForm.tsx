"use client";
import { createDeveloperRequest } from "@/app/services/users-service/developer.request";
import BrandLogo from "@/public/assets/alive-home-logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function DeveloperConsentForm() {
  const { data: session } = useSession();
  const token = session?.user?.token as string;
  const userId = session?.user?.id as string;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    cacRegNumber: "",
    yearsInBusiness: "",
    projectsCompleted: "",
    websiteUrl: "",
    officeAddress: "",
    companyLogoUrl: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append("userId", userId);
      formDataUpload.append("companyName", formData.companyName);
      formDataUpload.append("cacRegNumber", formData.cacRegNumber);
      formDataUpload.append(
        "yearsInBusiness",
        String(formData.yearsInBusiness)
      );
      formDataUpload.append(
        "projectsCompleted",
        String(formData.projectsCompleted)
      );
      formDataUpload.append("websiteUrl", formData.websiteUrl);
      formDataUpload.append("officeAddress", formData.officeAddress);
      if (file) {
        formDataUpload.append("companyLogoUrl", file);
      }

      console.log("Final FormData Payload:", [...formDataUpload.entries()]);
      const response = await createDeveloperRequest(formDataUpload, token);

      if (!response) {
        toast.error("Failed to create Profile");
        throw new Error("Failed to create Profile");
      }
      toast.success("Profile created successfully!");
      router.push("/developer");
    } catch (error: any) {
      const apiError = error?.response?.data?.error;
      toast.error(apiError || "Failed to save profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Link href="/" className="flex items-center relative w-20 h-10">
        <Image
          src={BrandLogo}
          alt="Alive Home brand logo"
          width={100}
          height={100}
          priority
          className="object-contain absolute"
        />
      </Link>
      <div className="max-w-[540px] mx-auto mt-10">
        <div className="mb-6">
          <p className="text-[24px] text-[#141414] font-bold">
            Developer Consent Form
          </p>
          <p className="text-[#7C8898]">
            Please provide your company details to complete your developer
            profile.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              type="text"
              value={formData.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
            />
          </div>

          {/* CAC Reg Number */}
          <div className="space-y-2">
            <Label htmlFor="cacRegNumber">CAC Registration Number</Label>
            <Input
              id="cacRegNumber"
              type="text"
              value={formData.cacRegNumber}
              onChange={(e) => handleChange("cacRegNumber", e.target.value)}
            />
          </div>

          {/* Years in Business */}
          <div className="space-y-2">
            <Label htmlFor="yearsInBusiness">Years in Business</Label>
            <Input
              id="yearsInBusiness"
              type="number"
              value={formData.yearsInBusiness}
              onChange={(e) => handleChange("yearsInBusiness", e.target.value)}
            />
          </div>

          {/* Projects Completed */}
          <div className="space-y-2">
            <Label htmlFor="projectsCompleted">Projects Completed</Label>
            <Input
              id="projectsCompleted"
              type="number"
              value={formData.projectsCompleted}
              onChange={(e) =>
                handleChange("projectsCompleted", e.target.value)
              }
            />
          </div>

          {/* Website URL */}
          <div className="space-y-2">
            <Label htmlFor="websiteUrl">Website URL</Label>
            <Input
              id="websiteUrl"
              type="url"
              value={formData.websiteUrl}
              onChange={(e) => handleChange("websiteUrl", e.target.value)}
            />
          </div>

          {/* Office Address */}
          <div className="space-y-2">
            <Label htmlFor="officeAddress">Office Address</Label>
            <Input
              id="officeAddress"
              type="text"
              value={formData.officeAddress}
              onChange={(e) => handleChange("officeAddress", e.target.value)}
            />
          </div>

          {/* Company Logo Upload */}
          <div className="space-y-2">
            <Label htmlFor="logo">Company Logo</Label>
            <Input
              id="logo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {file && (
              <p className="text-sm text-gray-500">Selected: {file.name}</p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full p-4 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Saving...
              </span>
            ) : (
              "Save Now"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
