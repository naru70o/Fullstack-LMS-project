"use client";
import React from "react";
import { Button } from "@/components/components/ui/button";
import { Edit, Zap } from "lucide-react";
import EditCourseDialog from "./edit-course-dialog";
import { ICourse } from "@/components/util/interfaces";

export default function ActionButtons({ course }: { course: ICourse }) {
  const [openCourseEditModal, setOpenCourseEditModal] = React.useState(false);

  const handleEditCourse = (open: boolean) => {
    setOpenCourseEditModal(open);
  };

  return (
    <>
      <div className="mt-6">
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
          <Button
            variant="outline"
            className="gap-2 bg-transparent"
            onClick={() => handleEditCourse(true)}
          >
            <Edit className="h-4 w-4" />
            Edit Course
          </Button>
          <Button
            className="gap-2 bg-blue-600 hover:bg-blue-700 group-hover:cursor-pointer"
            // onClick={onPublish}
          >
            <Zap className="h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>

      {openCourseEditModal && (
        <EditCourseDialog
          isOpen={openCourseEditModal}
          onOpenChange={handleEditCourse}
          course={course}
        />
      )}
    </>
  );
}
