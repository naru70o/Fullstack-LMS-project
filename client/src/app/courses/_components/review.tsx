import { RenderStars } from '@/components/components/renderStars'
import Image from 'next/image'
import React from 'react'

export const Review = () => {
  return (
    <div className='flex flex-col gap-4 p-4 rounded-xl bg-popover border border-popover-foreground/30 max-w-2xl'>
        <div className='flex items-start gap-3'>
            <div className='w-12 h-12 rounded-full relative flex-shrink-0'>
                <Image alt='user profile' src="https://images.pexels.com/photos/2693814/pexels-photo-2693814.jpeg?cs=srgb&dl=pexels-pppsdavid-2693814.jpg&fm=jpg&w=1280&h=1280&_gl=1*hc3eb5*_ga*NjYyNTgyNDczLjE3NTI1NjUxOTI.*_ga_8JE65Q40S6*czE3NTMwMTczOTUkbzIkZzEkdDE3NTMwMTc0NDMkajEyJGwwJGgw" fill className="absolute w-full h-full object-cover rounded-full" />
            </div>
            <div className='flex flex-col'>
                <div className='flex items-center'>
                    <p className='text-sm font-bold font-poppins text-popover-foreground'>Joe Doe</p>
                    <p className='text-[var(--primary-color)]'>~</p>
                    <p className='text-xs text-popover-foreground/60'>2 days ago</p>    
                </div>
                <div className='flex items-center gap-1'>
                <RenderStars rating={4.5}/>
                </div>
                {/* Testimonial */}
            </div>
        </div>
        <p className='text-sm text-popover-foreground/80 mt-1'>
            This course was fantastic! The instructor was clear, concise, and the projects were very helpful for applying the concepts. I feel much more confident in my skills now. Highly recommended!
        </p>
    </div>
  )
}
