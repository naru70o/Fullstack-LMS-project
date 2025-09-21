"use server";

async function main(
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

    const response = await fetch(`http://localhost:3000/sign-up/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
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
export default main;
