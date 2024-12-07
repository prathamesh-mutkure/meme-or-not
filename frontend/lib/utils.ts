import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import CONTRACT from "@/contractData/MemeOrNot.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const DEPLOYED_CONTRACT = '0x2181EF3804370624Ac9658BE9042EC0Ade4E159C';

export const ABI = CONTRACT.abi;
