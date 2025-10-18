"use server";

import z from "zod";
import { formatZodErrors, stepOneSchema } from "./zodTypes";

export async function addinstructor(formdata: FormData) {
  try {
    const data = {
      occupation: formdata.getAll("occupation"),
      specificSkills: formdata.getAll("specificSkills"),
      yearsOfExpertise: formdata.get("yearsOfExpertise"),
      qualification: formdata.getAll("qualification"),
    };
    const validated = stepOneSchema.parse(data);
    console.log(validated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formatedZoderrors = formatZodErrors(error);
      console.log(formatedZoderrors);
      return formatedZoderrors;
    } else {
      return "Something went wrong";
    }
  }
}
