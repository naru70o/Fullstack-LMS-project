import LectureItem from "./lecture-item";

import { Lecture } from "../types";

interface LectureListProps {
  lectures: Lecture[];

  // onDeleteLecture: (lectureId: number) => void;
  // onUpdateLecture: (lectureId: number, updatedData: any) => void;
}

export default function LectureList({
  lectures,
}: // onDeleteLecture,
// onUpdateLecture,
LectureListProps) {
  return (
    <div className="space-y-3">
      {lectures.map((lecture) => (
        <LectureItem
          key={lecture.id}
          lecture={lecture}
          // onDelete={onDeleteLecture}
          // onUpdate={onUpdateLecture}
        />
      ))}
    </div>
  );
}
