// FrontEnd/src/lib/permissions.ts
import { getUserRole } from "./auth";

export type Role = "admin" | "klant" | "guest";

export interface Permissions {
  [action: string]: Role[];
}

// Step 1 – Define what each role can do
export const permissions: Permissions = {
  viewDashboard: ["admin"],
  manageProducts: ["admin"],
  viewVeilingen: ["admin", "klant"],
  placeBid: ["klant"],
  viewProfile: ["admin", "klant"],
  contactSupport: ["klant", "admin"],
};

// Step 2 – Add permission helper
export function hasPermission(action: string): boolean {
  const role = getUserRole();
  if (!role) return false;

  const allowedRoles = permissions[action];
  return allowedRoles ? allowedRoles.includes(role as Role) : false;
}
