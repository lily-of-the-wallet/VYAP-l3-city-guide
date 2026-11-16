export const SERVER_URL = "http://localhost:3000";

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${SERVER_URL}/api${path}`, init);
  } catch {
    throw new Error("Сервер недоступен. Проверьте, что он запущен.");
  }

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.error ?? `Ошибка сервера: ${response.status}`);
  }
  return data as T;
}

export function postJson<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export function imageUrl(path: string) {
  return `${SERVER_URL}${path}`;
}
