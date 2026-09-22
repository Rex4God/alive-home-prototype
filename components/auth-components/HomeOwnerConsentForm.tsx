"use client";
import { createHomeOwnerRequest } from "@/app/services/users-service/homeowner.request";
import BrandLogo from "@/public/assets/alive-home-logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

export default function HomeOwnerConsentForm() {
  const { data: session } = useSession();
  const token = session?.user?.token as string;
  const userId = session?.user?.id as string;
  const router = useRouter();

  const [formData, setFormData] = useState({
    primaryResidence: "",
    ownershipVerified: false,
    preferredContactMethod: "EMAIL",
    verificationDocsUrls: [] as string[],
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = {
        ...formData,
        verificationDocsUrls: [],
        userId,
      };
      await createHomeOwnerRequest(payload, token);
      toast.success("Profile created successfully!");
      router.push("/homeowner");
    } catch (error: any) {
      const apiError = error?.response?.data?.error;
      console.error("Error saving preferences:", apiError || error.message);
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
            Home Owner Consent Form
          </p>
          <p className="text-[#7C8898]">
            Please provide your Information to complete your profile.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Primary Residence */}
          <div className="space-y-2">
            <Label htmlFor="residence">Primary Residence</Label>
            <Input
              id="residence"
              type="text"
              value={formData.primaryResidence}
              onChange={(e) => handleChange("primaryResidence", e.target.value)}
            />
          </div>

          {/* Contact Method */}
          <div className="space-y-2">
            <Label>Preferred Contact Method</Label>
            <Select
              value={formData.preferredContactMethod}
              onValueChange={(val) =>
                handleChange("preferredContactMethod", val)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select contact method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EMAIL">Email</SelectItem>
                <SelectItem value="PHONE">Phone</SelectItem>
                <SelectItem value="SMS">SMS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full cursor-pointer"
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
