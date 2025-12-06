"use server";

import { categories, levels } from "@/components/lib/utils";
import z from "zod";
import { formatZodErrors } from "../../(home)/instructor/zodTypes";
import { apiRoutes } from "@/components/lib/apiRoutes";
import { cookies } from "next/headers";

interface CreateCourseData {
  title: string;
  description: string;
  category: string;
  level: string;
}

const validateCourseData = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20).max(1000),
  category: z.enum(categories),
  level: z.enum(levels),
});

export async function createCourse(prev: unknown, formdata: FormData) {
  try {
    const data: CreateCourseData = {
      title: formdata.get("title") as string,
      description: formdata.get("description") as string,
      category: formdata.get("category") as string,
      level: formdata.get("level") as string,
    };
    validateCourseData.parse(data);

    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    // Build a multipart/form-data body so we can include the thumbnail file
    const bodyForm = new FormData();
    bodyForm.append("title", data.title);
    bodyForm.append("description", data.description);
    bodyForm.append("category", data.category);
    bodyForm.append("level", data.level);

    const thumbnail = formdata.get("thumbnail");
    if (thumbnail) {
      bodyForm.append("thumbnail", thumbnail as File);
    }

    const newCourse = await fetch(apiRoutes.courses.createCourse, {
      method: "POST",
      headers: { Cookie: cookieHeader },
      body: bodyForm,
      credentials: "include",
    });
    if (!newCourse.ok) {
      return { status: "error", message: "Failed to create course" };
    }
    const newCourseData = await newCourse.json();
    return { status: "success", data: newCourseData.data.course };
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      const formatedZoderrors = formatZodErrors(err);
      return formatedZoderrors;
    } else {
      return { status: "error", message: "Something went wrong" };
    }
  }
}
