"use client";

import { Button } from "@/components/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/components/ui/dialog";
import { Label } from "@/components/components/ui/label";
import { Loader2, Upload, X } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateLecture } from "../action";
import { Lecture } from "../types";
import { Textarea } from "@/components/components/ui/textarea";
import { Input } from "@/components/components/ui/input";

interface EditLectureDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  lecture: Lecture;
}

export default function EditLectureDialog({
  isOpen,
  onOpenChange,
  lecture,
}: EditLectureDialogProps) {
  const [state, action, isPending] = useActionState(updateLecture, null);
  const [filePreview, setFilePreview] = useState<string>("");

  useEffect(() => {
    if (state?.status === "success") {
      if (Array.isArray(state.message)) {
        toast.success(
          `${state.message[0]}: ${state.message[1].split(":")[1].trim()}`
        );
        onOpenChange(false);
      } else {
        toast.success(state.message ?? "Lecture updated successfully");
        onOpenChange(false);
      }
      // Reset file state after successful update
      setFilePreview("");
    } else if (state?.status === "error") {
      if (Array.isArray(state.message)) {
        toast.error(
          `${state.message[0]}: ${state.message[1].split(":")[1].trim()}`
        );
      } else {
        toast.error(state.message ?? "Failed to update lecture");
      }
    }
  }, [state, onOpenChange]);

  // Reset file state when dialog opens/closes
  useEffect(() => {
    if (!isOpen) {
      setFilePreview("");
    }
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFilePreview(selectedFile.name);
    }
  };

  const handleRemoveFile = () => {
    setFilePreview("");
    // Reset the file input
    const fileInput = document.getElementById(
      "edit-lecture-file"
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Edit Lecture</DialogTitle>
          <DialogDescription>Update the lecture information</DialogDescription>
        </DialogHeader>

        <form action={action} className="space-y-4 overflow-x-hidden">
          <Input type="hidden" name="lectureId" value={lecture.id} />

          <div className="space-y-2">
            <Label htmlFor="edit-lecture-title">Lecture Title</Label>
            <Input
              id="edit-lecture-title"
              name="title"
              defaultValue={lecture.title}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-lecture-description">Description</Label>
            <Textarea
              id="edit-lecture-description"
              name="description"
              defaultValue={lecture.description}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-lecture-file">
              Lecture Material (Optional)
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="edit-lecture-file"
                type="file"
                name="lecture"
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.mov,.avi,.zip"
              />
              <label
                htmlFor="edit-lecture-file"
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                <Upload size={18} />
                <span className="text-sm">Browse</span>
              </label>
              {filePreview && (
                <span className="text-sm text-muted-foreground truncate">
                  {filePreview.length > 30
                    ? `${filePreview.slice(0, 30)}...`
                    : filePreview}
                </span>
              )}
            </div>
            {filePreview && (
              <div className="mt-2 flex items-center justify-between bg-slate-900 p-3 rounded-md border border-slate-700">
                <span className="text-sm text-slate-300 truncate">
                  {filePreview.length > 30
                    ? `${filePreview.slice(0, 30)}...`
                    : filePreview}
                </span>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="text-slate-400 hover:text-red-400 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            )}
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
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
