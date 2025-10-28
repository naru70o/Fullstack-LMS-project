"use client";

import { Badge } from "@/components/components/ui/badge";
import { Button } from "@/components/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/components/ui/card";
import { useRegisterInstructorContext } from "../_components/registerInstructorContext";
import { submitForm } from "./action";
import { InstructorData } from "../zodTypes";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ReviewPage() {
  const { registerFormData, resetLocalStorage } =
    useRegisterInstructorContext();
  const navigate = useRouter();

  const handleSubmit = async () => {
    console.log("Form submitted");
    // Handle final submission
    //1 submit the data
    const { success, message, redirect } = await submitForm(
      registerFormData as InstructorData
    );
    console.log(success);
    if (success === false && message && redirect) {
      toast.error(message);
      return navigate.push(redirect);
    }

    if (redirect) {
      // 2 navigate to the dashboard
      navigate.push(redirect);
    }

    //3 display toaster
    toast.success("Form submitted successfully!");

    //4 reset the local storage
    return resetLocalStorage();
  };

  const handleBack = () => {
    // Navigate back to previous step
    console.log("Going back");
  };

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-balance">
            Review Your Information
          </h1>
          <p className="mt-2 text-muted-foreground text-pretty">
            Please review all the details before submitting your application
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Instructor Application Summary</CardTitle>
            <CardDescription>
              Make sure all information is accurate and complete
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Occupation Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Occupation
              </h3>
              <div className="flex flex-wrap gap-2">
                {registerFormData?.occupation?.map((occ, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {occ}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="border-t" />

            {/* Specific Skills Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Specific Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {registerFormData?.specificSkills?.map((skill, index) => (
                  <Badge key={index} variant="outline" className="px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="border-t" />

            {/* Years of Expertise Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Years of Expertise
              </h3>
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-primary/10 px-4 py-2">
                  <span className="text-2xl font-bold text-primary">
                    {registerFormData.yearsOfExpertise}
                  </span>
                  <span className="ml-2 text-sm text-muted-foreground">
                    {registerFormData.yearsOfExpertise === 1 ? "year" : "years"}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t" />

            {/* Qualifications Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Qualifications
              </h3>
              <ul className="space-y-2">
                {registerFormData?.qualification?.map((qual, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-0.5 text-primary">✓</span>
                    <span className="text-sm">{qual}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t" />

            {/* Sample Content URL Section */}
            {registerFormData.sampleContentUrl && (
              <>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Sample Content
                  </h3>
                  <a
                    href={registerFormData.sampleContentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                  >
                    View Sample Content →
                  </a>
                </div>
                <div className="border-t" />
              </>
            )}

            {/* Confirmations Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Confirmations
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg border p-4">
                  <span
                    className={
                      registerFormData.termsAndConditions
                        ? "text-green-600"
                        : "text-destructive"
                    }
                  >
                    {registerFormData.termsAndConditions ? "✓" : "✗"}
                  </span>
                  <div>
                    <p className="text-sm font-medium">Terms and Conditions</p>
                    <p className="text-xs text-muted-foreground">
                      {registerFormData.termsAndConditions
                        ? "Accepted"
                        : "Not accepted"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg border p-4">
                  <span
                    className={
                      registerFormData.equipment
                        ? "text-green-600"
                        : "text-destructive"
                    }
                  >
                    {registerFormData.equipment ? "✓" : "✗"}
                  </span>
                  <div>
                    <p className="text-sm font-medium">
                      Equipment Availability
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {registerFormData.equipment
                        ? "Has necessary equipment"
                        : "Does not have necessary equipment"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            className="gap-2 bg-transparent cursor-pointer"
          >
            ← Back to Edit
          </Button>
          <Button
            onClick={handleSubmit}
            size="sm"
            type="submit"
            className="gap-2 cursor-pointer"
          >
            Submit Application →
          </Button>
        </div>
      </div>
    </div>
  );
}
