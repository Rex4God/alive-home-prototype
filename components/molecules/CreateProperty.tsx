"use client";
import { createPropertyRequest } from "@/app/services/property-service/property.service";
import { useQueryClient } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, X } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

interface CreatePropertyProps {
  toggleChat: () => void;
}

export default function CreateProperty({ toggleChat }: CreatePropertyProps) {
  const { data: session } = useSession();
  const token = session?.user?.token as string;
  const userId = session?.user?.id as string;
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    ownerId: userId,
    title: "",
    description: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    squareFeet: "",
    yearBuilt: "",
    lotSize: "",
    latitude: "",
    longitude: "",
    price: "",
    status: "",
    features: "",
    ImageTitle: [] as File[],
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFormData((prev) => ({
      ...prev,
      ImageTitle: Array.from(e.target.files as any),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formPayload = new FormData();
      // Append text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "ImageTitle") {
          formPayload.append(key, value as string);
        }
      });
      // Append files
      formData.ImageTitle.forEach((file) => {
        formPayload.append("ImageTitle", file);
      });
      await createPropertyRequest(formPayload, token);
      toast.success("Property listed successfully!");
      await queryClient.invalidateQueries({
        queryKey: ["getProperties"],
      });
      toggleChat();
    } catch (error: any) {
      console.error("Error:", error);
      toast.error("Failed to save property. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto mt-10 bg-white shadow-sm rounded-2xl p-8">
        <div>
          <div className="mb-8 flex items-center justify-between text-[#C77D01]">
            <p className="text-lg font-semibold">Create Property Listing</p>
            <button
              onClick={() => toggleChat()}
              className="rounded-md gap-6 hover:bg-slate-100 p-2 cursor-pointer"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Property Title</Label>
              <Input
                id="title"
                placeholder="Beautiful Family House"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type</Label>
              <Select
                value={formData.propertyType}
                onValueChange={(val) => handleChange("propertyType", val)}
              >
                <SelectTrigger id="propertyType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="z-[1100]" position="popper">
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
              </Select>
            </div>
          </section>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Write a short description about the property..."
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* Location */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleChange("state", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleChange("zipCode", e.target.value)}
              />
            </div>
          </section>

          {/* Property Details */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Bedrooms</Label>
              <Input
                type="number"
                value={formData.bedrooms}
                onChange={(e) => handleChange("bedrooms", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Bathrooms</Label>
              <Input
                type="number"
                value={formData.bathrooms}
                onChange={(e) => handleChange("bathrooms", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Square Feet</Label>
              <Input
                type="number"
                value={formData.squareFeet}
                onChange={(e) => handleChange("squareFeet", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Year Built</Label>
              <Input
                type="number"
                value={formData.yearBuilt}
                onChange={(e) => handleChange("yearBuilt", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Lot Size</Label>
              <Input
                type="number"
                value={formData.lotSize}
                onChange={(e) => handleChange("lotSize", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Price ($)</Label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
              />
            </div>
          </section>

          {/* Coordinates */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Latitude</Label>
              <Input
                value={formData.latitude}
                onChange={(e) => handleChange("latitude", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Longitude</Label>
              <Input
                value={formData.longitude}
                onChange={(e) => handleChange("longitude", e.target.value)}
              />
            </div>
          </section>

          {/* Status */}
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(val) => handleChange("status", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="z-[1100]" position="popper">
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
                <SelectItem value="AVAILABLE">Available</SelectItem>
                <SelectItem value="SOLD">Sold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Features */}
          <div className="space-y-2">
            <Label htmlFor="features">Features</Label>
            <Input
              id="features"
              placeholder="Pool, Garage, Garden..."
              value={formData.features}
              onChange={(e) => handleChange("features", e.target.value)}
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label>Property Images</Label>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            {formData.ImageTitle.length > 0 && (
              <ul className="list-disc list-inside text-sm text-gray-600">
                {formData.ImageTitle.map((file, idx) => (
                  <li key={idx}>{file.name}</li>
                ))}
              </ul>
            )}
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
              "Publish Property"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
