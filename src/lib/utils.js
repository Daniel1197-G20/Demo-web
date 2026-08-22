import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind classes cleanly with conflict resolution
 * @param {...any} inputs - Class values
 * @returns {string} Combined classes
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
