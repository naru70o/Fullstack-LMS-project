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
import { Upload, X } from "lucide-react";

interface CreateLectureDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateLecture: (lectureData: any) => void;
}

export default function CreateLectureDialog({
  isOpen,
  onOpenChange,
  onCreateLecture,
}: CreateLectureDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>("");

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
    if (!title.trim() || !duration.trim()) return;

    onCreateLecture({
      title,
      description,
      duration,
      file,
    });

    setTitle("");
    setDescription("");
    setDuration("");
    setFile(null);
    setFilePreview("");
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="lecture-title">Lecture Title</Label>
            <Input
              id="lecture-title"
              placeholder="e.g., Introduction to React"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="lecture-description">Description</Label>
            <Textarea
              id="lecture-description"
              placeholder="Describe the lecture content"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="lecture-duration">Duration</Label>
            <Input
              id="lecture-duration"
              placeholder="e.g., 15:30"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="lecture-file">Lecture Material (Optional)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="lecture-file"
                type="file"
                onChange={handleFileChange}
                className="flex-1"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.mov,.avi,.zip"
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
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim() || !duration.trim()}>
              Add Lecture
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
