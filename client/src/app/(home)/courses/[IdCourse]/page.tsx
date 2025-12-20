import { Banner } from "@/components/components/banner";
import { NavigationFixed } from "@/components/components/navigation";
import { TabMenu } from "@/components/components/tab-menu";
import Example from "@/components/components/vedioPlayer";
import { Course, Lecture } from "../_components/feed";
import Block from "../_components/purchaseCard";
import InstructorProfile from "../_components/instructorProfile";
import { cookies } from "next/headers";
import { apiRoutes } from "@/components/lib/apiRoutes";
import { ICourse, Module } from "@/components/util/interfaces";

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ IdCourse: string }>;
  searchParams: Promise<{ vedio: string }>;
}) => {
  const { IdCourse } = await params;
  const { vedio } = await searchParams;

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const response = await fetch(apiRoutes.courses.getCourseById(IdCourse), {
    headers: { Cookie: cookieHeader },
    credentials: "include",
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) return;
  const { data } = await response.json();
  const course: ICourse = data;
  console.log(course);

  const previewLecture =
    course?.modules ||
    []
      .flatMap((m: Module) => m.lectures) // merge all lectures into one array
      .find((l) => l.isPreview === true);

  const videoUrl = previewLecture
    ? (previewLecture as Lecture)?.url?.videoUrl
    : undefined;

  return (
    <>
      <Banner />
      <NavigationFixed />
      <section className="container mx-auto py-[60px]">
        {/* container */}
        <div className="grid grid-cols-3 gap-4 justify-between content-start items-center relative px-4 py-2">
          {/* course */}
          <div className="grid-cols-1 col-span-2 flex flex-col justify-start">
            {/* course Video */}
            <Example video={vedio || videoUrl} />
            {/* course title */}
            <h1 className="text-lg font-bold text-popover-foreground leading-7">
              {course?.title}
            </h1>
            {/* course description */}
            <p className="text-sm text-popover-foreground/60 mt-2">
              {course?.description}
            </p>
            {/* reviews and course modules */}
            <TabMenu data={course} />
            {/* Instructor info */}
            <InstructorProfile />
            {/* <Reviews/> */}
          </div>
          {/* Block for puying the course */}
          <Block course={course} />
        </div>
      </section>
    </>
  );
};

export default Page;
