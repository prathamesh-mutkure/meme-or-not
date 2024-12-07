import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import CONTRACT from "@/contractData/MemeOrNot.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const DEPLOYED_CONTRACT = '0xD8bb83032b51dAE6C08aA27dcBb9FFddA4264e2c';

export const ABI = CONTRACT.abi;
