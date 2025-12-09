import { Button } from "@/components/components/ui/button";
import { getCookies } from "@/components/lib/helpers";
import { ChevronLeft, Edit, Zap } from "lucide-react";
import Link from "next/link";
import CourseContent from "../components/course-content";
import Image from "next/image";

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
  const modules = course.modules;
  console.log("for testing", course);

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
        <div className="flex items-center gap-4 relative group">
          <Link
            className="absolute top-0 left-0 z-10 transform translate-x-[-50%] translate-y-[50%]"
            href="/manage-courses"
          >
            <Button
              className="group-hover:cursor-pointer"
              variant="outline"
              size="icon"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>

          {/* Course Header Content */}
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-stretch">
            {/* Course Thumbnail */}
            <div className="flex-shrink-0">
              <div className="relative h-48 w-full overflow-hidden rounded-lg border border-border md:h-40 md:w-64">
                <Image
                  src={course.secureUrl || "/assets/Thumbnail.jpg"}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Course Title and Description */}
            <div className="flex flex-1 flex-col justify-between min-h-full max-w-3xl">
              <div>
                <h1 className="text-4xl font-bold text-foreground">
                  {course.title}
                </h1>
                {course.description && (
                  <p className="mt-2 line-clamp-2 text-muted-foreground">
                    {course.description}
                  </p>
                )}
              </div>

              {/* Action Buttons - This will be pushed to the bottom */}
              <div className="mt-6">
                <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                  <Button
                    variant="outline"
                    className="gap-2 bg-transparent"
                    // onClick={onEdit}
                  >
                    <Edit className="h-4 w-4" />
                    Edit Course
                  </Button>
                  <Button
                    className="gap-2 bg-blue-600 hover:bg-blue-700 group-hover:cursor-pointer"
                    // onClick={onPublish}
                  >
                    <Zap className="h-4 w-4" />
                    Publish
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CourseContent modules={modules} courseId={courseId} />
    </main>
  );
}
