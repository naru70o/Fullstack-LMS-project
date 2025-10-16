"use client";
import React, { useState } from "react";
import StepNavigation from "../_components/Step-navigation";
import Form from "../_components/form";
import { InstructorFormInput } from "../_components/instructor-form-input";
import StepButton from "../_components/step-button";
import { MultiSelect } from "../_components/multi-select";

export type Option = {
  label: string;
  value: string;
  category?: string;
};

export default function page() {
  const [selected, setSelected] = useState<Option[]>([]);

  const options: Option[] = [
    { label: "Apple", value: "apple", category: "Fruits" },
    { label: "Banana", value: "banana", category: "Fruits" },
    { label: "Cherry", value: "cherry", category: "Fruits" },
    { label: "Date", value: "date", category: "Fruits" },
    { label: "Elderberry", value: "elderberry", category: "Fruits" },
    { label: "Carrot", value: "carrot", category: "Vegetables" },
    { label: "Broccoli", value: "broccoli", category: "Vegetables" },
    { label: "Spinach", value: "spinach", category: "Vegetables" },
    { label: "Potato", value: "potato", category: "Vegetables" },
    { label: "Tomato", value: "tomato", category: "Vegetables" },
    { label: "Milk", value: "milk", category: "Dairy" },
    { label: "Cheese", value: "cheese", category: "Dairy" },
    { label: "Yogurt", value: "yogurt", category: "Dairy" },
  ];
  return (
    <section className="container h-screen grid grid-cols-1 content-center justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-[60px]">
      <div className="mx-auto flex flex-col items-start lg:flex lg:flex-row gap-4">
        <StepNavigation />
        <Form>
          <InstructorFormInput
            type="text"
            name="expertice"
            placeholder="expertice"
            description="Select all that apply (e.g., Programming, Design, Music, etc.)"
          />
          <MultiSelect
            discription="your expertice"
            options={options}
            selected={selected}
            name="expertise"
            onChange={setSelected}
          />
          <StepButton step="Next step" />
        </Form>
      </div>
    </section>
  );
}
