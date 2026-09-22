import generateOgImage from "@/components/opengraph-image/og-generator";

// Image metadata
export const alt = "About alive";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return generateOgImage("home", {
    title: "Alive Home",
    description: "Alive Home AI - AI-driven real estate technology platform",
  });
}
