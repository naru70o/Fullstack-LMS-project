"use server";

export async function addinstructor(formdata: FormData) {
  console.log(formdata.get("occupation"));
  console.log(formdata.get("expertise"));
}
