"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import CreateModuleDialog from "./create-module-dialog";

interface NoModuleFoundProps {
  courseId: string;
}

export default function NoModuleFound({ courseId }: NoModuleFoundProps) {
  const [isCreateModuleDialogOpen, setIsCreateModuleDialogOpen] =
    React.useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-12">
        <Plus className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="text-lg font-semibold text-foreground">
          No modules yet
        </h3>
        <p className="mt-2 text-muted-foreground">
          Create your first module to get started
        </p>
        <Button
          onClick={() => setIsCreateModuleDialogOpen(true)}
          className="mt-4"
        >
          Create First Module
        </Button>
      </div>

      <CreateModuleDialog
        isOpen={isCreateModuleDialogOpen}
        onOpenChange={setIsCreateModuleDialogOpen}
        courseId={courseId}
      />
    </>
  );
}
