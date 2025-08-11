import { Button } from '@/components/components/ui/button'
import { ChevronDown } from 'lucide-react'
import React from 'react'
import { cn } from '@/components/lib/utils'

type ShowMoreProps = {
    onHandleShowMore: (value: React.SetStateAction<boolean>) => void;
    showMore: boolean;
}

export default function ShowMore({onHandleShowMore,showMore}: ShowMoreProps) {

    const handleShowMore = () => {
        onHandleShowMore(()=>!showMore);
    }

  return (
 <Button onClick={handleShowMore} variant="primary" size="sm" className="py-2 min-w-[150px] h-auto cursor-pointer">
          {showMore ? "Show less" : "Show more"}
          <ChevronDown className={cn("w-4 h-4 ml-1 transition-transform", {
            "rotate-180": !showMore
          })} />
 </Button>
 )
}

