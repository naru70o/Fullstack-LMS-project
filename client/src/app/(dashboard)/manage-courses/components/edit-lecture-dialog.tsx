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
import { Upload, X } from "lucide-react";
import { Lecture } from "../types";

interface EditLectureDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  lecture: Lecture;
  onEditLecture: (lectureData: any) => void;
}

export default function EditLectureDialog({
  isOpen,
  onOpenChange,
  lecture,
  onEditLecture,
}: EditLectureDialogProps) {
  const [title, setTitle] = useState(lecture.title);
  const [description, setDescription] = useState(lecture.description);
  const [duration, setDuration] = useState(String(lecture.duration));
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>("");

  useEffect(() => {
    setTitle(lecture.title);
    setDescription(lecture.description);
    setDuration(String(lecture.duration));
    setFile(null);
    setFilePreview("");
  }, [lecture, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFilePreview(selectedFile.name);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFilePreview("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // if (!title.trim() || !duration.trim()) return;

    onEditLecture({
      title,
      description,
      duration: Number(duration),
      file,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Lecture</DialogTitle>
          <DialogDescription>Update the lecture information</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-lecture-title">Lecture Title</Label>
            <Input
              id="edit-lecture-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="edit-lecture-description">Description</Label>
            <Textarea
              id="edit-lecture-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="edit-lecture-duration">Duration</Label>
            <Input
              id="edit-lecture-duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="edit-lecture-file">
              Lecture Material (Optional)
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="edit-lecture-file"
                type="file"
                onChange={handleFileChange}
                className="flex-1"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.mov,.avi,.zip"
              />
              <label
                htmlFor="edit-lecture-file"
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
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
