export type Role = "admin" | "instructor" | "student";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  roles: Record<Role, string>;
}
