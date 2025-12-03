import { Button } from "@/components/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

export default function Header({
  setIsCreateDialogOpen,
}: {
  setIsCreateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="border-b border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Courses</h1>
          <p className="mt-2 text-muted-foreground">
            Manage and create courses for your students
          </p>
        </div>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          size="lg"
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Create New Course
        </Button>
      </div>
    </div>
  );
}
