"use client";

import { Button } from "@/components/components/ui/button";
import { Book } from "lucide-react";
import { useState } from "react";
import CourseCard from "./components/courseCard";
import Header from "./components/header";
import Status from "./components/status";

// Sample course data
const SAMPLE_COURSES = [
  {
    id: 1,
    title: "Introduction to React",
    description:
      "Learn the fundamentals of React and start building modern web applications.",
    students: 240,
    lessons: 24,
    duration: "8 weeks",
    image: "/react-programming-course.png",
  },
  {
    id: 2,
    title: "Advanced TypeScript",
    description:
      "Master TypeScript advanced concepts and best practices for enterprise applications.",
    students: 156,
    lessons: 18,
    duration: "6 weeks",
    image: "/typescript-advanced-concepts.jpg",
  },
  {
    id: 3,
    title: "Web Design Masterclass",
    description:
      "Create stunning user interfaces with modern design principles and tools.",
    students: 389,
    lessons: 32,
    duration: "10 weeks",
    image: "/web-design-ui-ux.jpg",
  },
  {
    id: 4,
    title: "Node.js Backend Development",
    description:
      "Build scalable backend services with Node.js and Express frameworks.",
    students: 198,
    lessons: 20,
    duration: "7 weeks",
    image: "/nodejs-backend-development.jpg",
  },
  {
    id: 5,
    title: "Mobile App Development",
    description:
      "Develop cross-platform mobile applications using React Native.",
    students: 167,
    lessons: 28,
    duration: "9 weeks",
    image: "/mobile-app-development-react-native.jpg",
  },
  {
    id: 6,
    title: "Database Design & SQL",
    description:
      "Learn database design patterns and write efficient SQL queries.",
    students: 234,
    lessons: 22,
    duration: "8 weeks",
    image: "/database-sql-design.jpg",
  },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState(SAMPLE_COURSES);

  return (
    <main className="min-h-screen w-full bg-background">
      {/* Header Section */}
      <Header />

      {/* Stats Section */}
      <Status courses={courses} />

      {/* Courses Grid */}
      <div className="p-6 max-w-7xl mx-auto">
        {courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-12">
            <Book className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">
              No courses yet
            </h3>
            <p className="mt-2 text-muted-foreground">
              Create your first course to get started
            </p>
            <Button
              // onClick={() => setIsCreateDialogOpen(true)}
              className="mt-4"
            >
              Create First Course
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
