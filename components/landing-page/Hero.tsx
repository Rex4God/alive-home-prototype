"use client";
import HeroImage from "@/public/assets/realestate.png";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Hero() {
  const router = useRouter();
  return (
    <section className="relative h-[750px] lg:h-[922px] w-full">
      {/* Background Image */}
      <Image
        src={HeroImage}
        alt="Hero Background"
        fill
        priority
        className="object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/70" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          Buy, Sell, or Rent Smarter – Powered{" "}
          <br className="hidden md:block" />
          by <span className="text-[#C77D01]">AI, AR/VR</span>, and Real-Time
          Insights
        </h1>
        <p className="mt-4 text-gray-700 text-base md:text-lg max-w-2xl">
          Join Nigeria&apos;s trusted real estate ecosystem for unparalleled
          property discovery and management.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex space-x-6">
          <button
            onClick={() => router.push("/signup")}
            className="bg-[#C77D01] hover:bg-[#e68a00] cursor-pointer text-white px-6 py-3 rounded-md font-semibold"
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}
