import ModuleCard from "./module-card";

interface Lecture {
  id: number;
  moduleId: number;
  title: string;
  description: string;
  duration: string;
  order: number;
}

interface Module {
  id: number;
  courseId: number;
  title: string;
  description: string;
  order: number;
  lectures: Lecture[];
}

interface ModuleListProps {
  modules: Module[];
  // onDeleteModule: (moduleId: number) => void;
  // onUpdateModule: (moduleId: number, updatedData: any) => void;
  // onAddLecture: (moduleId: number, lectureData: any) => void;
  // onDeleteLecture: (moduleId: number, lectureId: number) => void;
  // onUpdateLecture: (
  //   moduleId: number,
  //   lectureId: number,
  //   updatedData: any
  // ) => void;
}

export default function ModuleList({
  modules,
}: // onDeleteModule,
// onUpdateModule,
// onAddLecture,
// onDeleteLecture,
// onUpdateLecture,
ModuleListProps) {
  return (
    <div className="space-y-4">
      {modules.map((module) => (
        <ModuleCard
          key={module.id}
          module={module}
          // onDelete={onDeleteModule}
          // onUpdate={onUpdateModule}
          // onAddLecture={onAddLecture}
          // onDeleteLecture={onDeleteLecture}
          // onUpdateLecture={onUpdateLecture}
        />
      ))}
    </div>
  );
}
