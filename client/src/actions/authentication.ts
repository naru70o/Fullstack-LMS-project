"use server";
import { apiRoutes } from "@/components/lib/apiRoutes";

export async function signupAction(
  previousState,
  formData: FormData
): Promise<{
  status: string;
  message: string;
}> {
  try {
    const user = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password"),
    };

    if (!user.name || !user.email || !user.password) {
      return { status: "error", message: "all fields are required" };
    }

    // if (user.password !== (formData.get("passwordConfirm") as string)) {
    //   return { status: "error", message: "passwords do not match" };
    // }

    const response = await fetch(apiRoutes.auth.signUpEmail, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) {
      console.log(data);
      return { status: "success", message: "user created successfully" };
    } else {
      console.error("Signup failed:", data);
      return {
        status: "error",
        message: data.message || "An unknown error occurred.",
      };
    }
  } catch (error) {
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
  message: string;
}> {
  try {
    const user = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const response = await fetch(apiRoutes.auth.signInEmail, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) {
      return { status: "success", message: "logged in successfully" };
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
