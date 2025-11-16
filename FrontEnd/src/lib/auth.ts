import { jwtDecode } from "jwt-decode";


interface TokenPayload {
  role?: string;
  exp?: number;
  [key: string]: any;
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function getUserRole(): string | null {
  const token = getToken();
  if (!token) return null;
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    // Check both standard and Microsoft-style claim
    return (
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]?.toLowerCase() ||
      decoded.role?.toLowerCase() ||
      null
    );
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

export function logout(): void {
  localStorage.removeItem("token");
  window.location.href = "/login";
}
