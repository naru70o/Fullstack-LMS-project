"use server";

import z from "zod";
import { formatZodErrors, stepOneSchema } from "./zodTypes";

interface ObjType {
  label: string;
  value: string;
  category: string;
}

function formatSelectOptions(obj: any) {
  const deserialesed = JSON.parse(obj);
  const values = deserialesed.map((option: ObjType) => option.value);
  console.log(values);
  return values;
}

export async function registerInstructorOne(
  prev,
  formdata: FormData
): Promise<
  { success: boolean; message: string; route?: string } | Record<string, string>
> {
  try {
    formatSelectOptions(formdata.getAll("occupation"));
    const data = {
      occupation: formatSelectOptions(formdata.getAll("occupation")),
      specificSkills: formatSelectOptions(formdata.getAll("specificSkills")),
      yearsOfExpertise: (formdata.get("yearsOfExpertise") as string) || null,
      qualification: formatSelectOptions(formdata.getAll("qualification")),
    };

    console.log(data);
    stepOneSchema.parse(data);
    return {
      success: true,
      message: "Validation successful",
      route: "/instructor/step-two",
    };
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const formatedZoderrors = formatZodErrors(error);
      console.log(formatedZoderrors);
      return formatedZoderrors;
    } else {
      console.error(error);
      return { success: false, message: "Something went wrong" };
    }
  }
}

export async function registerInstructorTwo(
  prev,
  formdata: FormData
): Promise<
  { success: boolean; message: string; route?: string } | Record<string, string>
> {
  try {
    const data = {
      termsandconditions: formdata.get("termsAndConditions"),
    };

    console.log(data);
    return {
      success: true,
      message: "Validation successful",
      // route: "/instructor/step-two",
    };
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const formatedZoderrors = formatZodErrors(error);
      console.log(formatedZoderrors);
      return formatedZoderrors;
    } else {
      console.error(error);
      return { success: false, message: "Something went wrong" };
    }
  }
}
