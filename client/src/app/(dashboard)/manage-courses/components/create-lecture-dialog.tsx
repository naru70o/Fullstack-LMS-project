"use client";

import { useActionState, useEffect, useState } from "react";
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
import { Loader2 } from "lucide-react";
import { createLecture } from "../action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface CreateLectureDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  moduleId: string;
}

const initialState = {
  message: "",
  status: "",
};

export default function CreateLectureDialog({
  isOpen,
  onOpenChange,
  moduleId,
}: CreateLectureDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Basic file state for validation (checking if file is selected)
  // We can rely on form "required" and "action" but local state is useful to enable/disable button.
  // Actually, we can use a ref or just onChange to update a boolean.
  const [hasFile, setHasFile] = useState(false);

  const [state, formAction, isPending] = useActionState(
    createLecture,
    initialState
  );
  const router = useRouter();

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state.message || "Lecture created successfully");
      onOpenChange(false);
      setTitle("");
      setDescription("");
      setHasFile(false);
      router.refresh();
    } else if (state?.status === "error") {
      toast.error(state.message || "Failed to create lecture");
    }
  }, [state, onOpenChange, router]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Lecture</DialogTitle>
          <DialogDescription>
            Create a new lecture within this module
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="moduleId" value={moduleId} />

          <div className="space-y-2">
            <Label htmlFor="lecture-title">Lecture Title</Label>
            <input
              className="bg-popover-foreground/10 w-full max-w-xl p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-popover-foreground/70 font-poppins text-[16px] font-normal leading-[24px]"
              id="lecture-title"
              name="title"
              placeholder="e.g., Introduction to React"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lecture-description">Description</Label>
            <Textarea
              id="lecture-description"
              name="description"
              placeholder="Describe the lecture content"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lecture-file">Lecture Video</Label>
            <div className="flex items-center gap-2">
              <input
                className="bg-popover-foreground/10 w-full max-w-xl p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-popover-foreground/70 font-poppins text-[16px] font-normal leading-[24px]"
                id="lecture-file"
                name="lecture"
                type="file"
                onChange={(e) => setHasFile(!!e.target.files?.[0])}
                accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.mov,.avi,.zip"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || !title || !description || !hasFile}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Add Lecture"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
