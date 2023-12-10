/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export const baseUrl = 'https://trash-97-me.vercel.app'

export function withBaseUrl(path: string): string {
  return new URL(path, baseUrl).toString()
}
