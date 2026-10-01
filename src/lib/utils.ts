import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// The standard shadcn/Kokonut UI helper — merges conditional class names and
// resolves conflicting Tailwind utilities (e.g. "p-2 p-4" -> "p-4").
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
