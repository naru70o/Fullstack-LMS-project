import * as z from "zod";

export const stepOneSchema = z.object({
  occupation: z.array(z.string()),
  specificSkills: z.array(z.string()),
  yearsOfExpertise: z.coerce.number().min(1).max(10),
  qualification: z.array(z.string()),
});

export const stepTwoSchema = z.object({
  termsandconditions: z.boolean(),
  equipment: z.boolean(),
  sampleContentUrl: z.string(),
});

export const instructorRegisterFormSchema = z.object({
  occupation: z.array(z.string()).optional(),
  specificSkills: z.array(z.string()).optional(),
  yearsOfExpertise: z.coerce.number().min(1).max(10).optional(),
  qualification: z.array(z.string()).optional(),
  termsAndConditions: z.boolean().optional(),
  equipment: z.boolean().optional(),
  sampleContentUrl: z.string().optional(),
});

export const registerInstrucor = z.object({
  ...stepOneSchema.shape,
  ...stepTwoSchema.shape,
});

export type InstructorData = z.infer<typeof registerInstrucor>;
export type InitialInstructorData = z.infer<
  typeof instructorRegisterFormSchema
>;

export function formatZodErrors(error: z.ZodError) {
  return error.issues.reduce((acc, err) => {
    const field = err.path.join(".");
    acc[field] = err.message;
    return acc;
  }, {} as Record<string, string>);
}
