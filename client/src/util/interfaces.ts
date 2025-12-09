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

export interface IInstructor {
  id: string;
  name: string;
  email: string;
  image: string;
  secret: string;
  roles: Role[];
  bio: string | null;
  emailVerified: boolean;
  lastActive: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICourse {
  id: string;
  title: string;
  description: string;
  secureUrl: string;
  publicId: string;
  duration: number;
  level: string[];
  category: string[];
  instructorId: string;
  isPublished: boolean;
  numberOfLectures: number;
  totalOfHours: number;
  createdAt: string;
  updatedAt: string;
  instructor: IInstructor;
}
