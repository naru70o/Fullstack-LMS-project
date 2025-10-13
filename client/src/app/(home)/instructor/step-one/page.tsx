import React from "react";
import StepNavigation from "../_components/Step-navigation";
import Form from "../_components/form";

export default function page() {
  return (
    <section className="container h-screen grid grid-cols-1 content-center justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-[60px]">
      <div className="mx-auto flex flex-col items-start lg:flex lg:flex-row gap-4">
        <StepNavigation />
        <Form />
      </div>
    </section>
  );
}
