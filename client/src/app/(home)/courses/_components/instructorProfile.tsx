'use client'
import Image from "next/image"
import { Star, MessageSquare, Users, BookOpen} from "lucide-react"
import { useState } from "react"
import ShowMore from "./showMore"

export default function InstructorProfile() {
    const [showMore,setShowmore]=useState(false)
    const description="Eric J. Roby is a full stack developer that has worked in the freelance and corporate world solving technical problems to bridge gaps in businesses.Eric made his technical debut when he began learning Java at the age of 14. Since learning Java, Eric has found himself completely addicted with learning technologies.You can have full confidence that Eric's courses are of exceptional quality, and that you can be a software developer if you choose so."

    console.log(showMore)
  return (
    <div className="py-6 px-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructors</h2>

      <div className="space-y-6">
        {/* Instructor Header */}
        <div>
          <h3 className="text-xl font-semibold text-primary mb-1">Eric Roby</h3>
          <p className="text-foreground/70">Engineer</p>
        </div>

        {/* Profile Section */}
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <Image
              src="https://images.pexels.com/photos/2693814/pexels-photo-2693814.jpeg?cs=srgb&dl=pexels-pppsdavid-2693814.jpg&fm=jpg&w=1280&h=1280&_gl=1*hc3eb5*_ga*NjYyNTgyNDczLjE3NTI1NjUxOTI.*_ga_8JE65Q40S6*czE3NTMwMTczOTUkbzIkZzEkdDE3NTMwMTc0NDMkajEyJGwwJGgw"
              alt="Eric Roby profile picture"
              width={120}
              height={120}
              className="rounded-full object-cover"
            />
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2 text-sm text-foreground/70">
              <Star className="w-4 h-4 fill-current text-yellow-500" />
              <span className="font-medium">4.6 Instructor Rating</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-foreground/70">
              <MessageSquare className="w-4 h-4" />
              <span>16,988 Reviews</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-foreground/70">
              <Users className="w-4 h-4" />
              <span>145,635 Students</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-foreground/70">
              <BookOpen className="w-4 h-4" />
              <span>10 Courses</span>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="max-w-3xl space-y-4 text-sm text-foreground leading-relaxed">
            {showMore === false ? (<p>{description.slice(0,500)}</p>) : (<p>{description}</p>)}
        </div>

        {/* Show More Button */}
        <ShowMore onHandleShowMore={setShowmore} showMore={showMore}/>
      </div>
    </div>
  )
}

