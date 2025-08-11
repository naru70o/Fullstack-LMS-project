"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight,Play } from "lucide-react"
import { cn } from "@/components/lib/utils"
import { Course, Lecture } from "./feed"
import durationFormatterString from "@/components/util/durationFormatter"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

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

export default function CourseCurriculum({course}:{course:Course}) {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set(["chapter-2"]))
  const searchParam = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters)
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId)
    } else {
      newExpanded.add(chapterId)
    }
    setExpandedChapters(newExpanded)
  }

  const handlePlayVedio = (vedio:string) =>{
    const routeURL =  new URLSearchParams(searchParam)
    routeURL.set("vedio",vedio);
    router.replace(`${pathname}?${routeURL.toString()}`)
  }

  return (
    <div className="w-full mt-4">
      {course.modules.map((chapter) => {
        const isExpanded = expandedChapters.has(chapter._id)
        const moduleDuration = chapter.lectures.reduce((total, lecture) => total + lecture.duration, 0)
        return (
          <div key={chapter._id} className="border-b border-popover-foreground/40 last:border-b-0">
            <button
              onClick={() => toggleChapter(chapter._id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-popover-foreground/2 transition-colors cursor-pointer"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-popover-foreground/90 text-base mb-1">{chapter.title}</h3>
                <p className="text-sm text-popover-foreground/40">
                  {chapter.lectures.length} Videos • {durationFormatterString(moduleDuration)}
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

            {isExpanded && chapter.lectures && (
              <div className="pb-2">
                {chapter.lectures.map((lesson:Lecture) => (
                  <div onClick={()=>handlePlayVedio(lesson.url.videoUrl)} key={lesson._id} className="flex items-center gap-3 px-4 py-2 hover:bg-popover/50 transition-colors cursor-pointer">
                    <StatusIndicator status="not-started" />
                    <div className="flex-1">
                      <p className="text-gray-700 text-sm font-medium">{lesson.title}</p>
                    </div>
                    <span className="text-xs text-gray-500 flex-shrink-0">{durationFormatterString(lesson.duration)}</span>
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
