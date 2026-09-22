"use client";
import PropertyOne from "@/public/assets/property1.jpg";
import PropertyTwo from "@/public/assets/property2.jpg";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

const properties = [
  {
    id: 1,
    title: "Luxury Loft in San Francisco, CA",
    address: "8706 Herrick Ave, Los Angeles",
    price: "₦8,495,000",
    status: "For Sale",
    statusColor: "bg-red-500",
    image: PropertyOne,
    sqft: "6767 sqft",
    beds: 10,
    baths: 8,
    garages: 4,
  },
  {
    id: 2,
    title: "Office in North Beach, San Francisco",
    address: "575 Main St 401, San Francisco",
    price: "₦6,400",
    status: "For Rent",
    statusColor: "bg-green-500",
    image: PropertyTwo,
    sqft: "1815 sqft",
    beds: 2,
    baths: 1,
    garages: 3,
  },
];

export default function FeaturedProperties() {
  const router = useRouter();
  return (
    <section className="bg-white py-12 px-6 mb-8 md:mb-20 md:px-12 lg:px-20 max-w-[1300px] mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl md:text-3xl font-bold text-gray-800">
          Featured properties
        </h2>
        <button
          onClick={() => router.push("/login")}
          className="px-2 md:px-5 py-2 text-xs md:text-base rounded-md md:rounded-full cursor-pointer border text-gray-600 hover:bg-gray-100 transition"
        >
          Browse all properties
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {properties.map((property, i) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="flex flex-col rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition"
          >
            {/* Image Section */}
            <div className="relative w-full h-64">
              <Image
                src={property.image}
                alt={property.title}
                fill
                className="object-cover"
              />
              <span
                className={`absolute top-4 right-4 text-white text-sm px-3 py-1 rounded-full ${property.statusColor}`}
              >
                {property.status}
              </span>
            </div>

            {/* Details Section */}
            <div className="w-full bg-white p-6 flex flex-col justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{property.address}</p>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                  {property.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2 mb-4">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit feugiat
                  purus suscipit turpis sed vitae.
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-red-500">
                  {property.price}
                </span>
              </div>

              {/* Features */}
              <div className="flex gap-4 mt-4 text-gray-600 text-sm">
                <span>🏠 {property.sqft}</span>
                <span>🛏 {property.beds}</span>
                <span>🛁 {property.baths}</span>
                <span>🚗 {property.garages}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
