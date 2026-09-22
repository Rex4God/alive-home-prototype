"use client";
import { PropertyCard } from "@/components/cards/PropertyCard";
import { propertiesData } from "@/utils/propertiesData";
import { PropertyProps } from "@/types/property";
import { Search, MapPin } from "lucide-react";
import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function MarketPlace() {
  const [selectedProperty, setSelectedProperty] =
    useState<PropertyProps | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Find your dream apartment
            </h1>
            <nav className="flex space-x-8">
              <a href="#" className="text-gray-900 font-medium">
                Buy
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Rent
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Sell
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Realtor
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col-reverse space-x-0 items-start  space-y-2 md:space-y-0 md:flex-row md:items-center md:space-x-4">
            {/* Home Type Dropdown */}
            <div className="space-y-2">
              <Select
              // value={formData.propertyType}
              // onValueChange={(val) => handleChange("propertyType", val)}
              >
                <SelectTrigger className="py-5 cursor-pointer w-[200px]">
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
              </Select>
            </div>

            {/* Price Range Dropdown */}
            <div className="space-y-2">
              <Select
              // value={formData.propertyType}
              // onValueChange={(val) => handleChange("propertyType", val)}
              >
                <SelectTrigger className="py-5 cursor-pointer w-[200px]">
                  <SelectValue placeholder="₦100 000 - ₦500 000" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100-500">₦100 000 - ₦500 000</SelectItem>
                  <SelectItem value="600-1">₦600 000 - ₦1,000 000</SelectItem>
                  <SelectItem value="1.5-3">₦1.5M - ₦3M</SelectItem>
                  <SelectItem value="5-10">₦5M - ₦10M</SelectItem>
                  <SelectItem value="20-50">₦20M - ₦50M</SelectItem>
                  <SelectItem value="100-300">₦100M - ₦300M</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location Input */}
            <div className="relative flex-1 max-w-md">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                onChange={(e) => console.log(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-transparent"
                placeholder="Enter location"
              />
            </div>
            {/* Search Button */}
            <button className="cursor-pointer hidden md:block bg-black text-white p-2 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols- gap-8">
          {/* Property Grid */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {propertiesData.map((property) => (
                <PropertyCard key={property.id} property={property as any} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
