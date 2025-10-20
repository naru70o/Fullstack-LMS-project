import { Button } from "@/components/components/ui/button";
import React from "react";

export default function StepButton({
  step,
  isPending,
}: {
  step: string;
  isPending: boolean;
}) {
  return (
    <Button
      size="lg"
      variant="primary"
      className="w-fit self-end bg-[var(--primary-color)] text-white hover:bg-primary/80 focus:ring-2 focus:ring-[var(--primary-color)] cursor-pointer mt-2"
      disabled={isPending}
    >
      {step}
    </Button>
  );
}
