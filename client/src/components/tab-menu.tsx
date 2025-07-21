"use client"
import React, { useState } from 'react'
import { Reviews } from '../app/courses/_components/reviews';
import CourseCurriculum from '../app/courses/_components/modules';

export const TabMenu = () => {
    const [tabMenu,setTabMenu]= useState("reviews");

    const HandleTabMenus = (tab:string)=>{
      setTabMenu(tab);
    } 

  return (
    <>
    <div className="flex justify-start gap-4 mt-6 text-popover-foreground/80">
      <button className={`${tabMenu === "reviews" && " underline underline-offset-4 decoration-3 decoration-[var(--primary-color)]"} hover:text-popover-foreground/50 transition-all cursor-pointer`} onClick={()=>HandleTabMenus("reviews")}>
        reviews
      </button>
      <button className={`${tabMenu === "course" && " underline underline-offset-4 decoration-3 decoration-[var(--primary-color)]"} hover:text-popover-foreground/50 transition-all cursor-pointer`} onClick={()=>HandleTabMenus("course")}>
        Course
      </button>
    </div>
    {
      tabMenu === "reviews" && <Reviews/>
    }
    {
      tabMenu === "course" && <CourseCurriculum/>
    }
    </>
  )
}
