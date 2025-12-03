import { courses } from "@/components/util/damydata";
import { CircleUser } from "lucide-react";
import Image from "next/image";

export function Card() {
  return (
    <>
      {courses.map((course) => (
        <div
          key={course._id}
          className=" p-4 border-1 border-popover-foreground/10 w-auto mx-auto rounded-lg"
        >
          <div className="flex flex-col gap-1 text-card-foreground rounded-lg w-auto overflow-hidden relative">
            {/* badge / best seller */}
            <div className="absolute top-2 left-2 bg-[#EADB36] text-black/70 text-xs font-bold py-1 px-2 rounded-lg z-10">
              Best Seller
            </div>
            {/* Thumbnail */}
            <div className="h-[161px] w-full relative">
              <Image
                src={course.thumbnail.secure_url}
                alt="Thumbnail"
                fill
                className="absolute w-full h-full object-cover rounded-lg"
              />
            </div>
            <h2 className="text-lg font-bold text-popover-foreground leading-7">
              {course.title.toUpperCase()}
            </h2>
            <p className="flex items-center gap-1 text-sm text-popover-foreground/40">
              <span>
                <CircleUser />
              </span>{" "}
              {course.instructor}
            </p>
            {/* progress bar with course completion */}
            <div className="">
              {/* Progress bar component can be added here */}
              <div className="h-1 bg-gray-200 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{ width: "70%" }}
                ></div>
              </div>
            </div>
            {/* <ProgressBar completed={70} /> */}
            <div className="flex items-center gap-3">
              <p className="text-sm text-popover-foreground/60">70%</p>
              <p className="text-sm text-popover-foreground/60">Completed</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
