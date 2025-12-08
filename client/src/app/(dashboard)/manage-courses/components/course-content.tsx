"use client";
import React from "react";
import { Button } from "@/components/components/ui/button";
import { Plus } from "lucide-react";
import NoModuleFound from "./no-module-found";
import CreateModuleDialog from "./create-module-dialog";
import ModuleList from "./module-list";

import { Module } from "../types";

export default function CourseContent({
  modules,
  courseId,
}: {
  modules: Module[];
  courseId: string;
}) {
  const [isCreateModuleDialogOpen, setIsCreateModuleDialogOpen] =
    React.useState(false);
  console.log("course modules ", modules);
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">
          Modules ({modules.length})
        </h2>
        <Button
          onClick={() => setIsCreateModuleDialogOpen(true)}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Module
        </Button>
      </div>

      {modules?.length === 0 || modules === undefined ? (
        <NoModuleFound courseId={courseId} />
      ) : (
        <div className="space-y-4">
          <ModuleList
            modules={modules}
            //   onDeleteModule={handleDeleteModule}
            //   onUpdateModule={handleUpdateModule}
            //   onAddLecture={handleAddLecture}
            //   onDeleteLecture={handleDeleteLecture}
            //   onUpdateLecture={handleUpdateLecture}
          />
        </div>
      )}

      <CreateModuleDialog
        courseId={courseId}
        isOpen={isCreateModuleDialogOpen}
        onOpenChange={setIsCreateModuleDialogOpen}
      />
    </div>
  );
}
