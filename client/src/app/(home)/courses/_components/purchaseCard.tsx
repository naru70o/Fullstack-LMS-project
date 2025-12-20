import { Heart, BookOpen, Play, Volume2, NotebookPen } from "lucide-react";
import { Button } from "@/components/components/ui/button";
import { ICourse } from "@/components/util/interfaces";
import durationFormatterString from "@/components/util/durationFormatter";

export default function Block({ course }: { course: ICourse }) {
  const duration = durationFormatterString(course.totalOfHours);
  return (
    <div className="w-full grid-cols-1 col-start-3 col-end-4 self-start justify-self-center max-w-md mx-auto bg-popover rounded-lg p-6 shadow-search-ba font-poppins">
      {/* Course Title and Price */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-popover-foreground/90 mb-2 tracking-wide">
          {course.title.toUpperCase()}
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-popover-foreground/90">
            $22.40
          </span>
          <span className="text-lg text-popover-foreground/40 line-through">
            $30.13
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 mb-8">
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-xl py-3 rounded-lg transition-colors cursor-pointer"
          size="lg"
        >
          Enroll Now
        </Button>

        <Button
          asChild
          variant="outline"
          className="w-full border-primary text-primary font-bold text-xl py-3 rounded-lg transition-colors bg-transparent cursor-pointer"
          size="lg"
        >
          <div className="flex items-center justify-center">
            {/* ! is Tailwind's important modifier to override ShadCN's defaults */}
            <Heart size={28} className="mr-2 flex !w-7 !h-7" />
            <p>Wishlist</p>
          </div>
        </Button>
      </div>

      {/* Course Details */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-popover-foreground/60">
          <NotebookPen className="w-5 h-5 text-popover-foreground/50" />
          <span className="text-sm font-medium">
            {course?.modules?.length} Section
          </span>
        </div>

        <div className="flex items-center gap-3 text-popover-foreground/60">
          <BookOpen className="w-5 h-5 text-popover-foreground/50" />
          <span className="text-sm font-medium">
            {course.numberOfLectures} Lectures
          </span>
        </div>

        <div className="flex items-center gap-3 text-popover-foreground/60">
          <Play className="w-5 h-5 text-popover-foreground/50" />
          <span className="text-sm font-medium">{duration} total lengths</span>
        </div>

        <div className="flex items-center gap-3 text-popover-foreground/60">
          <Volume2 className="w-5 h-5 text-popover-foreground/50" />
          <span className="text-sm font-medium">English</span>
        </div>
      </div>
    </div>
  );
}
