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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/components/ui/select";
import { Button } from "@/components/components/ui/button";
import { Textarea } from "@/components/components/ui/textarea";
import { Label } from "@/components/components/ui/label";
import { categories, levels } from "@/components/lib/utils";
import { createCourse } from "../action";

interface CreateCourseDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateCourseDialog({
  isOpen,
  onOpenChange,
}: CreateCourseDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    category: "",
    level: "",
  });
  const [state, formAction, pending] = useActionState(createCourse, null);
  console.log("Action state:", state);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new course for your students
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          {/* course title */}
          <div className="space-y-2">
            <Label htmlFor="title">Course Title</Label>
            <input
              type="text"
              name="title"
              placeholder="Find courses, skills, software, etc"
              className="bg-popover-foreground/10 w-full max-w-xl p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-popover-foreground/70 font-poppins text-[16px] font-normal leading-[24px]"
            />
          </div>
          {/* course description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              className="font-poppins text-[16px] font-normal leading-[24px]"
              id="description"
              placeholder="Describe what students will learn..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              rows={4}
            />
          </div>
          {/* course level */}
          <div className="space-y-2">
            <Label htmlFor="levels">Levels</Label>
            <Select name="level" required={true}>
              <SelectTrigger
                size="lg"
                className={`bg-popover-foreground/10 w-full max-w-md p-4 h-[56px] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-popover-foreground/70 font-poppins text-[16px] font-normal leading-[24px] border-none`}
              >
                <SelectValue placeholder="Select a level" className="" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--input-bg-color)] text-[var(--input-text-color)] font-poppins text-[16px] font-normal leading-[24px]">
                <SelectGroup>
                  <SelectLabel>Select course level</SelectLabel>
                  {levels?.map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* course category */}
          <div className="space-y-2">
            <Label htmlFor="categories">Categories</Label>
            <Select name="category" required={true}>
              <SelectTrigger
                size="lg"
                className={`bg-popover-foreground/10 w-full max-w-md p-4 h-[56px] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-popover-foreground/70 font-poppins text-[16px] font-normal leading-[24px] border-none`}
              >
                <SelectValue placeholder="Select a category" className="" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--input-bg-color)] text-[var(--input-text-color)] font-poppins text-[16px] font-normal leading-[24px]">
                <SelectGroup>
                  <SelectLabel>Select course category</SelectLabel>
                  {categories?.map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* course thumbnail */}
          <div className="space-y-2">
            <Label htmlFor="thumbnail">Course Thumbnail</Label>
            <input
              type="file"
              name="thumbnail"
              className="bg-popover-foreground/10 w-full max-w-xl p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-popover-foreground/70 font-poppins text-[16px] font-normal leading-[24px]"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              disabled={pending}
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button disabled={pending} type="submit" className="flex-1">
              Create Course
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
