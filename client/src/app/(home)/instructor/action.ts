"use server";

export async function addinstructor(formdata: FormData) {
  console.log(formdata.get("expertice"));
  console.log(formdata.get("expertise"));
}
