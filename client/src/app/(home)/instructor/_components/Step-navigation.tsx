"use client";
import clsx from "clsx";
import Link from "next/link";
import { AddStepRoutes } from "../types";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "@/components/components/ui/button";

const steps = [
  {
    title: "Step One",
    route: "step-one",
    link: AddStepRoutes.EXPERTISE_BACKGROUND,
  },
  {
    title: "Step Two",
    route: "step-two",
    link: AddStepRoutes.CONTENT_PRODUCTION,
  },
  { title: "Review", route: "review", link: AddStepRoutes.REVIEW_FORM },
];

export default function StepNavigation() {
  const pathname = usePathname();
  const currentPath = pathname?.split("/").pop();
  const [stepBack, setStepBack] = React.useState<number>(0);
  React.useEffect(() => {
    const currentIndex = steps.findIndex((step) => step.route === currentPath);
    setStepBack(currentIndex - 1);
  }, [currentPath]);

  return (
    <div className="w-full mb-12 lg:mb-0 min-w-60 lg:border-r-2 lg:border-foreground/10 lg:pr-12">
      {/* back button */}
      <Link
        href={steps[stepBack]?.link || steps[0].link}
        className="mb-4 flex items-center gap-2 text-xl disabled:text-white/50 lg:mb-12 lg:gap-5"
      >
        <Button variant="ghost" size="md" className="cursor-pointer">
          Back
        </Button>
      </Link>

      {/* list of form steps */}
      <div className="relative flex flex-row justify-between lg:flex-col lg:justify-start lg:gap-8">
        {steps.map((step, i) => (
          <Link
            href={step.link}
            key={step.link}
            className="group z-20 flex items-center gap-3 text-2xl"
            prefetch={true}
          >
            <span
              className={clsx(
                "flex h-10 w-10 items-center justify-center rounded-full border  text-sm  transition-colors duration-200  lg:h-12 lg:w-12 lg:text-lg",
                {
                  "border-none bg-primary text-white group-hover:border-none group-hover:text-white":
                    currentPath === step.route,
                  "border-3 border-primary bg-foreground group-hover:border-2-white group-hover:text-background/70 text-background/75":
                    currentPath !== step.route,
                }
              )}
            >
              {i + 1}
            </span>
            <span
              className={clsx(
                "hidden text-white/75 transition-colors duration-200 group-hover:text-white lg:block",
                {
                  "font-light": currentPath !== step.route,
                  "font-semibold text-white": currentPath === step.route,
                }
              )}
            >
              {step.title}
            </span>
          </Link>
        ))}
        {/* mobile background dashes */}
        <div className="absolute top-4 flex h-1 w-full border-b border-dashed lg:hidden" />
      </div>
    </div>
  );
}
