import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type DateInput = string | number | Date | undefined;

export function toDatetimeLocal(date: DateInput): string {
  if (!date) return "";

  const d: Date = new Date(date as any);
  if (isNaN(d as any)) return "";

  const pad = (n: number | string): string => String(n).padStart(2, "0");

  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
