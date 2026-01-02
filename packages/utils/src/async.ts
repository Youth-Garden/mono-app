export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function withTimeout<T>(
  promise: Promise<T>,
  ms?: number,
  errorMessage?: string
): Promise<T> {
  if (!ms) return promise;

  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(
        () => reject(new Error(errorMessage ?? `Timeout after ${ms}ms`)),
        ms
      )
    ),
  ]);
}
