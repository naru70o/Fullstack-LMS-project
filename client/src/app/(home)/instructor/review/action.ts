"use server";

import { apiRoutes } from "@/components/lib/apiRoutes";
import { AddStepRoutes } from "../types";
import { InstructorData, stepOneSchema, stepTwoSchema } from "../zodTypes";
import { getCookies } from "@/components/lib/helpers";

export async function submitForm(
  instructorData: InstructorData
): Promise<{ success?: boolean; message?: string; redirect?: string }> {
  try {
    const stepOneValidated = stepOneSchema.safeParse(instructorData);
    console.log(stepOneValidated);
    if (!stepOneValidated.success) {
      console.log("--------", stepOneValidated.error);
      return {
        success: false,
        redirect: AddStepRoutes.EXPERTISE_BACKGROUND,
        message: "Please validate expertise background.",
      };
    }

    const stepTwoValidated = stepTwoSchema.safeParse(instructorData);
    if (!stepTwoValidated.success) {
      return {
        success: false,
        redirect: AddStepRoutes.CONTENT_PRODUCTION,
        message: "Please validate content production.",
      };
    }

    const cookies = await getCookies();

    const response = await fetch(apiRoutes.instructor.registerInstructor, {
      method: "POST",
      headers: {
        Cookie: cookies,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(instructorData),
    });

    const data = await response.json();
    if (!response.ok) {
      return { success: false, message: data.message, redirect: "/dashboard" };
    }

    const retVal = {
      success: true,
      redirect: "/dashboard",
      message: "you are officialy an instructor",
    };
    return retVal;
  } catch (error) {
    return { success: false, message: "Something went wrong..." };
  }
}
