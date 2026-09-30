import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBDT(amount: number): string {
  if (!amount || isNaN(amount)) return "৳ 0";
  
  if (amount >= 10000000) {
    const crore = amount / 10000000;
    return `৳ ${crore.toFixed(2)} Crore`;
  } else if (amount >= 100000) {
    const lakh = amount / 100000;
    return `৳ ${lakh.toFixed(2)} Lakh`;
  }
  
  return `৳ ${amount.toLocaleString("en-IN")}`;
}

export function formatBDTFull(amount: number): string {
  if (!amount || isNaN(amount)) return "৳ 0";
  return `৳ ${amount.toLocaleString("en-IN")}`;
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}
