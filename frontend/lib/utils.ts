import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import CONTRACT from "@/contractData/MemeOrNot.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const DEPLOYED_CONTRACT = '0x63E0B21F8950a4F63A9b7da037c77A04C8ceE76f';

export const ABI = CONTRACT.abi;
