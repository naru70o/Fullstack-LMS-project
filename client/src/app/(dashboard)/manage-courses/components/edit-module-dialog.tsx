"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/components/ui/dialog";
import { Button } from "@/components/components/ui/button";
import { Input } from "@/components/components/ui/input";
import { Textarea } from "@/components/components/ui/textarea";
import { Label } from "@/components/components/ui/label";

interface Module {
  id: number;
  courseId: number;
  title: string;
  description: string;
  order: number;
  lectures: any[];
}

interface EditModuleDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  module: Module;
  onEditModule: (moduleData: any) => void;
}

export default function EditModuleDialog({
  isOpen,
  onOpenChange,
  module,
  onEditModule,
}: EditModuleDialogProps) {
  const [title, setTitle] = useState(module.title);
  const [description, setDescription] = useState(module.description);

  useEffect(() => {
    setTitle(module.title);
    setDescription(module.description);
  }, [module, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onEditModule({
      title,
      description,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Module</DialogTitle>
          <DialogDescription>Update the module information</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-module-title">Module Title</Label>
            <Input
              id="edit-module-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="edit-module-description">Description</Label>
            <Textarea
              id="edit-module-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
            <Button type="submit" disabled={!title.trim()}>
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
