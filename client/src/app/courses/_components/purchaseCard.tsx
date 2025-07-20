import { Heart, BookOpen, Play, Volume2 } from "lucide-react"
import { Button } from "@/components/components/ui/button"

export default function Block() {
  return (
    <div className="w-full fixed grid-cols-1 col-start-3 col-end-4 self-start justify-self-center max-w-md mx-auto bg-popover rounded-lg p-6 shadow-search-ba font-poppins">
      {/* Course Title and Price */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-popover-foreground/90 mb-2 tracking-wide">VUE JS SCRATCH COURSE</h2>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-popover-foreground/90">US$22.40</span>
          <span className="text-lg text-popover-foreground/40 line-through">$30.13</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 mb-8">
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-xl py-3 rounded-lg transition-colors"
          size="lg"
        >
          Enroll Now
        </Button>

        <Button
          variant="outline"
          className="w-full border-primary text-primary hover:bg-primary/5 font-bold text-xl py-3 rounded-lg transition-colors bg-transparent"
          size="lg"
        >
          <Heart className="w-4 h-4 mr-2" />
          Wishlist
        </Button>
      </div>

      {/* Course Details */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-popover-foreground/60">
          <BookOpen className="w-5 h-5 text-popover-foreground/50" />
          <span className="text-sm font-medium">22 Section</span>
        </div>

        <div className="flex items-center gap-3 text-popover-foreground/60">
          <BookOpen className="w-5 h-5 text-popover-foreground/50" />
          <span className="text-sm font-medium">152 Lectures</span>
        </div>

        <div className="flex items-center gap-3 text-popover-foreground/60">
          <Play className="w-5 h-5 text-popover-foreground/50" />
          <span className="text-sm font-medium">21h 33m total lengths</span>
        </div>

        <div className="flex items-center gap-3 text-popover-foreground/60">
          <Volume2 className="w-5 h-5 text-popover-foreground/50" />
          <span className="text-sm font-medium">English</span>
        </div>
      </div>
    </div>
  )
}
