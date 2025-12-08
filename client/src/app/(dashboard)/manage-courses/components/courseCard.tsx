"use client";

import { Button } from "@/components/components/ui/button";
import { ICourse } from "@/components/util/interfaces";
import { Edit, Trash2, Users, BookOpen, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DeleteConfirmDialog from "./delete-confirm-dialog";
import { deleteCourse } from "../action";

export default function CourseCard({ course }: { course: ICourse }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <>
      <div className=" p-4 border-1 border-popover-foreground/10 w-auto mx-auto rounded-lg">
        {/* Course Image */}
        <div className="relative h-40 w-full overflow-hidden bg-muted">
          <div className="h-[161px] w-full relative">
            <Image
              src="/assets/Thumbnail.jpg"
              alt="Thumbnail"
              fill
              className="absolute w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Course Content */}
        <div className="flex flex-col mt-4">
          <h3 className="text-lg font-semibold text-foreground line-clamp-2">
            {course.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {course.description}
          </p>

          {/* Course Stats */}
          <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border py-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {100} Enrolled
              </span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {course.numberOfLectures}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {course.duration}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex gap-2 ">
            <Link
              href={`/manage-courses/${course.id}`}
              className="flex-1 cursor-pointer"
            >
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent"
              >
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Course?"
        description={
          <span>
            Are you sure you want to delete the course &quot;
            <strong>{course.title}</strong>&quot;? This will permanently delete
            the course, all its modules, and lectures.
          </span>
        }
        action={deleteCourse}
        targetId={course.id}
        inputIdName="courseId"
      />
    </>
  );
}
