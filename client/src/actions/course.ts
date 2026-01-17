"use server";
import { apiRoutes } from "@/components/lib/apiRoutes";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function enrollCourseAction(courseId: string) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const response = await fetch(apiRoutes.courses.enrollCourse(courseId), {
      method: "POST",
      headers: {
        Cookie: cookieHeader,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data.ok);
    if (response.ok) {
      revalidatePath(`/courses/${courseId}`);
      return { status: "success", message: "Enrolled successfully" };
    } else {
      return {
        status: "error",
        message: data.message,
        statusCode: data.statusCode,
      };
    }
  } catch (error) {
    console.error("Enrollment error:", error);
    return {
      status: "error",
      message: "Failed to enroll",
    };
  }
}
