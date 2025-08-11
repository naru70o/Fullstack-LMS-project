import { Banner } from '@/components/components/banner';
import { NavigationFixed } from '@/components/components/navigation';
import { TabMenu } from '@/components/components/tab-menu';
import Example from '@/components/components/vedioPlayer';
import { Course, Lecture } from '../_components/feed';
import Block from '../_components/purchaseCard';
import InstructorProfile from '../_components/instructorProfile';

const Page = async ({params, searchParams}: {params: Promise<{IdCourse: string}>, searchParams: Promise<{ vedio: string }>}) => {
    const { IdCourse } = await params;
    const { vedio } = await searchParams;
    console.log(IdCourse, vedio)
    const response = await fetch(`http://localhost:3000/api/v1/course/${IdCourse}`,{
    next:{
      revalidate: 60,
    }
  });
    
    const {data,message} = await response.json();
    const course: Course = data
    console.log("from dynamic route",message,data)

    const previewLecture = course.modules
  .flatMap(m => m.lectures)   // merge all lectures into one array
  .find(l => l.isPreview === true);
  console.log(previewLecture)

  const videoUrl = previewLecture ? (previewLecture as Lecture)?.url?.videoUrl : undefined;

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
                <Example video={vedio || videoUrl}/>
                {/* course title */}
                <h1 className='text-lg font-bold text-popover-foreground leading-7'>{course?.title}</h1>
                {/* course description */}
                <p className='text-sm text-popover-foreground/60 mt-2'>{course?.description}</p>
                {/* reviews and course modules */}
                <TabMenu data={course}/>
                {/* Instructor info */}
                <InstructorProfile/>
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
