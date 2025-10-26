"use server";

import z from "zod";
import { formatZodErrors, stepOneSchema, stepTwoSchema } from "./zodTypes";

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

function stingToBoolean(str: FormDataEntryValue | null) {
  return str === "true";
}

export async function registerInstructorOne(
  prev: unknown,
  formdata: FormData
): Promise<
  { success: boolean; message: string; route?: string } | Record<string, string>
> {
  try {
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
  prev: unknown,
  formdata: FormData
): Promise<
  { success: boolean; message: string; route?: string } | Record<string, string>
> {
  try {
    const data = {
      termsandconditions: stingToBoolean(formdata.get("termsAndConditions")),
      equipment: stingToBoolean(formdata.get("equipment")),
      sampleContentUrl: formdata.get("sampleContentUrl"),
    };
    console.log("the data from the formdata", data);

    stepTwoSchema.parse(data);
    return {
      success: true,
      message: "Validation successful",
      route: "/instructor/review",
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
