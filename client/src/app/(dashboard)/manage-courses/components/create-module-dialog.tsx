"use client";

import type React from "react";

import { useActionState, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/components/ui/dialog";
import { Button } from "@/components/components/ui/button";
import { Textarea } from "@/components/components/ui/textarea";
import { Label } from "@/components/components/ui/label";
import { createModule } from "../action";

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
            <input
              type="text"
              name="title"
              placeholder="Module Title"
              className="bg-popover-foreground/10 w-full max-w-xl p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-popover-foreground/70 font-poppins text-[16px] font-normal leading-[24px]"
            />
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
