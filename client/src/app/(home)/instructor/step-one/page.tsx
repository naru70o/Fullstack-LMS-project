"use client";
import { useActionState, useState } from "react";
import StepNavigation from "../_components/Step-navigation";
import Form from "../_components/form";
import { InstructorFormInput } from "../_components/instructor-form-input";
import { MultiSelect } from "../_components/multi-select";
import StepButton from "../_components/step-button";
import {
  expertiseOptions,
  Option,
  qualificationOptions,
  specificSkillsOptions,
} from "../_libs/options";
import { useRouter } from "next/navigation";
import { registerInstructorOne } from "../action";

export default function page() {
  const [selected, setSelected] = useState<{
    occupation: Option[];
    specificSkills: Option[];
    qualification: Option[];
  }>({
    occupation: [],
    specificSkills: [],
    qualification: [],
  });

  const [state, formAction, pending] = useActionState(
    registerInstructorOne,
    null
  );

  console.log(state);

  const handleSelectionChange = (
    field: keyof typeof selected,
    value: Option[]
  ) => {
    setSelected((prev) => ({ ...prev, [field]: value }));
  };

  console.log(selected);
  return (
    <section className="container h-screen grid grid-cols-1 content-center justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-[60px]">
      <div className="mx-auto flex flex-col items-start lg:flex lg:flex-row gap-4">
        <StepNavigation />
        <Form action={formAction} state={state}>
          <MultiSelect
            description="What are your main professional roles or occupations?"
            placeholder="Search or select your occupations (e.g., Software Engineer, Marketing Manager, Yoga Instructor)"
            options={expertiseOptions}
            selected={selected.occupation}
            name="occupation"
            onChange={(value) => handleSelectionChange("occupation", value)}
          />

          <MultiSelect
            description="What specific skills and topics are you qualified to teach?"
            placeholder="Select the subjects you can teach (e.g., Python Programming, Social Media Marketing, Graphic Design)"
            options={specificSkillsOptions}
            selected={selected.specificSkills}
            name="specificSkills"
            onChange={(value) => handleSelectionChange("specificSkills", value)}
          />

          <InstructorFormInput
            type="number"
            name="yearsOfExpertise"
            placeholder="Enter years of professional experience (e.g., 3, 7, 12)"
            description="How many years of professional experience do you have in your field?"
            // min={1}
            // max={10}
          />

          <MultiSelect
            description="What formal qualifications, certifications, or education support your expertise?"
            placeholder="Select your qualifications or add custom ones (e.g., Bachelor's Degree, AWS Certified, 10+ Years Experience)"
            options={qualificationOptions}
            name="qualification"
            selected={selected.qualification}
            onChange={(value) => handleSelectionChange("qualification", value)}
          />
          <StepButton step="Next step" />
        </Form>
      </div>
    </section>
  );
}
