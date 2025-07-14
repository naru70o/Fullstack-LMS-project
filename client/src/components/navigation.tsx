import React from 'react'
import LogoNav from "@/components/../public/assets/logoNav.svg"
import {ChevronRight} from "lucide-react"
import Link from 'next/link'

export const Navigation = () => {
  return (
    <section className='container mx-auto my-5'>
        <div className='flex items-center justify-between '>
            <div className='flex items-center gap-12'>
              <Link href="#">
                <LogoNav/>
              </Link>
                <button className="flex items-center text-[var(--primary-color)] font-poppins text-[16px] not-italic font-normal leading-[21px] bg-transparent cursor-pointer hover:text-[var(--primary-color)]/70 transition-all"><span>Browse</span><ChevronRight/></button>
            </div>
            <div className='flex items-center gap-5'>
                <button className="text-xl py-3 px-8 rounded-[8px] text-center bg-[var(--primary-color)] text-white font-bold">Sign Up</button>
                <button className="text-xl py-3 px-8 rounded-[8px] text-center transparent border-2 border-[var(--primary-color)] text-[var(--primary-color)] font-bold">Login</button>
            </div>
        </div>
    </section>
  )
}
