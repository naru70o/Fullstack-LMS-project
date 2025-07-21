"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight,Play } from "lucide-react"
import { cn } from "@/components/lib/utils"

interface Lesson {
  title: string
  duration: string
  status: "current" | "completed" | "not-started"
}

interface Chapter {
  id: string
  title: string
  videoCount: number
  totalVideos: number
  duration: string
  lessons?: Lesson[]
}

const courseData: Chapter[] = [
  {
    id: "chapter-1",
    title: "Course Overview",
    videoCount: 1,
    totalVideos: 12,
    duration: "28m",
  },
  {
    id: "chapter-2",
    title: "Curriculum",
    videoCount: 1,
    totalVideos: 12,
    duration: "1h 28m",
    lessons: [
      { title: "Installing Vue JS", duration: "8m", status: "current" },
      { title: "Understand Vue Components", duration: "58m", status: "completed" },
      { title: "Vue Templating", duration: "12m", status: "not-started" },
      { title: "Vue Forms", duration: "78m", status: "not-started" },
      { title: "Vue Styling", duration: "57m", status: "not-started" },
      { title: "Vue Routing", duration: "1h 30m", status: "not-started" },
      { title: "Vue Animation", duration: "1h 19m", status: "not-started" },
    ],
  },
  {
    id: "chapter-3",
    title: "Components",
    videoCount: 1,
    totalVideos: 12,
    lessons: [
      { title: "Installing Vue JS", duration: "8m", status: "current" },
      { title: "Understand Vue Components", duration: "58m", status: "completed" },
      { title: "Vue Templating", duration: "12m", status: "not-started" },
      { title: "Vue Forms", duration: "78m", status: "not-started" },
      { title: "Vue Styling", duration: "57m", status: "not-started" },
      { title: "Vue Routing", duration: "1h 30m", status: "not-started" },
      { title: "Vue Animation", duration: "1h 19m", status: "not-started" },
    ],
    duration: "1h 28m",
  },
  {
    id: "chapter-4",
    title: "Coding",
    videoCount: 1,
    totalVideos: 12,
    lessons: [
      { title: "Installing Vue JS", duration: "8m", status: "current" },
      { title: "Understand Vue Components", duration: "58m", status: "completed" },
      { title: "Vue Templating", duration: "12m", status: "not-started" },
      { title: "Vue Forms", duration: "78m", status: "not-started" },
      { title: "Vue Styling", duration: "57m", status: "not-started" },
      { title: "Vue Routing", duration: "1h 30m", status: "not-started" },
      { title: "Vue Animation", duration: "1h 19m", status: "not-started" },
    ],
    duration: "1h 28m",
  },
]

const StatusIndicator = ({ status }: { status: "current" | "completed" | "not-started" }) => {
  const getStatusColor = () => {
    switch (status) {
      case "current":
        return "fill-cyan-400"
      case "completed":
        return "fill-red-400"
      case "not-started":
        return "fill-gray-300"
      default:
        return "fill-gray-300"
    }
  }

  return (
    <div className="flex items-center justify-center w-8 h-8 p-2 rounded-full bg-popover-foreground/5">
        <Play size={18} strokeWidth={0} className={cn("", getStatusColor())} />
    </div>
  )
}

export default function CourseCurriculum() {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set(["chapter-2"]))

  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters)
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId)
    } else {
      newExpanded.add(chapterId)
    }
    setExpandedChapters(newExpanded)
  }

  return (
    <div className="w-full mt-4">
      {courseData.map((chapter) => {
        const isExpanded = expandedChapters.has(chapter.id)

        return (
          <div key={chapter.id} className="border-b border-popover-foreground/40 last:border-b-0">
            <button
              onClick={() => toggleChapter(chapter.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-popover-foreground/2 transition-colors cursor-pointer"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-popover-foreground/90 text-base mb-1">{chapter.title}</h3>
                <p className="text-sm text-popover-foreground/40">
                  {chapter.videoCount}/{chapter.totalVideos} Videos • {chapter.duration}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0">
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-popover-foreground/40" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-popover-foreground/40" />
                )}
              </div>
            </button>

            {isExpanded && chapter.lessons && (
              <div className="pb-2">
                {chapter.lessons.map((lesson, index) => (
                  <div key={index} className="flex items-center gap-3 px-4 py-2 hover:bg-popover/50 transition-colors cursor-pointer">
                    <StatusIndicator status={lesson.status} />
                    <div className="flex-1">
                      <p className="text-gray-700 text-sm font-medium">{lesson.title}</p>
                    </div>
                    <span className="text-xs text-gray-500 flex-shrink-0">{lesson.duration}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
