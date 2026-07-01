const SIMULATED_LATENCY_MS = 250;

export async function fetchSection<T>(name: string): Promise<T> {
  const response = await fetch(`/mock/${name}.json`);
  if (!response.ok) {
    throw new Error(`Failed to load config section "${name}" (HTTP ${response.status})`);
  }
  const data = (await response.json()) as T;
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS));
  return data;
}
