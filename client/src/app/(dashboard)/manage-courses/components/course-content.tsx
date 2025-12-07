"use client";
import React from "react";
import { Button } from "@/components/components/ui/button";
import { Plus } from "lucide-react";
import NoModuleFound from "./no-module-found";
import CreateModuleDialog from "./create-module-dialog";

export default function CourseContent({ modules }: { modules: any }) {
  const [isCreateModuleDialogOpen, setIsCreateModuleDialogOpen] =
    React.useState(false);

  const handleCreateModule = (moduleData: any) => {
    console.log(moduleData);
  };
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">
          Modules
          {/* ({modules.length}) */}
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
        <NoModuleFound />
      ) : (
        <div className="space-y-4">
          {/* <ModuleList
              modules={modules}
              onDeleteModule={handleDeleteModule}
              onUpdateModule={handleUpdateModule}
              onAddLecture={handleAddLecture}
              onDeleteLecture={handleDeleteLecture}
              onUpdateLecture={handleUpdateLecture}
            /> */}
        </div>
      )}

      <CreateModuleDialog
        isOpen={isCreateModuleDialogOpen}
        onOpenChange={setIsCreateModuleDialogOpen}
        onCreateModule={handleCreateModule}
      />
    </div>
  );
}
