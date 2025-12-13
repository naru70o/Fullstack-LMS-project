"use server";

import { categories, levels } from "@/components/lib/utils";
import z from "zod";
import { formatZodErrors } from "../../(home)/instructor/zodTypes";
import { apiRoutes } from "@/components/lib/apiRoutes";
import { cookies } from "next/headers";
import { getCookies } from "@/components/lib/helpers";
import { revalidatePath } from "next/cache";

type ServerActionResponse =
  | {
      status: string;
      message?: string | string[];
    }
  | Record<string, string>;

/*
i wanna come back to the caching mechanism so first i need to 
put the project on a server(production)
--- now i can't do anytesing cause the cache system in next js do not work in development mode
*/

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

export async function createCourse(
  prev: unknown,
  formdata: FormData
): Promise<ServerActionResponse> {
  try {
    const data: CreateCourseData = {
      title: formdata.get("title") as string,
      description: formdata.get("description") as string,
      category: formdata.get("category") as string,
      level: formdata.get("level") as string,
    };
    const validatedCourse = validateCourseData.safeParse(data);
    if (!validatedCourse.success) {
      if (validatedCourse.error instanceof z.ZodError) {
        const formatedZoderrors = formatZodErrors(validatedCourse.error);
        return {
          status: "error",
          message: Object.entries(formatedZoderrors)[0],
        };
      } else {
        return { status: "error", message: "Something went wrong" };
      }
    }

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
    return { status: "success", message: "Course created successfully" };
  } catch {
    return { status: "error", message: "Something went wrong" };
  }
}

export async function updateCourse(
  prev: unknown,
  formdata: FormData
): Promise<ServerActionResponse> {
  try {
    const data: CreateCourseData = {
      title: formdata.get("title") as string,
      description: formdata.get("description") as string,
      category: formdata.get("category") as string,
      level: formdata.get("level") as string,
    };
    const courseId = formdata.get("courseId") as string;
    const validatedCourse = validateCourseData.safeParse(data);
    if (!validatedCourse.success) {
      if (validatedCourse.error instanceof z.ZodError) {
        const formatedZoderrors = formatZodErrors(validatedCourse.error);
        return {
          status: "error",
          message: Object.entries(formatedZoderrors)[0],
        };
      } else {
        return { status: "error", message: "Something went wrong" };
      }
    }

    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    // Build a multipart/form-data body
    const bodyForm = new FormData();
    bodyForm.append("title", data.title);
    bodyForm.append("description", data.description);
    bodyForm.append("category", data.category);
    bodyForm.append("level", data.level);

    const thumbnail = formdata.get("thumbnail");
    if (thumbnail && thumbnail instanceof File && thumbnail.size > 0) {
      bodyForm.append("thumbnail", thumbnail);
    }

    const updatedCourse = await fetch(
      apiRoutes.courses.updateCourse(courseId),
      {
        method: "PATCH",
        headers: { Cookie: cookieHeader },
        body: bodyForm,
        credentials: "include",
      }
    );

    if (!updatedCourse.ok) {
      return { status: "error", message: "Failed to update course" };
    }
    revalidatePath("/manage-courses");
    return { status: "success", message: "Course updated successfully" };
  } catch {
    return { status: "error", message: "Something went wrong" };
  }
}

// create a module

const validateModuleData = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20).max(1000),
});

