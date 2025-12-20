import { Button } from "@/components/components/ui/button";
import { Book } from "lucide-react";
// import { useState } from "react";
import { getCookies } from "@/components/lib/helpers";
import CourseCard from "./components/courseCard";
import Header from "./components/header";
import Status from "./components/status";
import { ICourse } from "@/components/util/interfaces";

export default async function page() {
  const cookieHeader = await getCookies();
  const response = await fetch(
    `http://localhost:3000/api/v1/course/yourcourses`,
    {
      headers: { cookie: cookieHeader },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }
  const { data } = await response.json();
  const courses: ICourse[] = data.courses;
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
