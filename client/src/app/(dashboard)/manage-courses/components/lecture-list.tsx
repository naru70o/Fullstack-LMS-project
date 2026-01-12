"use client";

import { useState, useTransition, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import LectureItem from "./lecture-item";
import { Lecture } from "../types";
import { reorderLectures } from "../action";
import toast from "react-hot-toast";

interface LectureListProps {
  lectures: Lecture[];
  moduleId: string;
}

export default function LectureList({ lectures, moduleId }: LectureListProps) {
  // Sort lectures by order
  const [items, setItems] = useState<Lecture[]>(() =>
    [...lectures].sort((a, b) => a.order - b.order)
  );
  const [isPending, startTransition] = useTransition();

  // Sync items when lectures prop changes
  useEffect(() => {
    setItems([...lectures].sort((a, b) => a.order - b.order));
  }, [lectures]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const newItems = arrayMove(items, oldIndex, newIndex);

    // Update UI immediately
    setItems(newItems);

    // Update order in database
    const lectureIds = newItems.map((item) => item.id);

    toast.loading("Reordering lectures...");
    startTransition(async () => {
      const result = await reorderLectures(moduleId, lectureIds);
      toast.dismiss();
      if (result.status === "error") {
        // Revert on error
        setItems(items);
        toast.error(
          typeof result.message === "string"
            ? result.message
            : "Failed to reorder lectures"
        );
      } else {
        toast.success("Lectures reordered successfully");
      }
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className={`space-y-3 ${isPending ? "opacity-70" : ""}`}>
          {items.map((lecture) => (
            <LectureItem key={lecture.id} lecture={lecture} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
