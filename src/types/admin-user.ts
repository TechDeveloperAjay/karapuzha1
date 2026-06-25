export type AdminRole = "superadmin" | "admin" | "manager";

export interface IAdminUser {
  id: string;
  email: string;
  fullName: string;
  role: AdminRole;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
