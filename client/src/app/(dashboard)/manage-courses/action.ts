"use server";

import { categories, levels } from "@/components/lib/utils";
import z from "zod";
import { formatZodErrors } from "../../(home)/instructor/zodTypes";
import { apiRoutes } from "@/components/lib/apiRoutes";
import { cookies } from "next/headers";
import { getCookies } from "@/components/lib/helpers";

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

// create a module

const validateModuleData = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20).max(1000),
});

export async function createModule(prev: unknown, formdata: FormData) {
  try {
    const data = {
      title: formdata.get("title") as string,
      description: formdata.get("description") as string,
    };
    const courseId = formdata.get("courseId") as string;
    validateModuleData.parse(data);

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
    const newModuleData = await newModule.json();
    return { status: "success", data: newModuleData.data.module };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formatedZoderrors = formatZodErrors(error);
      return formatedZoderrors;
    } else {
      return { status: "error", message: "Something went wrong" };
    }
  }
}

export async function updateModule(prev: unknown, formdata: FormData) {
  try {
    const data = {
      title: formdata.get("title") as string,
      description: formdata.get("description") as string,
    };
    const moduleId = formdata.get("moduleId") as string;
    validateModuleData.parse(data);

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
    const updatedModuleData = await updatedModule.json();
    return {
      status: "success",
      data: updatedModuleData.data.module,
      message: "Module updated successfully",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formatedZoderrors = formatZodErrors(error);
      return formatedZoderrors;
    } else {
      return { status: "error", message: "Something went wrong" };
    }
  }
}

export async function deleteModule(prev: unknown, formdata: FormData) {
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
  } catch (error) {
    if (error) {
      // Log locally if needed, or simply ignore for now
    }
    return { status: "error", message: "Something went wrong" };
  }
}

// create a lecture

const validateLectureData = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20).max(1000),
  moduleId: z.string(),
});

export async function createLecture(prev: unknown, formdata: FormData) {
  try {
    const data = {
      title: formdata.get("title") as string,
      description: formdata.get("description") as string,
      moduleId: formdata.get("moduleId") as string,
    };
    validateLectureData.parse(data);

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
    const newLectureData = await newLecture.json();
    return {
      status: "success",
      data: newLectureData.data.lecture,
      message: "Lecture created successfully",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formatedZoderrors = formatZodErrors(error);
      return formatedZoderrors;
    } else {
      return { status: "error", message: "Something went wrong" };
    }
  }
}
