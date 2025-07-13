import React from 'react'
import {ArrowRightToLine} from 'lucide-react'

export const Banner = () => {
  return (
    <section className='bg-[var(--primary-color)] h-12 flex justify-center'>
        {/* containers */}
        <div className='flex items-center gap-1'>
            <p className='text-xl font-normal font-outfit text-black inline-block'>Paying by coupon? Enter your code ! </p>
            <p className='text-white font-outfit text-xl font-normal underline decoration-solid decoration-auto underline-offset-auto flex items-center gap-1 cursor-pointer hover:text-white/70 transition-all'>here <span><ArrowRightToLine className='translate-y-0.5' color='white' size={18} /></span></p>
        </div>
    </section>
    )
}
