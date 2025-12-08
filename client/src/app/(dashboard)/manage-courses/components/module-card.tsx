"use client";

import { useState } from "react";
import { Card } from "@/components/components/ui/card";
import { Button } from "@/components/components/ui/button";
import { Trash2, Plus, ChevronDown, ChevronUp, Edit2 } from "lucide-react";
import EditModuleDialog from "./edit-module-dialog";
import LectureList from "./lecture-list";
import CreateLectureDialog from "../components/create-lecture-dialog";

interface Lecture {
  id: number;
  moduleId: number;
  title: string;
  description: string;
  duration: string;
  order: number;
}

interface Module {
  id: number;
  courseId: number;
  title: string;
  description: string;
  order: number;
  lectures: Lecture[];
}

interface ModuleCardProps {
  module: Module;
  // onDelete: (moduleId: number) => void;
  // onUpdate: (moduleId: number, updatedData: any) => void;
  // onAddLecture: (moduleId: number, lectureData: any) => void;
  // onDeleteLecture: (moduleId: number, lectureId: number) => void;
  // onUpdateLecture: (
  //   moduleId: number,
  //   lectureId: number,
  //   updatedData: any
  // ) => void;
}

export default function ModuleCard({
  module,
}: // onDelete,
// onUpdate,
// onAddLecture,
// onDeleteLecture,
// onUpdateLecture,
ModuleCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateLectureDialogOpen, setIsCreateLectureDialogOpen] =
    useState(false);

  const handleEditModule = (updatedData: any) => {
    // onUpdate(module.id, updatedData);
    setIsEditDialogOpen(false);
  };

  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        {/* Module Header */}
        <div className="flex items-center justify-between border-b border-border bg-card/50 p-4">
          <div className="flex flex-1 items-center gap-3">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="rounded p-1 hover:bg-muted"
            >
              {isExpanded ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{module.title}</h3>
              <p className="text-sm text-muted-foreground">
                {module.description}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {module.lectures.length} lectures
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditDialogOpen(true)}
              className="gap-1 bg-transparent"
            >
              <Edit2 className="h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              // onClick={() => onDelete(module.id)}
              className="gap-1 bg-transparent text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        {/* Lectures Section */}
        {isExpanded && (
          <div className="border-t border-border bg-background/50 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-medium text-foreground">Lectures</h4>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsCreateLectureDialogOpen(true)}
                className="gap-1 bg-transparent"
              >
                <Plus className="h-4 w-4" />
                Add Lecture
              </Button>
            </div>

            {module.lectures.length === 0 ? (
              <div className="rounded bg-muted/50 p-4 text-center">
                <p className="text-sm text-muted-foreground">No lectures yet</p>
              </div>
            ) : (
              <LectureList
                lectures={module.lectures}
                // onDeleteLecture={(lectureId) =>
                //   onDeleteLecture(module.id, lectureId)
                // }
                // onUpdateLecture={(lectureId, updatedData) =>
                //   onUpdateLecture(module.id, lectureId, updatedData)
                // }
              />
            )}
          </div>
        )}
      </Card>

      {/* Edit Module Dialog */}
      <EditModuleDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        module={module}
        onEditModule={handleEditModule}
      />

      {/* Create Lecture Dialog */}
      <CreateLectureDialog
        isOpen={isCreateLectureDialogOpen}
        onOpenChange={setIsCreateLectureDialogOpen}
        moduleId={module.id}
      />
    </>
  );
}
