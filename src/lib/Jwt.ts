// src/lib/jwt.ts
export function getToken(): string | null {
  return localStorage.getItem("token");
}

type JwtPayload = Record<string, any>;

export function parseJwt(token: string): JwtPayload | null {
  try {
    const base64 = token.split(".")[1];
    const json = atob(base64.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

const ROLE_KEYS = [
  "role",
  "roles",
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role"
];

export function getRole(): string | null {
  const t = getToken();
  if (!t) return null;
  const p = parseJwt(t);
  if (!p) return null;

  for (const key of ROLE_KEYS) {
    const v = p[key];
    if (!v) continue;
    const val = Array.isArray(v) ? v[0] : v;
    return String(val).toLowerCase();
  }
  return null;
}
