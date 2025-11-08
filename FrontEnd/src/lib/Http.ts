import { API_URL } from "./Config";
import { getToken } from "./Jwt";

export async function getJsonAuth<T>(path: string): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_URL.replace(/\/+$/, "")}${path}`, {
    headers: { Authorization: `Bearer ${token ?? ""}` }
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}