export async function createModule(
  prev: unknown,
  formdata: FormData
): Promise<ServerActionResponse> {
  try {
    const data = {
      title: formdata.get("title") as string,
      description: formdata.get("description") as string,
    };
    const courseId = formdata.get("courseId") as string;
    const validatedModule = validateModuleData.safeParse(data);
    if (!validatedModule.success) {
      if (validatedModule.error instanceof z.ZodError) {
        const formatedZoderrors = formatZodErrors(validatedModule.error);
        return {
          status: "error",
          message: Object.entries(formatedZoderrors)[0],
        };
      } else {
        return { status: "error", message: "Something went wrong" };
      }
    }

    const cookieHeader = await getCookies();
    const newModule = await fetch(
      `${apiRoutes.module.createModule}/${courseId}`,
      {
        method: "POST",
        headers: { Cookie: cookieHeader, "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      }
    );
    if (!newModule.ok) {
      return { status: "error", message: "Failed to create module" };
    }

    return { status: "success", message: "Module created successfully" };
  } catch {
    return { status: "error", message: "Something went wrong" };
  }
}

export async function updateModule(
  prev: unknown,
  formdata: FormData
): Promise<ServerActionResponse> {
  try {
    const data = {
      title: formdata.get("title") as string,
      description: formdata.get("description") as string,
    };
    const moduleId = formdata.get("moduleId") as string;
    const validatedModule = validateModuleData.safeParse(data);
    if (!validatedModule.success) {
      if (validatedModule.error instanceof z.ZodError) {
        const formatedZoderrors = formatZodErrors(validatedModule.error);
        return {
          status: "error",
          message: Object.entries(formatedZoderrors)[0],
        };
      } else {
        return { status: "error", message: "Something went wrong" };
      }
    }

    const cookieHeader = await getCookies();
    const updatedModule = await fetch(
      `${apiRoutes.module.updateModule}/${moduleId}`,
      {
        method: "PATCH",
        headers: { Cookie: cookieHeader, "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      }
    );

    if (!updatedModule.ok) {
      return { status: "error", message: "Failed to update module" };
    }
    return {
      status: "success",
      message: "Module updated successfully",
    };
  } catch {
    return { status: "error", message: "Something went wrong" };
  }
}

export async function deleteModule(
  prev: unknown,
  formdata: FormData
): Promise<ServerActionResponse> {
  try {
    const moduleId = formdata.get("moduleId") as string;
    const cookieHeader = await getCookies();
    const deletedModule = await fetch(
      `${apiRoutes.module.deleteModule}/${moduleId}`,
      {
        method: "DELETE",
        headers: { Cookie: cookieHeader },
        credentials: "include",
      }
    );

    if (!deletedModule.ok) {
      return { status: "error", message: "Failed to delete module" };
    }
    return {
      status: "success",
      message: "Module deleted successfully",
    };
  } catch {
    return { status: "error", message: "Something went wrong" };
  }
}

export async function deleteCourse(
  prev: unknown,
  formdata: FormData
): Promise<ServerActionResponse> {
  try {
    const courseId = formdata.get("courseId") as string;
    const cookieHeader = await getCookies();
    const deletedCourse = await fetch(
      `${apiRoutes.courses.deleteCourse}/${courseId}`,
      {
        method: "DELETE",
        headers: { Cookie: cookieHeader },
        credentials: "include",
      }
    );

    if (!deletedCourse.ok) {
      return { status: "error", message: "Failed to delete course" };
    }
    revalidatePath("/manage-courses");
    return {
      status: "success",
      message: "Course deleted successfully",
    };
  } catch {
    return { status: "error", message: "Something went wrong" };
  }
}

// create a lecture

const validateLectureData = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20).max(1000),
  moduleId: z.string(),
});

export async function createLecture(
  prev: unknown,
  formdata: FormData
): Promise<ServerActionResponse> {
  try {
    const data = {
      title: formdata.get("title") as string,
      description: formdata.get("description") as string,
      moduleId: formdata.get("moduleId") as string,
    };
    const validatedLecture = validateLectureData.safeParse(data);
    if (!validatedLecture.success) {
      if (validatedLecture.error instanceof z.ZodError) {
        const formatedZoderrors = formatZodErrors(validatedLecture.error);
        return {
          status: "error",
          message: Object.entries(formatedZoderrors)[0],
        };
      } else {
        return { status: "error", message: "Something went wrong" };
      }
    }

    const cookieHeader = await getCookies();
    const bodyForm = new FormData();
    bodyForm.append("title", data.title);
    bodyForm.append("description", data.description);

    const lectureVideo = formdata.get("lecture");
    if (lectureVideo) {
      bodyForm.append("lecture", lectureVideo as File);
    }

    // Note: The API route is defined as /newlecture/:moduleId
    // We need to verify if we should use FormData or JSON.
    // The backend `createNewLecture` uses `upload.single('lecture')` and `req.body` for fields.
    // So we must use FormData for the fetch body to support file upload.
    // The `moduleId` is a URL parameter in the backend route.

    const newLecture = await fetch(
      `${apiRoutes.lectures.createLecture}/${data.moduleId}`,
      {
        method: "POST",
        headers: { Cookie: cookieHeader }, // Do NOT set Content-Type for FormData, browser/fetch sets it with boundary
        body: bodyForm,
        credentials: "include",
      }
    );

    if (!newLecture.ok) {
      // Try to parse error message if available
      let errorMessage = "Failed to create lecture";
      try {
        const errorData = await newLecture.json();
        if (errorData.message) errorMessage = errorData.message;
      } catch {
        // ignore JSON parse error
      }
      return { status: "error", message: errorMessage };
    }
    return {
      status: "success",
      message: "Lecture created successfully",
    };
  } catch {
    return { status: "error", message: "Something went wrong" };
  }
}
