export interface Lecture {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  duration?: string;
  order?: number;
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
