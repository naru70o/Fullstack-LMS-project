import { CircleUser } from 'lucide-react'
import Star from "@/components/../public/assets/Star.svg"
import Image from 'next/image'
import React from 'react'
import { courses } from '../util/damydata'

function Card (){
    return (
      <>
        {courses.map((course) => (
          <div key={course._id} className='bg-card text-card-foreground rounded-lg min-w-[285px] max-w-[285px] overflow-hidden relative'>
            {/* badge / best seller */}
            <div className='absolute top-2 left-2 bg-[#EADB36] text-black/70 text-xs font-bold py-1 px-2 rounded-lg z-10'>Best Seller</div>
            {/* Thumbnail */}
            <div className='h-[161px] w-full relative'>
              <Image src={course.thumbnail.secure_url} alt="Thumbnail" fill className='absolute w-full h-full object-cover rounded-lg' />
            </div>
            <h2 className='text-lg font-bold text-popover-foreground leading-7'>{(course.title).toUpperCase()}</h2> 
            <p className='flex items-center gap-1 text-sm text-popover-foreground/40'><span><CircleUser/></span> {course.instructor}</p>
            <div className='flex items-center'>
              {[...Array(5)].map((_, index) => (
                <Star key={index} />
              ))}
              <span className='text-sm text-popover-foreground/60'>({course.numberOfLectures})</span>
            </div>
            {/* price */}
            <div className='flex items-center justify-start gap-4'>
              {/* current Price */}
              <p className='text-lg font-bold text-popover-foreground'>${course.price.current}</p>
              {/* original Price */}
              <p className='text-sm text-popover-foreground/60 line-through'>${course.price.original}</p>
            </div>
          </div>
        ))}
      </>
    )
}

export const Feed = () => {
  return (
    <section className='container mx-auto py-[60px]'>
      <h2 className='text-popover-foreground font-poppins text-xl font-bold leading-[26px]'>Here are your personalized recommendations</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8'>
    <Card/>
      </div>
    </section>
  )
}
