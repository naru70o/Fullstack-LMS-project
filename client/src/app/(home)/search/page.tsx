import { NavigationFixed } from "@/components/navigation";
import CourseFilters from "./_components/searchCourse";
import React from "react";

const Page = () => {
  return (
    <>
      <NavigationFixed />
      <CourseFilters />
    </>
  );
};

export default Page;
