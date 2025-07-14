import React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/components/ui/select"

import {Button} from "@/components/components/ui/button"
import Link from 'next/link';

interface SelectDemoProps {
    selectItems?: string[];
    selectLabel?: string; 
    selectPlaceholder?: string;
}

export function SelectInput({ selectItems, selectLabel, selectPlaceholder }: SelectDemoProps) {
  return (
    <Select>
      <SelectTrigger size='lg' className="bg-[var(--input-bg-color)] w-[248px] max-w-md p-4 h-[50px] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-[var(--input-text-color)] font-poppins text-[16px] font-normal leading-[24px] border-none" >
        <SelectValue placeholder={selectPlaceholder} className=''/>
      </SelectTrigger>
      <SelectContent className='bg-[var(--input-bg-color)] text-[var(--input-text-color)] font-poppins text-[16px] font-normal leading-[24px]'>
        <SelectGroup>
          <SelectLabel>{selectLabel}</SelectLabel>
            {selectItems?.map((item, index) => (
                <SelectItem key={index} value={item.toLowerCase()}>
                {item}
                </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export const HeroSearchBar = () => {
  return (
    <div className='absolute container mx-auto flex flex-col gap-4 p-8 justify-center bottom-0 translate-y-1/2 bg-white rounded-3xl shadow-[var(--shadow-search-bar)]'>
        <h1 className='text-black text-center font-poppins text-xl not-italic font-bold leading-[30px]'>What do you want to learn?</h1>

        {/* inputs and button */}
        <div className='flex items-center justify-center gap-2'>
        <input
        type="text"
        placeholder="Find courses, skills, software, etc"
        className="bg-[var(--input-bg-color)] w-full max-w-md p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-[var(--input-text-color)] font-poppins text-[16px] font-normal leading-[24px]"
        />
        <SelectInput selectItems={['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple']} selectLabel="Categories" selectPlaceholder="Select a fruit" />
        <Button size="lg"  variant="primary"><Link href="/" className='px-4'>Search</Link></Button>
        </div>
    </div>
  )
}
