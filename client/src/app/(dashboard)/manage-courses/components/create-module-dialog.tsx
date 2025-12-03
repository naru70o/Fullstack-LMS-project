"use client";

import type React from "react";

import { useState } from "react";
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

interface CreateModuleDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateModule: (moduleData: any) => void;
}

export default function CreateModuleDialog({
  isOpen,
  onOpenChange,
  onCreateModule,
}: CreateModuleDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onCreateModule({
      title,
      description,
    });

    setTitle("");
    setDescription("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Module</DialogTitle>
          <DialogDescription>
            Add a new module to organize your course content
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="module-title">Module Title</Label>
            <Input
              id="module-title"
              placeholder="e.g., React Fundamentals"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="module-description">Description</Label>
            <Textarea
              id="module-description"
              placeholder="Describe what this module covers"
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
              Create Module
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
