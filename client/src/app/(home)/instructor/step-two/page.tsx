import React from "react";
import StepNavigation from "../_components/Step-navigation";
import Form from "../_components/form";
import {
  InstructorFormCheckbox,
  InstructorFormInput,
} from "../_components/instructor-form-input";
import StepButton from "../_components/step-button";

export default function page() {
  return (
    <section className="container h-screen grid grid-cols-1 content-center justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-[60px]">
      <div className="mx-auto flex flex-col items-start lg:flex lg:flex-row gap-4">
        <StepNavigation />
        <Form>
          <InstructorFormCheckbox
            checkboxId="terms-and-conditions"
            label="I agree to the Instructor Terms & Conditions and platform guidelines"
            paragraph="By checking this box, you agree to our Instructor Terms of Service and commit to maintaining 
  high-quality standards for all course content you publish on our platform."
          />

          <InstructorFormCheckbox
            checkboxId="equipment"
            label="I confirm I have access to necessary equipment for creating quality course content"
            paragraph="Confirm that you have access to basic recording equipment (microphone, camera, and screen 
  recording software) to ensure your students receive a professional learning experience."
          />
          <InstructorFormInput
            type="url"
            name="sampleContentUrl"
            placeholder="https://youtube.com/your-video-sample or https://your-portfolio.com"
            description="Share a link to your existing content (YouTube, portfolio, previous courses, etc.)"
          />
          <StepButton step="Review" />
        </Form>
      </div>
    </section>
  );
}
