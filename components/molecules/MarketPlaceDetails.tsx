"use client";
import React, { useState } from "react";
import {
  ArrowLeft,
  Heart,
  Share2,
  Bed,
  Bath,
  Square,
  Car,
  Wifi,
  MapPin,
  Star,
  Phone,
  Mail,
} from "lucide-react";
import { MapView } from "@/components/molecules/MapView";
import { propertiesData } from "@/utils/propertiesData";
import { PropertyProps } from "@/types/property";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface MarketPlaceDetailsProps {
  propertyId: string;
}

export default function MarketPlaceDetails({
  propertyId,
}: MarketPlaceDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedProperty, setSelectedProperty] =
    useState<PropertyProps | null>(null);
  const [saved, setSaved] = useState(false);
  const router = useRouter();
  const property = propertiesData.find((p) => p.id === Number(propertyId));

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Property Not Found
          </h1>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50"
        />
      );
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="cursor-pointer flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Go back</span>
            </Button>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSaved(!saved)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  saved
                    ? "bg-red-50 text-red-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Heart className={`w-5 h-5 ${saved ? "fill-red-600" : ""}`} />
                <span className="font-medium">Save</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                <Share2 className="w-5 h-5" />
                <span className="font-medium">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="relative">
                <Image
                  width={800}
                  height={600}
                  src={property.images[currentImageIndex]}
                  alt="Property"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  360°
                </div>
              </div>

              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg cursor-pointer overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex
                          ? "border-[#C77D01]"
                          : "border-gray-200"
                      }`}
                    >
                      <Image
                        width={80}
                        height={80}
                        src={image}
                        alt={`Property ${index + 1}`}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {formatPrice(property.price)}
                  </h1>
                  <p className="text-gray-600">
                    Est. {formatPrice(property.monthlyPrice)}/mo
                  </p>
                </div>

                <div className="flex items-center space-x-1">
                  <span className="text-xl font-bold text-gray-900">
                    {property.rating}
                  </span>
                  <div className="flex space-x-1">
                    {renderStars(property.rating)}
                  </div>
                </div>
              </div>

              <div className="flex items-center text-gray-600 mb-6">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{property.address}</span>
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Bed className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="font-semibold">{property.beds}</div>
                    <div className="text-sm text-gray-600">Beds</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Bath className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="font-semibold">{property.baths}</div>
                    <div className="text-sm text-gray-600">Baths</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Square className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="font-semibold">{property.pool}</div>
                    <div className="text-sm text-gray-600">Pool</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Car className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="font-semibold">{property.parking}</div>
                    <div className="text-sm text-gray-600">Parking space</div>
                  </div>
                </div>
              </div>

              {property.wifi && (
                <div className="flex items-center text-gray-600 mb-6">
                  <Wifi className="w-5 h-5 mr-2" />
                  <span>Wi-Fi</span>
                </div>
              )}

              <div className="border-t pt-6">
                <p className="text-gray-700 leading-relaxed">
                  {property.description}
                </p>
              </div>
            </div>

            {/* Floor Plan */}
            <div className="relative bg-white rounded-2xl p-6 shadow-sm">
              <div className="sticky top-8">
                <div
                  className="bg-gray-100 rounded-lg overflow-hidden"
                  style={{ height: "600px" }}
                >
                  {/* Map Background */}
                  <div
                    className="w-full h-full relative bg-cover bg-center"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='%23e5e7eb' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`,
                    }}
                  >
                    {/* Street Labels */}
                    <div className="absolute top-4 left-4 text-xs text-gray-600 bg-white px-2 py-1 rounded shadow">
                      Torrance Blvd
                    </div>
                    <div className="absolute bottom-20 right-8 text-xs text-gray-600 bg-white px-2 py-1 rounded shadow">
                      Avenue E
                    </div>
                    <div className="absolute top-1/2 left-2 text-xs text-gray-600 bg-white px-2 py-1 rounded shadow transform -rotate-90">
                      International Ave
                    </div>
                    {/* Neighborhood Labels */}
                    <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-700 bg-white px-3 py-1 rounded-full shadow">
                      CLIFTON
                    </div>
                    {/* Property Pins */}
                    {propertiesData.map((prop) => (
                      <MapView
                        key={prop.id}
                        property={prop}
                        isSelected={selectedProperty?.id === prop.id}
                        onClick={setSelectedProperty}
                      />
                    ))}
                    {/* Water/Ocean areas */}
                    <div className="absolute top-0 left-0 w-1/4 h-2/3 bg-blue-200 opacity-50"></div>
                    <div className="absolute top-2/3 right-0 w-1/3 h-1/3 bg-green-200 opacity-30"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - About Property and Agent */}
          <div className="space-y-6">
            {/* About Property */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                About property
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {property.description}
              </p>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tower:</span>
                  <span className="font-medium">{property.tower}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{property.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed:</span>
                  <span className="font-medium">{property.completionDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Area:</span>
                  <span className="font-medium">{property.sqft} sq.m</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Features</h2>
              <ul className="space-y-2">
                {property.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-[#C77D01] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Agent */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-4 mb-6">
                <Image
                  width={48}
                  height={48}
                  src={property.agent.avatar}
                  alt={property.agent.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm text-gray-600">Agent</div>
                  <div className="font-semibold text-gray-900">
                    {property.agent.name}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full  py-6 px-4 cursor-pointer rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>Contact</span>
                </Button>
                <button className="w-full bg-[#C77D01] hover:bg-[#C77D01]/90 cursor-pointer text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>Send a request</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
