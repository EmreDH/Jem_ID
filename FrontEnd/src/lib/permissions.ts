// FrontEnd/src/lib/permissions.ts
import { getUserRole } from "./auth";

export type Role =
  | "admin"
  | "klant"
  | "aanvoerder"
  | "veilingmeester"
  | "user"
  | "guest";

export interface Permissions {
  [action: string]: Role[];
}

// Define what each role can do
export const permissions: Permissions = {
  // Viewing
  viewVeilingen: ["admin", "klant", "veilingmeester"],
  viewAankomendeProducten: ["admin", "veilingmeester"],
  viewProfile: ["admin", "klant", "veilingmeester", "aanvoerder"],

  // Admin
  viewDashboard: ["admin"],
  manageProducts: ["admin"],

  // Aanvoerder
  viewAanvoerderItem: ["admin", "aanvoerder"],

  // Veilingmeester
  viewVeilingmaster: ["admin", "veilingmeester"],

  // Actions (if you use these later)
  placeBid: ["admin", "klant"],
  startAuction: ["admin", "veilingmeester"],
};

export function hasPermission(action: keyof typeof permissions): boolean {
  const role = (getUserRole() || "guest").toLowerCase() as Role;

  const allowedRoles = permissions[action];
  return !!allowedRoles && allowedRoles.includes(role);
}
