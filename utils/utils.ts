import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// FUNCTION TO FORMAT DATE
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  return date.toLocaleDateString("en-US", options);
};

// Short Date Format
export const formatDateShort = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short", // 'Feb' instead of 'February'
    day: "numeric", // '5' instead of '05'
  };
  return date.toLocaleDateString("en-US", options);
};

// FUNCTION TO FORMAT DATE AND TIME
export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Africa/Lagos",
  };
  const formattedDate = new Intl.DateTimeFormat("en-NG", options).format(date);
  return formattedDate.replace(",", "").replace(" ", " at ");
}

// Price Formatting
export const formatPrice = (price: number) => {
  // For whole numbers (like in your example)
  if (price % 1 === 0) {
    return `₦${price.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  }
  // For decimal numbers
  return `₦${price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// FUNCTION TO GENERATE SLUG
export function generateSlug(title: string) {
  const slug = title
    .toLowerCase() // Convert the title to lowercase
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/[^\w\-]+/g, "") // Remove non-word characters except dashes
    .replace(/\-\-+/g, "-") // Replace multiple consecutive dashes with a single dash
    .replace(/^\-+/, "") // Remove dashes from the beginning
    .replace(/\-+$/, ""); // Remove dashes from the end
  return slug;
}

// FUNCTION TO Shortening word
export function getShortTitle(title: string) {
  const splitBy = title.split(/[:–.]/); // Split by colon, dash, or period
  if (splitBy.length > 1) {
    return splitBy[0];
  }
  const words = title.trim().split(" ");
  return words.slice(0, 5).join(" "); // Fallback: first 5 words
}

// Truncating of a String
export const truncateString = (str: string, num: number) => {
  if (str?.length <= num) {
    return str;
  }
  return str?.slice(0, num) + "...";
};
