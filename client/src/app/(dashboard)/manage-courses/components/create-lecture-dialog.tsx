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
import { Loader2, Upload, X } from "lucide-react";
import { createLecture } from "../action";
import toast from "react-hot-toast";

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

  const [filePreview, setFilePreview] = useState<string>("");

  const [state, formAction, isPending] = useActionState(
    createLecture,
    initialState
  );

  useEffect(() => {
    if (state?.status === "success") {
      if (Array.isArray(state.message)) {
        toast.success(
          `${state.message[0]}: ${state.message[1].split(":")[1].trim()}`
        );
        onOpenChange(false);
      } else {
        toast.success(state.message ?? "Lecture created successfully");
        onOpenChange(false);
      }
      // Reset form
      setTitle("");
      setDescription("");
      setFilePreview("");
    } else if (state?.status === "error") {
      if (Array.isArray(state.message)) {
        toast.error(
          `${state.message[0]}: ${state.message[1].split(":")[1].trim()}`
        );
      } else {
        toast.error(state.message ?? "Failed to create lecture");
      }
    }
  }, [state, onOpenChange]);

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
      "lecture-file"
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

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
                id="lecture-file"
                name="lecture"
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.mov,.avi,.zip"
                required
              />
              <label
                htmlFor="lecture-file"
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                <Upload size={18} />
                <span className="text-sm">Browse</span>
              </label>
            </div>
            {filePreview && (
              <div className="mt-2 flex items-center justify-between bg-slate-900 p-3 rounded-md border border-slate-700">
                <span className="text-sm text-slate-300 truncate">
                  {filePreview}
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
            <Button
              type="submit"
              disabled={isPending || !title || !description || !filePreview}
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
