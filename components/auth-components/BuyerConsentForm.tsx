"use client";
import { createBuyerRequest } from "@/app/services/users-service/buyers.request";
import BrandLogo from "@/public/assets/alive-home-logo.png";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

export default function BuyerConsentForm() {
  const { data: session } = useSession();
  const token = session?.user?.token as string;
  const userId = session?.user?.id as string;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    minimumBudget: "",
    maximumBudget: "",
    preApproved: false,
    preApprovalAmount: "",
    preferredLocations: [],
    propertyType: "",
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = { ...formData, userId };
      await createBuyerRequest(payload, token);
      toast.success("Profile saved successfully!");
      router.push("/buyer");
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
            Buyer Consent Form
          </p>
          <p className="text-[#7C8898]">
            Please provide your Information to complete your profile.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Budget */}
          <div className="space-y-2">
            <Label htmlFor="minBudget">Minimum Budget</Label>
            <Input
              id="minBudget"
              type="number"
              value={formData.minimumBudget}
              onChange={(e) =>
                handleChange("minimumBudget", Number(e.target.value))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxBudget">Maximum Budget</Label>
            <Input
              id="maxBudget"
              type="number"
              value={formData.maximumBudget}
              onChange={(e) =>
                handleChange("maximumBudget", Number(e.target.value))
              }
            />
          </div>
          {/* Pre-Approval */}
          <div className="flex items-center justify-between">
            <Label htmlFor="preApproved">Pre-Approved</Label>
            <Switch
              id="preApproved"
              checked={formData.preApproved}
              onCheckedChange={(val) => handleChange("preApproved", val)}
            />
          </div>
          {formData.preApproved && (
            <div className="space-y-2">
              <Label htmlFor="approvalAmount">Pre-Approval Amount</Label>
              <Input
                id="approvalAmount"
                type="number"
                value={formData.preApprovalAmount}
                onChange={(e) =>
                  handleChange("preApprovalAmount", Number(e.target.value))
                }
              />
            </div>
          )}
          {/* Preferred Locations */}
          <div className="space-y-2">
            <Label htmlFor="locations">Preferred Locations</Label>
            <Input
              id="locations"
              placeholder="Enter comma-separated locations"
              value={formData.preferredLocations.join(", ")}
              onChange={(e) =>
                handleChange(
                  "preferredLocations",
                  e.target.value.split(",").map((loc) => loc.trim())
                )
              }
            />
            <p className="text-sm text-gray-500">
              Example: Lagos, Abuja, Edo, PH
            </p>
          </div>
          {/* Property Type */}
          <div className="space-y-2">
            <Label>Property Type</Label>
            <Select
              value={formData.propertyType}
              onValueChange={(val) => handleChange("propertyType", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="townhouse">Town House</SelectItem>
                <SelectItem value="single family">Single Family</SelectItem>
                <SelectItem value="multifamily">Multi Family</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="land">Land</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
              </SelectContent>
              {/* propertyType must be one of [apartment, house, villa, townhouse,
              detached house, boys quarters, semi detached, terrace house,
              duplex, mansion, estate house, bungalow, penthouse, mini flat,
              chalet, commercial, land, commercial office, commercial plaza,
              retail shop, warehouse, hotel, land residential, room and parlour,
              compound, student hostel, land commercial, land industrial, land
              agricultural, serviced apartment, self contained, condo,
              multifamily, single family] */}
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
