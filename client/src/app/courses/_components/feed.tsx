import { CircleUser } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type User = {
  changedPasswordAt: Date;
  createdAt: Date;
  email: string;
  enrolledCourses: any[]; // Consider using a more specific type if you know the course structure
  id: string;
  lastActive: Date;
  name: string;
  passwordChangedAt: Date;
  profile: string;
  role: string;
  roles: string[];
  updatedAt: Date;
  __v: number;
  _id: string;
};

export type Lecture = {
  _id: string;
  id: string; // Again, duplicate of _id
  url: {
    videoUrl: string;
    secureUrl: string;
  };
  title: string;
  description: string;
  moduleId: string; // Reference to parent module
  instructor: string; // User ID of instructor
  duration: number; // in seconds
  publicId: string; // Cloudinary public ID
  isPreview: boolean;
  order: number;
  questions: Question[]; // Empty array in examples, typed for future use
  createdAt: string | Date;
  updatedAt: string | Date;
  __v: number;
};

type Modules = {
  _id: string;
  title: string;
  optional: boolean;
  description: string;
  course: string;
  lectures: Lecture[];
  order: number;
  __v: number;
};

// Placeholder for question type (empty in your data)
type Question = {
  // Define based on your actual question structure
  _id?: string;
  questionText?: string;
  options?: string[];
  correctAnswer?: string;
  // ... other question fields
};

export type Course = {
  _id: string;
  category: string[];
  description: string;
  isPublished: boolean;
  secureUrl: string;
  level: string[];
  modules: Modules[];
  title: string;
  instructor: User;
  rating: number;
  numberOfLectures: number;
  totalOfHours: number;
  // price: {
  //   current: number;
  //   original: number;
  // };
  thumbnail: {
    secure_url: string;
  };
};

function Card({ courses }: { courses: Course[] }) {
  console.log(courses);
  return (
    <>
      {courses.map((course: Course) => (
        <Link
          href={`/courses/${course._id}`}
          className='no-underline'
          key={course._id}
        >
          <div
            key={course._id}
            className='bg-card text-card-foreground rounded-lg min-w-[285px] max-w-[285px] overflow-hidden relative'
          >
            {/* badge / best seller */}
            <div className='absolute top-2 left-2 bg-[#EADB36] text-black/70 text-xs font-bold py-1 px-2 rounded-lg z-10'>
              Best Seller
            </div>
            {/* Thumbnail */}
            <div className='h-[161px] w-full relative'>
              <Image
                src={course.secureUrl}
                alt='Thumbnail'
                fill
                className='absolute w-full h-full object-cover rounded-lg'
              />
            </div>
            <h2 className='text-lg font-bold text-popover-foreground leading-7'>
              {course.title.toUpperCase()}
            </h2>
            <p className='flex items-center gap-1 text-sm text-popover-foreground/40'>
              <span>
                <CircleUser />
              </span>
              {course.instructor.name}{" "}
            </p>
            <div className='flex items-center gap-1'>
              {[...Array(5)].map((_, index) => {
                if (course.rating >= index + 1) {
                  return (
                    <div className='w-4 h-4 relative' key={index}>
                      <Image
                        src='/assets/Star.svg'
                        alt='Star'
                        className='absolute w-full h-full'
                        fill
                      />
                    </div>
                  );
                } else if (course.rating > index && course.rating < index + 1) {
                  return (
                    <div className='w-4 h-4 relative' key={index}>
                      <Image
                        src='/assets/HalfStar.svg'
                        alt='Half Star'
                        className='absolute w-fit h-fit'
                        fill
                      />
                    </div>
                  );
                } else {
                  return (
                    <div className='w-4 h-4 relative' key={index}>
                      <Image
                        src='/assets/Star.svg'
                        alt='Star'
                        className='absolute w-full h-full'
                        fill
                      />
                    </div>
                  );
                }
              })}
              <span className='text-sm text-popover-foreground/60'>
                ({course.numberOfLectures})
              </span>
            </div>
            {/* price */}
            <div className='flex items-center justify-start gap-4'>
              {/* current Price */}
              <p className='text-lg font-bold text-popover-foreground'>$90</p>
              {/* original Price */}
              <p className='text-sm text-popover-foreground/60 line-through'>
                $120
              </p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

export const Feed = ({ data }: { data: Course[] }) => {
  return (
    <section className='container mx-auto py-[60px]'>
      <h2 className='text-popover-foreground font-poppins text-xl font-bold leading-[26px]'>
        Here are your personalized recommendations
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8'>
        <Card courses={data} />
      </div>
    </section>
  );
};
