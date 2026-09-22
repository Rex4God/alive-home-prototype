"use client";
import { getPropertiesRequest } from "@/app/services/property-service/property.service";
import { PropertyCardSkeleton } from "@/components/skeletons/PropertySkeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Trash from "@/components/trash/Trash";
import Image from "next/image";

const placeholderImages = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
  "https://images.unsplash.com/photo-1600612622563-3f85c3b944be",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
];

export default function SavedProperties() {
  const { data: session } = useSession();
  const token = session?.user?.token as string;

  // Fetch Properties Data
  const { data: getProperties, isLoading } = useQuery<any>({
    queryKey: ["getProperties"],
    queryFn: async () => await getPropertiesRequest(token),
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: true,
  });
  const propertiesData = getProperties?.data?.data || null;
  return (
    <div className="py-6 space-y-8">
      <div>
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <PropertyCardSkeleton key={idx} />
            ))}
          </div>
        )}
        {propertiesData?.length === 0 ? (
          <div className="gap-2 my-6">
            <Trash
              headingText="No Property"
              subHeadingText="No Property have been received yet. Check back later."
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {propertiesData?.slice(0, 3).map((item: any, index: number) => {
              const mainImage =
                item.media?.find((m: any) => m.isMainImage)?.cloudinaryUrl ||
                placeholderImages[index % placeholderImages.length];
              return (
                <Card
                  key={item.propertyId}
                  className="overflow-hidden shadow-lg"
                >
                  <Image
                    src={mainImage}
                    width={300}
                    height={200}
                    alt={item.title}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-50 object-cover -mt-6"
                  />
                  <CardContent className="p-4 space-y-2">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-green-600 font-bold">
                      ₦{Number(item.price).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      {item.bedrooms} Beds • {item.bathrooms} Baths •{" "}
                      {item.squareFeet.toLocaleString()} sqft
                    </p>
                    {item.features && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.features
                          .split(",")
                          .map((feature: string, idx: number) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                            >
                              {feature.trim()}
                            </span>
                          ))}
                      </div>
                    )}
                    <Button className="w-full mt-3">View Details</Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
