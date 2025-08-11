import { Banner } from '@/components/components/banner';
import { NavigationFixed } from '@/components/components/navigation';
import { TabMenu } from '@/components/components/tab-menu';
import Example from '@/components/components/vedioPlayer';
import { Course } from '../_components/feed';
import Block from '../_components/purchaseCard';

const Page = async ({params}: {params: Promise<{IdCourse: string}>}) => {
    // Await the params to get the course ID
    const {IdCourse} = await params;
    console.log(IdCourse)
    const response = await fetch(`http://localhost:3000/api/v1/course/${IdCourse}`,{
    next:{
      revalidate: 60,
    }
  });
    
    const {data,message} = await response.json();
    console.log("from dynamic route",message,data)
    const course: Course = data
     
    return (
    <>
    <Banner/>
    <NavigationFixed/>
    <section className='container mx-auto py-[60px]'>
        {/* container */}
        <div className='grid grid-cols-3 gap-4 justify-between content-start items-center relative'>
            {/* course */}
            <div className='grid-cols-1 col-span-2 flex flex-col justify-start'>
                {/* course Video */}
                <Example/>
                {/* course title */}
                <h1 className='text-lg font-bold text-popover-foreground leading-7'>{course?.title}</h1>
                {/* course description */}
                <p className='text-sm text-popover-foreground/60 mt-2'>{course?.description}</p>
                {/* reviews and course modules */}
                <TabMenu data={course}/>
                {/* <Reviews/> */}
            </div>
            {/* Block for puying the course */}
            <Block course={course}/>
        </div>
    </section>
    </>
  )
}

export default Page;
