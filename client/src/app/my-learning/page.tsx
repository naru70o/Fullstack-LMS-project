import { NavigationFixed } from '@/components/components/navigation'
import React from 'react'
import { courses } from '@/components/util/damydata'
import { CircleUser } from 'lucide-react'
import Image from 'next/image'

function Card (){
    return (
      <>
        {courses.map((course) => (
          <div key={course._id} className='flex flex-col gap-1 text-card-foreground rounded-lg min-w-[285px] max-w-[285px] overflow-hidden relative'>
            {/* badge / best seller */}
            <div className='absolute top-2 left-2 bg-[#EADB36] text-black/70 text-xs font-bold py-1 px-2 rounded-lg z-10'>Best Seller</div>
            {/* Thumbnail */}
            <div className='h-[161px] w-full relative'>
              <Image src={course.thumbnail.secure_url} alt="Thumbnail" fill className='absolute w-full h-full object-cover rounded-lg' />
            </div>
            <h2 className='text-lg font-bold text-popover-foreground leading-7'>{(course.title).toUpperCase()}</h2> 
            <p className='flex items-center gap-1 text-sm text-popover-foreground/40'><span><CircleUser/></span> {course.instructor}</p>
            {/* progress bar with course completion */}
            <div className=''>
              {/* Progress bar component can be added here */}
              <div className='h-1 bg-gray-200 rounded-lg overflow-hidden'>
                <div className='h-full bg-green-500' style={{ width: '70%' }}></div>
              </div>
            </div>
            {/* <ProgressBar completed={70} /> */}
            <div className='flex items-center gap-3'>
              <p className='text-sm text-popover-foreground/60'>70%</p>
              <p className='text-sm text-popover-foreground/60'>Completed</p>
            </div>
          </div>
        ))}
      </>
    )
}

const Page = () => {
  return (
    <>
    <NavigationFixed/>
    <div className='container mx-auto mt-[var(--margin-section-top)]'>
      <h1 className='text-2xl font-bold text-center text-popover-foreground'>My Learning</h1>
      {/* select buttons */}
      <div className='flex justify-center gap-4 mt-6 text-popover-foreground/80'>
        <h1 className='underline underline-offset-4 decoration-3 decoration-[var(--primary-color)] hover:text-popover-foreground/50 transition-all cursor-pointer'>All Courses</h1>
        <h1 className='hover:text-popover-foreground/50 transition-all cursor-pointer'>Wishlist</h1>
        <h1 className='hover:text-popover-foreground/50 transition-all cursor-pointer'>Completed</h1>
      </div>
      <p className='text-center text-popover-foreground/50 mt-2'>Here you can find your enrolled courses and track your progress.</p>
      {/* Add your content here */}
    </div>
    <div className='container mx-auto mt-10'>
      <h2 className='text-xl font-semibold'>Enrolled Courses</h2>
      <p className='text-start text-popover-foreground/50'>List of your courses</p>
      {/* List of enrolled courses will go here */}
      {Card ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6'>
          <Card />
        </div>
      ) : (
        <p className='text-center text-popover-foreground/50'>You have no enrolled courses yet.</p>
      )}
      
      </div>
    </>
  )
}

export default Page