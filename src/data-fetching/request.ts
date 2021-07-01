export type RequestFunction = <T>(path:string, params?: Record<string, unknown>) => Promise<T>;
export type fetchFunction = typeof window.fetch;


export function urlParams(params?: Record<string, unknown>): string {
  if (!params) { return ''; }

  return Object.entries(params)
    .map((entry) => entry.join('='))
    .join('&');
}


export function createRequest(fetch: fetchFunction): RequestFunction {
  return async function request(path, params) {
    const result = await fetch('https://api.github.com' + path + '?' + urlParams(params));
    return result.json();
  }
}

export default createRequest(window.fetch);
