"use client";

import { useState } from "react";
import { Button } from "@/components/components/ui/button";
import { ChevronLeft, Plus } from "lucide-react";
import Link from "next/link";
import ModuleList from "../components/module-list";
import CreateModuleDialog from "../components/create-module-dialog";

// Sample courses data - replace with API call
const SAMPLE_COURSES = [
  {
    id: 1,
    title: "Introduction to React",
    description:
      "Learn the fundamentals of React and start building modern web applications.",
  },
  {
    id: 2,
    title: "Advanced TypeScript",
    description:
      "Master TypeScript advanced concepts and best practices for enterprise applications.",
  },
];

// Sample modules data structure
const SAMPLE_MODULES = [
  {
    id: 1,
    courseId: 1,
    title: "React Fundamentals",
    description: "Understanding React core concepts",
    order: 1,
    lectures: [
      {
        id: 1,
        moduleId: 1,
        title: "What is React?",
        description: "Introduction to React",
        duration: "12:30",
        order: 1,
      },
      {
        id: 2,
        moduleId: 1,
        title: "JSX and Components",
        description: "Learn about JSX syntax and component creation",
        duration: "18:45",
        order: 2,
      },
    ],
  },
  {
    id: 2,
    courseId: 1,
    title: "Hooks and State",
    description: "Mastering React Hooks for state management",
    order: 2,
    lectures: [
      {
        id: 3,
        moduleId: 2,
        title: "useState Hook",
        description: "Managing state with useState",
        duration: "15:20",
        order: 1,
      },
    ],
  },
];

export default function ManageCoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const courseId = Number.parseInt(params.courseId);
  const [modules, setModules] = useState(
    SAMPLE_MODULES.filter((m) => m.courseId === courseId)
  );
  const [isCreateModuleDialogOpen, setIsCreateModuleDialogOpen] =
    useState(false);

  const course = SAMPLE_COURSES.find((c) => c.id === courseId);

  const handleCreateModule = (moduleData: any) => {
    const newModule = {
      id: Math.max(...modules.map((m) => m.id), 0) + 1,
      courseId,
      ...moduleData,
      order: modules.length + 1,
      lectures: [],
    };
    setModules([...modules, newModule]);
    setIsCreateModuleDialogOpen(false);
  };

  const handleDeleteModule = (moduleId: number) => {
    setModules(modules.filter((m) => m.id !== moduleId));
  };

  const handleUpdateModule = (moduleId: number, updatedData: any) => {
    setModules(
      modules.map((m) => (m.id === moduleId ? { ...m, ...updatedData } : m))
    );
  };

  const handleAddLecture = (moduleId: number, lectureData: any) => {
    setModules(
      modules.map((m) => {
        if (m.id === moduleId) {
          const newLecture = {
            id: Math.max(...m.lectures.map((l) => l.id), 0) + 1,
            moduleId,
            ...lectureData,
            order: m.lectures.length + 1,
          };
          return { ...m, lectures: [...m.lectures, newLecture] };
        }
        return m;
      })
    );
  };

  const handleDeleteLecture = (moduleId: number, lectureId: number) => {
    setModules(
      modules.map((m) =>
        m.id === moduleId
          ? { ...m, lectures: m.lectures.filter((l) => l.id !== lectureId) }
          : m
      )
    );
  };

  const handleUpdateLecture = (
    moduleId: number,
    lectureId: number,
    updatedData: any
  ) => {
    setModules(
      modules.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              lectures: m.lectures.map((l) =>
                l.id === lectureId ? { ...l, ...updatedData } : l
              ),
            }
          : m
      )
    );
  };

  if (!course) {
    return (
      <main className="min-h-screen bg-background p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Course not found
          </h1>
          <Link href="/">
            <Button className="mt-4">Back to Courses</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card p-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {course.title}
            </h1>
            <p className="mt-1 text-muted-foreground">
              Manage modules and lectures
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground">
            Modules ({modules.length})
          </h2>
          <Button
            onClick={() => setIsCreateModuleDialogOpen(true)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Module
          </Button>
        </div>

        {modules.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-12">
            <Plus className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">
              No modules yet
            </h3>
            <p className="mt-2 text-muted-foreground">
              Create your first module to get started
            </p>
            <Button
              onClick={() => setIsCreateModuleDialogOpen(true)}
              className="mt-4"
            >
              Create First Module
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <ModuleList
              modules={modules}
              onDeleteModule={handleDeleteModule}
              onUpdateModule={handleUpdateModule}
              onAddLecture={handleAddLecture}
              onDeleteLecture={handleDeleteLecture}
              onUpdateLecture={handleUpdateLecture}
            />
          </div>
        )}
      </div>

      {/* Create Module Dialog */}
      <CreateModuleDialog
        isOpen={isCreateModuleDialogOpen}
        onOpenChange={setIsCreateModuleDialogOpen}
        onCreateModule={handleCreateModule}
      />
    </main>
  );
}
