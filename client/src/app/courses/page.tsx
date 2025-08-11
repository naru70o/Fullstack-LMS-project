import { Feed } from '@/components/app/courses/_components/feed';
import { Filtering } from '@/components/app/courses/_components/filtering';
import { Banner } from '@/components/components/banner';
import Footer from '@/components/components/footer';
import { Hero } from '@/components/components/hero';

const Page = async () => {
  const data = await fetch('http://localhost:3000/api/v1/course', {
    next:{
      revalidate: 60,
    }
  });
  const response = await data.json();
  const courses = response.data.courses
  console.log(courses);
    return (
      <>
      <Banner/>
      <Hero/>
      <Filtering/>
      <Feed data={courses}/>
      <Footer/>
      </>
    );
}

export default Page;
