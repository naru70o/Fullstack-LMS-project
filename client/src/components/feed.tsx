import { CircleUser } from 'lucide-react'
import Star from "@/components/../public/assets/Star.svg"
import Image from 'next/image'
import React from 'react'

function Card (){
    return (
        <div className='bg-card text-card-foreground rounded-lg min-w-[285px] max-w-[285px] overflow-hidden'>
            <div className='h-[161px] w-full relative mt-6'>
            <Image src="/assets/Thumbnail.jpg" alt="Thumbnail" fill className='absolute w-full h-full object-cover rounded-lg' />

            </div>
            <h2 className='text-xl font-bold text-popover-foreground'>VUE JS SCRATCH COURSE</h2> 
            <p className='flex items-center gap-1 text-sm text-popover-foreground/40'><span><CircleUser/></span> naruto</p>
            <div className='flex items-center'>
                <Star className='' />
                <Star className='' />
                <Star className='' />
                <Star className='' />
                <Star className='' />
                <span className='text-sm text-popover-foreground/60'>(1000)</span>
            </div>
            {/* price */}
            <div className='flex items-center justify-start gap-4'>
                {/* current Price */}
                <p className='text-lg font-bold text-popover-foreground'>$99.99</p>
                {/* original Price */}
                <p className='text-sm text-popover-foreground/60 line-through'>$199.99</p>
            </div>
        </div>
    )
}

export const Feed = () => {
  return (
    <section className='container mx-auto py-[60px]'>
      <h2 className='text-popover-foreground font-poppins text-xl font-bold leading-[26px]'>Here are your personalized recommendations</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8'>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
      </div>
    </section>
  )
}
