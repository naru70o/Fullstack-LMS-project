import { Button } from "@/components/components/ui/button";
import { getCookies } from "@/components/lib/helpers";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import CourseContent from "../components/course-content";

export default async function page({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const cookieHeader = await getCookies();
  const response = await fetch(
    `http://localhost:3000/api/v1/course/yourcourse/${courseId}`,
    {
      headers: { cookie: cookieHeader },
    }
  );
  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to fetch course");
  }
  const { data } = await response.json();
  const course = data.course;
  const modules = data.modules;
  console.log("for testing", course, modules);
  if (!course) {
    return (
      <main className="min-h-screen bg-background p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Course not found
          </h1>
          <Link href="/manage-courses">
            <Button className="mt-4">Back to Courses</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card p-6">
        <div className="flex items-center gap-4">
          <Link href="/manage-courses">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {course.title}
            </h1>
            <p className="mt-1 text-muted-foreground">
              Manage modules and lectures
            </p>
          </div>
        </div>
      </div>
      <CourseContent modules={modules} />
    </main>
  );
}
