/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Creates a debounced function that delays invoking the provided function
 * until after `delay` milliseconds have elapsed since the last time it was invoked.
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Creates a debounced version of a value setter.
 * Useful for input fields where you want to delay processing.
 */
export function debounceValue<T>(
  setter: (value: T) => void,
  delay: number
): (value: T) => void {
  return debounce(setter, delay);
}
