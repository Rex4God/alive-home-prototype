import BrandLogo from "@/public/assets/alive-home-logo.png";
import Image from "next/image";

export default function RightContainer() {
  return (
    <div className="bg-gradient-to-br w-full h-screen hidden md:w-1/2 sticky top-0  md:flex gap-28 flex-col pt-52 items-center from-[#C77D01] via-[#C77D01] to-[#C77D01] ">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#C77D01]" />
      <div>
        <Image
          src={BrandLogo}
          alt="Alive Home ai brand logo"
          width={100}
          height={100}
          priority
          className="object-cover w-[235px] h-[184px] text-[#C77D01] text-4xl text-center flex justify-center items-center"
        />
      </div>
      <div className="w-full">{/* <Testimonials /> */}</div>
    </div>
  );
}
