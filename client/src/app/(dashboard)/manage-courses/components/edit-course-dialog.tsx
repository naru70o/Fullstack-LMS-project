"use client";

import { useState, useEffect, useActionState } from "react";
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
import { ICourse } from "@/components/util/interfaces";
import { updateCourse } from "../action";
import { categories, levels } from "@/components/lib/utils";
import { toast } from "react-hot-toast";
import { Input } from "@/components/components/ui/input";

interface EditCourseDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  course: ICourse;
}

export default function EditCourseDialog({
  isOpen,
  onOpenChange,
  course,
}: EditCourseDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    category: "",
    level: "",
    price: "",
    discount: "",
  });

  const [state, formAction, pending] = useActionState(updateCourse, null);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: course.title,
        description: course.description,
        duration: String(course.duration),
        category: course.category[0] || "",
        level: course.level[0] || "",
        price: String(course.price),
        discount: String(course.discount),
      });
    }
  }, [course, isOpen]);

  useEffect(() => {
    if (state?.status === "success") {
      if (Array.isArray(state.message)) {
        toast.success(
          `${state.message[0]}: ${state.message[1].split(":")[1].trim()}`
        );
        onOpenChange(false);
      } else {
        toast.success(state.message ?? "Course updated successfully");
        onOpenChange(false);
      }
    } else if (state?.status === "error") {
      if (Array.isArray(state.message)) {
        toast.error(
          `${state.message[0]}: ${state.message[1].split(":")[1].trim()}`
        );
      } else {
        toast.error(state.message ?? "Failed to update course");
      }
    }
  }, [state, onOpenChange]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
          <DialogDescription>Update the course information</DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="courseId" value={course.id} />
          {/* course title */}
          <div className="space-y-2">
            <Label htmlFor="title">Course Title</Label>
            <Input
              type="text"
              name="title"
              defaultValue={course.title}
              placeholder="Find courses, skills, software, etc"
            />
          </div>
          {/* course price */}
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input type="number" name="price" defaultValue={course.price} />
          </div>
          {/* course discount */}
          <div className="space-y-2">
            <Label htmlFor="discount">Discount</Label>
            <Input
              type="number"
              name="discount"
              defaultValue={course.discount}
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
            <Select name="level" required={true} defaultValue={course.level[0]}>
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
            <Select
              name="category"
              required={true}
              defaultValue={course.category[0]}
            >
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
            <Input type="file" name="thumbnail" />
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
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
