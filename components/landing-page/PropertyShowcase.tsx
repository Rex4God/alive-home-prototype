"use client";
import PropertyEight from "@/public/assets/property8.jpg";
import PropertySeven from "@/public/assets/property7.jpg";
import PropertyThree from "@/public/assets/property3.jpg";
import PropertyFour from "@/public/assets/property4.jpg";
import PropertyFive from "@/public/assets/property5.jpg";
import PropertyOne from "@/public/assets/property1.jpg";
import PropertyTwo from "@/public/assets/property2.jpg";
import PropertySix from "@/public/assets/property6.jpg";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

const properties = [
  PropertyOne,
  PropertyTwo,
  PropertyThree,
  PropertyFour,
  PropertyFive,
  PropertySix,
  PropertySeven,
  PropertyEight,
];

function MarqueeRow({
  reverse = false,
  speed = 30,
}: {
  reverse?: boolean;
  speed?: number;
}) {
  const router = useRouter();
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-6"
        animate={{ x: reverse ? ["0%", "-100%"] : ["-100%", "0%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: speed,
          ease: "linear",
        }}
        onClick={() => router.push("/market-place")}
      >
        {[...properties, ...properties].map((src, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer min-w-[250px] max-w-[250px] flex-shrink-0"
          >
            <Image
              src={src}
              alt={`Property ${i + 1}`}
              width={500}
              height={300}
              className="object-cover w-full h-48 md:h-60"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function PropertyShowcase() {
  return (
    <section className="bg-[#F8F8F8] py-12 px-3 md:px-4 lg:px-4">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800"
        >
          We Help You Find Your Dream Property At The Best Price
        </motion.h1>
      </div>
      <MarqueeRow reverse={false} speed={30} />
      <div className="h-6" />
      <MarqueeRow reverse={true} speed={35} />
    </section>
  );
}
