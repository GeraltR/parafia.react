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

export class ApiError extends Error {
  readonly status: number;
  readonly errors?: Record<string, string[]>;

  constructor(message: string, status: number, errors?: Record<string, string[]>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

export async function postJson<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(
      (json && json.message) || `Request to "${path}" failed (HTTP ${response.status})`,
      response.status,
      json?.errors
    );
  }

  return (json && Object.prototype.hasOwnProperty.call(json, "data") ? json.data : json) as T;
}
