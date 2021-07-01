export type RequestFunction = <T>(path:string, params?: Record<string, unknown>) => Promise<T>;
export type fetchFunction = typeof window.fetch;


/**
 * Takes an object of key/value pairs and transforms it into a usable query string
 * 
 * @example
 * ```ts
 * urlParams({ a:2, b:'test' }) // => "a=2&b=test"
 * ```
 * 
 * @param params - The object to transform
 */
export function urlParams(params?: Record<string, unknown>): string {
  if (!params) { return ''; }

  return Object.entries(params)
    .map((entry) => entry.join('='))
    .join('&');
}

/**
 * A `request` factory. Mainly here to help with testing so we don't have to mock the HTTP calls,
 * but only the function that is tasked with fetching the data.
 * 
 * @param fetch - The function used to fetch the data
 */
export function createRequest(fetch: fetchFunction): RequestFunction {
  return async function request(path, params) {
    const result = await fetch('https://api.github.com' + path + '?' + urlParams(params));
    return result.json();
  }
}

export default createRequest(window.fetch);
