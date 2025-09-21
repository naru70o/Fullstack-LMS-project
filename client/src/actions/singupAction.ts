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

    await fetch(`http://localhost:3000/sign-up/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return { status: "success", message: "user created successfully" };
  } catch (error) {
    return { status: "error", message: "something went wrong" };
  }
}
export default main;
