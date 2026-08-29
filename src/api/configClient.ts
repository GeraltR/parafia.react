const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost/api";

export async function fetchSection<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Failed to load config section "${path}" (HTTP ${response.status})`);
  }
  const json = await response.json();
  return (Object.prototype.hasOwnProperty.call(json, "data") ? json.data : json) as T;
}
