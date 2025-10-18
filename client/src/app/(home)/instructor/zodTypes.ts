import * as z from "zod";

export const stepOneSchema = z.object({
  occupation: z.array(z.string()),
  specificSkills: z.array(z.string()),
  yearsOfExpertise: z.coerce.number().min(1).max(10),
  qualification: z.array(z.string()),
});

export function formatZodErrors(error: z.ZodError) {
  return error.issues.reduce((acc, err) => {
    const field = err.path.join(".");
    acc[field] = err.message;
    return acc;
  }, {} as Record<string, string>);
}
