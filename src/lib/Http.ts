import { API_URL } from "./Config";
import { getToken } from "./Jwt";

export async function getJsonAuth<T>(path: string): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_URL.replace(/\/+$/, "")}${path}`, {
    headers: { Authorization: `Bearer ${token ?? ""}` },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export async function postJson<TReq, TRes>(
  path: string,
  body: TReq
): Promise<TRes> {
  const res = await fetch(`${API_URL.replace(/\/+$/, "")}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    try {
      const json = text ? JSON.parse(text) : null;
      throw new Error(json?.message || text || `HTTP ${res.status}`);
    } catch {
      throw new Error(text || `HTTP ${res.status}`);
    }
  }

  try {
    return (await res.json()) as TRes;
  } catch {
    return {} as TRes;
  }
}
