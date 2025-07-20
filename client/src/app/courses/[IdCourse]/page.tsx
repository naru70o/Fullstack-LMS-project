import { Banner } from '@/components/components/banner';
import { NavigationFixed } from '@/components/components/navigation';
import { courses } from "@/components/util/damydata";
import { Reviews } from '../_components/reviews';

const Page = async ({params}: {params: Promise<{IdCourse: string}>}) => {
    // Await the params to get the course ID
    const courseId = await params;
    const course = courses.find(course => course._id === courseId.IdCourse);
    console.log(course);
    return (
    <>
    <Banner/>
    <NavigationFixed/>
    <section className='container mx-auto py-[60px]'>
        {/* container */}
        <div className='grid grid-cols-3 gap-4 justify-between items-center'>
            {/* course */}
            <div className='grid-cols-1 col-span-2 flex flex-col justify-start'>
                {/* course Video */}
                <div className='w-full h-[400px] bg-gray-200 rounded-lg mb-4'>
                    {/* Placeholder for video player */}
                    <p className='text-center text-gray-500 pt-16'>Video Player Placeholder</p>
                </div>
                {/* course title */}
                <h1 className='text-lg font-bold text-popover-foreground leading-7'>{course?.title}</h1>
                {/* course description */}
                <p className='text-sm text-popover-foreground/60 mt-2'>{course?.description}</p>
                {/* reviews and course modules */}
                <div className="flex justify-start gap-4 mt-6 text-popover-foreground/80">
                    <h1 className="underline underline-offset-4 decoration-3 decoration-[var(--primary-color)] hover:text-popover-foreground/50 transition-all cursor-pointer">
                        reviews
                    </h1>
                    <h1 className="hover:text-popover-foreground/50 transition-all cursor-pointer">
                        Course
                    </h1> 
                </div>
                <Reviews/>
            </div>
        </div>
    </section>
    </>
  )
}

export default Page;