"use client";
import React, { useState } from "react";
import StepNavigation from "../_components/Step-navigation";
import Form from "../_components/form";
import {
  InstructorFormInput,
  InstructorFormSelect,
} from "../_components/instructor-form-input";
import StepButton from "../_components/step-button";
import { MultiSelect } from "../_components/multi-select";
import {
  expertiseOptions,
  Option,
  specificSkillsOptions,
} from "../_libs/options";

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
        <Form>
          {/* <InstructorFormInput
            type="text"
            name="expertice"
            placeholder="expertice"
            description="Select all that apply (e.g., Programming, Design, Music, etc.)"
          /> */}
          <MultiSelect
            discription="your occupation"
            options={expertiseOptions}
            selected={selected.occupation}
            name="occupation"
            onChange={(value) => handleSelectionChange("occupation", value)}
          />
          <MultiSelect
            discription="your expertice"
            options={specificSkillsOptions}
            selected={selected.specificSkills}
            name="specificSkills"
            onChange={(value) => handleSelectionChange("specificSkills", value)}
          />
          <InstructorFormInput
            type="number"
            name="yearsOfExpertise"
            placeholder="years of expertise"
            description="Select all that apply (e.g., Programming, Design, Music, etc.)"
          />
          <MultiSelect
            discription="your qualifications"
            options={expertiseOptions}
            placeholder="your"
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
