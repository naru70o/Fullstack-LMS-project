"use server";
import { apiRoutes } from "@/components/lib/apiRoutes";
import { cookies } from "next/headers";
import { parseSetCookie } from "../util/parseSetCookie";
import { signinSchema, signupSchema } from "./zod";
import { formatZodErrors } from "../app/(home)/instructor/zodTypes";
import * as z from "zod";

// getting active user session
export async function getUserSession() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  let userSession;
  const userSessionResponse = await fetch(apiRoutes.user.getUserSession, {
    headers: { Cookie: cookieHeader },
    credentials: "include",
    next: {
      revalidate: 60,
    },
  });

  if (!userSessionResponse.ok) userSession = null;
  else {
    const userSessionData = await userSessionResponse.json();
    userSession = userSessionData.data.user;
    console.log("user session", userSession);
  }
  return userSession;
}

export async function signupAction(
  previousState: unknown,
  formData: FormData
): Promise<
  | {
      status: string;
      message: string | string[];
    }
  | Record<string, string>
> {
  try {
    const user = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password"),
      passwordConfirm: formData.get("passwordConfirm"),
    };

    const validatedUser = signupSchema.safeParse(user);

    if (!validatedUser.success) {
      if (validatedUser.error instanceof z.ZodError) {
        const formatedZoderrors = formatZodErrors(validatedUser.error);
        console.log(formatedZoderrors);
        return {
          status: "error",
          message: Object.entries(formatedZoderrors)[0],
        };
      } else {
        return { status: "error", message: "Something went wrong" };
      }
    }

    if (!user.name || !user.email || !user.password || !user.passwordConfirm) {
      return { status: "error", message: "all fields are required" };
    }

    const response = await fetch(apiRoutes.auth.signUpEmail, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedUser.data),
      credentials: "include",
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data);

      const setCookieHeader = response.headers.get("set-cookie");
      if (setCookieHeader) {
        const parsedCookie = parseSetCookie(setCookieHeader);
        (await cookies()).set(parsedCookie.name, parsedCookie.value, {
          ...parsedCookie.options,
        });
      }
      return { status: "success", message: "Signup successful" };
    } else {
      console.error("Signup failed:", data);
      return {
        status: "error",
        message: data.message || "An unknown error occurred.",
      };
    }
  } catch (error) {
    console.error("Signup failed:", error);
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function signinAction(
  previousState,
  formData: FormData
): Promise<{
  status: string;
  message: string | string[];
}> {
  try {
    const user = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validatedUser = signinSchema.safeParse(user);

    if (!validatedUser.success) {
      if (validatedUser.error instanceof z.ZodError) {
        const formatedZoderrors = formatZodErrors(validatedUser.error);
        return {
          status: "error",
          message: Object.entries(formatedZoderrors)[0],
        };
      } else {
        return { status: "error", message: "Something went wrong" };
      }
    }

    if (!user.email || !user.password) {
      return { status: "error", message: "all fields are required" };
    }

    const response = await fetch(apiRoutes.auth.signInEmail, {
      method: "POST",
      body: JSON.stringify(validatedUser.data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      // Used Next.js server-side header API to set cookie (e.g. next/headers)
      const parsedCookie = parseSetCookie(setCookieHeader);
      (await cookies()).set(parsedCookie.name, parsedCookie.value, {
        ...parsedCookie.options,
      });
    }
    if (response.ok) {
      return { status: "success", message: "Signin successful" };
    } else {
      console.error("Signin failed:", data);
      return {
        status: "error",
        message: data.message || "An unknown error occurred.",
      };
    }
  } catch (error) {
    return { status: "error", message: "something went wrong" };
  }
}
