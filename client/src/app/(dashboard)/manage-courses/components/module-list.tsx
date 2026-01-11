import ModuleCard from "./module-card";
import { Module } from "../types"; // Import shared type
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { startTransition, useEffect, useState } from "react";
import { reorderModules } from "../action";
import toast from "react-hot-toast";

interface ModuleListProps {
  modules: Module[];
}

const ModuleList = ({ modules }: ModuleListProps) => {
  const [items, setItems] = useState<Module[]>(() =>
    [...modules].sort((a, b) => a.order - b.order)
  );

  // Sync items when modules prop changes
  useEffect(() => {
    setItems([...modules].sort((a, b) => a.order - b.order));
  }, [modules]);

  // sensors
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    // oldindex
    const oldIndex = items.findIndex((item) => item.id === active.id);
    // newindex
    const newIndex = items.findIndex((item) => item.id === over.id);
    const oldItems = [...items];
    //returns new array with the item moved
    const newItems = arrayMove(items, oldIndex, newIndex);
    setItems(newItems);

    const mappedModulesIds = newItems.map((item) => item.id);
    const courseId = newItems[0].courseId;

    startTransition(async () => {
      const result = await reorderModules(courseId, mappedModulesIds);
      if (result.status === "success") {
        toast.success("Modules reordered successfully");
      } else {
        toast.error("Failed to reorder modules");
        setItems(oldItems);
      }
    });
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-4">
          {items.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default ModuleList;
