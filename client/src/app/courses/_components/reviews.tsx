"use client"
import { RatingFilter } from '@/components/components/ratingFilter'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/components/ui/collapsible';
import { filterData } from '@/components/util/damydata'
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react'
import { Review } from './review';

interface SelectedFilters {
    rating: string[];
    duration?: string[];
    categories?: string[];
    level?: string[];
    software?: string[];
    language?: string[];
}

export const Reviews = () => {
    const [expanded,setExpanded]=useState(true);
    const [selectedFilters,setSelectedFilters] = useState<SelectedFilters>({
        rating:[],
    })

    // handle select filters
    const handleFilterChange = (category: keyof SelectedFilters, value: string, checked: boolean) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [category]: checked
                ? [...prev[category] || [], value]
                : prev[category]?.filter((item) => item !== value),
        }    
     ))
    }

    console.log(selectedFilters);


    function toggleFilter () {
        setExpanded(!expanded);
    }

  return (
    <div className='flex flex-col gap-4 mt-2'>
        <Collapsible
            open={expanded}
            onOpenChange={() => toggleFilter()}
          >
            {/* Section Header - Clickable to expand/collapse */}
            <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
              <h3 className="font-medium">Filter by rating</h3>
              {/* Show up/down arrow based on expanded state */}
              {expanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent>
                <RatingFilter filterData={filterData} selectedFilters={selectedFilters} handleFilterChange={handleFilterChange}/>
            </CollapsibleContent>
         </Collapsible>   
        {/* reviews */}
        <Review/>
    </div>
  )
}
