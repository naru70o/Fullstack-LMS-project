"use client";

import type React from "react";

import { useActionState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components//ui/label";
import { Input } from "@/components/ui/input";
import { createModule } from "../action";
import toast from "react-hot-toast";

interface CreateModuleDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: string;
}

export default function CreateModuleDialog({
  isOpen,
  onOpenChange,
  courseId,
}: CreateModuleDialogProps) {
  const [state, formAction, pending] = useActionState(createModule, null);

  useEffect(() => {
    if (state?.status === "success") {
      if (Array.isArray(state.message)) {
        toast.success(
          `${state.message[0]}: ${state.message[1].split(":")[1].trim()}`,
        );
        onOpenChange(false);
      } else {
        toast.success(state.message ?? "Module created successfully");
        onOpenChange(false);
      }
    } else if (state?.status === "error") {
      if (Array.isArray(state.message)) {
        toast.error(
          `${state.message[0]}: ${state.message[1].split(":")[1].trim()}`,
        );
      } else {
        toast.error(state.message ?? "Failed to create module");
      }
    }
  }, [state, onOpenChange]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Module</DialogTitle>
          <DialogDescription>
            Add a new module to organize your course content
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Module Title</Label>
            <Input type="text" name="title" placeholder="Module Title" />
          </div>

          {/* courseId as a hidden input */}
          <input type="hidden" name="courseId" value={courseId} />

          <div className="space-y-2">
            <Label htmlFor="module-description">Description</Label>
            <Textarea
              id="module-description"
              name="description"
              placeholder="Describe what this module covers"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Creating..." : "Create Module"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
