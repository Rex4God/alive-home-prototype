"use client";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProfileCardProps {
  title: string;
  alt: string;
  imageUrl: string;
}
export default function ProfileCard({
  title,
  alt,
  imageUrl,
  ...props
}: ProfileCardProps) {
  return (
    <div {...props}>
      <motion.div
        whileHover={{
          scale: 1.1,
          boxShadow: "0px 0px 8px rgb(255, 255, 255)",
        }}
        animate={{ x: 0 }}
        transition={{ type: "spring", duration: 3 }}
      >
        <Image
          src={imageUrl as string}
          alt={alt}
          width={260}
          height={180}
          priority
          sizes="332px"
          quality={100}
          className="h-[180px] md:max-w-[300px] w-full md:h-[160px] lg:h-[180px] object-cover"
        />
      </motion.div>
      <div className="flex flex-col gap-1.5 pt-4">
        <p className="font-semibold text-base text-[#432818]">{title}</p>
      </div>
    </div>
  );
}
