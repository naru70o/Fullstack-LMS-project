"use client";
import React, { useState } from "react";
import { Reviews } from "../app/(home)/courses/_components/reviews";
import CourseCurriculum from "../app/(home)/courses/_components/modules";
import { Course } from "../app/(home)/courses/_components/feed";

export const TabMenu = ({ data }: { data: Course }) => {
  const [tabMenu, setTabMenu] = useState("reviews");

  const HandleTabMenus = (tab: string) => {
    setTabMenu(tab);
  };

  return (
    <>
      <div className="flex justify-start gap-4 mt-6 text-popover-foreground/80">
        <button
          className={`${
            tabMenu === "reviews" &&
            " underline underline-offset-4 decoration-3 decoration-[var(--primary-color)]"
          } hover:text-popover-foreground/50 transition-all cursor-pointer`}
          onClick={() => HandleTabMenus("reviews")}
        >
          reviews
        </button>
        <button
          className={`${
            tabMenu === "course" &&
            " underline underline-offset-4 decoration-3 decoration-[var(--primary-color)]"
          } hover:text-popover-foreground/50 transition-all cursor-pointer`}
          onClick={() => HandleTabMenus("course")}
        >
          Course
        </button>
      </div>
      {tabMenu === "reviews" && <Reviews />}
      {tabMenu === "course" && <CourseCurriculum course={data} />}
    </>
  );
};
