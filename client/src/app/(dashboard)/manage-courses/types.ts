export interface Lecture {
  id: string;
  title: string;
  description: string;
  duration: number;
  moduleId: string;
  instructorId?: string;
  isPreview: boolean;
  order: number;
  publicId?: string;
  secureUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  optional?: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
  lectures: Lecture[];
}
