/**
 * Return a debounced version of an asynchronous function
 * 
 * A debounced function is a function that only gets executed after a certain time
 * it is used to prevent a function from being executed too frequently
 *
 * @param fn - Function to apply debounce
 * @param wait - Wait time in milliseconds
 *
 * @example
 *  async function fetchData(query: string) {
 *    console.log(`Fetching data for query: ${query}`);
 *  }
 *
 *  const debouncedFetchData = debounce(fetchData, 1000);
 *
 *  debouncedFetchData("hello");
 *  debouncedFetchData("hello, wor");
 *  debouncedFetchData("hello, world");
 *
 *  // Only the last log will be printed
 */

export function debounce(fn: (...args: any[]) => Promise<void>, wait: number) {
  let timeout: NodeJS.Timeout | null = null;

  return async function (...args: any[]) {
    const later = () => {
      timeout = null;
      fn(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);
  };
}