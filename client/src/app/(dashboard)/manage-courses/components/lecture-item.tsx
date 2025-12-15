"use client";

import { useState } from "react";
import { Card } from "@/components/components/ui/card";
import { Button } from "@/components/components/ui/button";
import { Trash2, Edit2, Play } from "lucide-react";
import EditLectureDialog from "./edit-lecture-dialog";
import durationFormatterString from "@/components/util/durationFormatter";

import { Lecture } from "../types";

interface LectureItemProps {
  lecture: Lecture;
  // onDelete: (lectureId: number) => void;
  // onUpdate: (lectureId: number, updatedData: any) => void;
}

export default function LectureItem({
  lecture,
}: // onDelete,
// onUpdate,
LectureItemProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <>
      <Card className="flex items-start justify-between gap-4 p-4 transition-all hover:shadow-md bg-muted/50 cursor-pointer">
        <div className="flex flex-1 w-full items-start gap-4">
          <div className="rounded bg-primary/10 p-2.5 flex-shrink-0 mt-0.5">
            <Play className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">
              {lecture.title}
            </p>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {lecture.description}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {lecture.duration}
            </p>
            <div className="flex justify-between items-center gap-2 flex-shrink-0 mt-2">
              <div className="flex-shrink-0">
                <p className="text-xs font-semibold text-muted-foreground bg-primary/10 px-2 py-1 rounded">
                  {durationFormatterString(lecture.duration)}
                </p>
              </div>
              {/* buttons -- edit and delete */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditDialogOpen(true)}
                  className="gap-1 bg-transparent cursor-pointer"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  // onClick={() => onDelete(lecture.id)}
                  className="gap-1 bg-transparent text-destructive cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Edit Lecture Dialog */}
      <EditLectureDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        lecture={lecture}
      />
    </>
  );
}
