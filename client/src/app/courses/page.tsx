import { Feed } from "@/components/app/courses/_components/feed";
import { Filtering } from "@/components/app/courses/_components/filtering";
import { Banner } from "@/components/components/banner";
import Footer from "@/components/components/footer";
import { Hero } from "@/components/components/hero";
import { apiRoutes } from "@/components/lib/apiRoutes";

const Page = async function () {
  const data = await fetch(apiRoutes.courses.getAllCourses, {
    next: {
      revalidate: 60,
    },
  });

  const Sessionresponse = await fetch(apiRoutes.user.getUserSession, {
    next: {
      revalidate: 60,
    },
  });

  // await Sessionresponse.json();

  const response = await data.json();
  if (!data.ok) {
    return console.error("Failed to fetch courses:", data.statusText);
  }

  const courses = response.data.courses;
  console.log(courses);
  return (
    <>
      <Banner />
      <Hero />
      <Filtering />
      <Feed data={courses} />
      <Footer />
    </>
  );
};

export default Page;
