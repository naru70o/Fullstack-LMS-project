import React from 'react'

export const Filtering = () => {
  const studyFields = [
    { id: 0, name: "All Recommendations" },
    { id: 1, name: "Development" },
    { id: 2, name: "Design" },
    { id: 3, name: "Marketing" },
    { id: 4, name: "Data Science" },
    { id: 5, name: "Business" },
    { id: 6, name: "IT & Software" },
    { id: 7, name: "Personal Development" },
    { id: 8, name: "Photography" },
    { id: 9, name: "Music" },
    { id: 10, name: "Health & Fitness" },
    { id: 11, name: "Language Learning" },
    { id: 12, name: "Academic" },
  ];

  return (
    <section className='container mx-auto pt-40'>
      <div className='flex items-center justify-start gap-4 flex-nowrap overflow-x-auto scrollbar-hidden'>
        {studyFields.map((field) => (
          <button
            key={field.id}
            className='bg-popover text-nowrap text-popover-foreground/60 rounded-[12px] font-poppins py-2 px-4 border-1 border-[#3DCBB1]'
          >
            {field.name}
          </button>
        ))}
      </div>
    </section>
  )
}
