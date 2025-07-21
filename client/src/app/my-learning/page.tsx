import { NavigationFixed } from '@/components/components/navigation'
import { Card } from './_components/card'

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