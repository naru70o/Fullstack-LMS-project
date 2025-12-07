import { Button } from "@/components/components/ui/button";
import { ChevronLeft, Plus } from "lucide-react";
import Link from "next/link";
import ModuleList from "../components/module-list";
import CreateModuleDialog from "../components/create-module-dialog";

export default async function page({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const courseId = Number.parseInt(params.courseId);
  const [modules, setModules] = [];
  const [isCreateModuleDialogOpen, setIsCreateModuleDialogOpen] = [];
  const course = [];
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
