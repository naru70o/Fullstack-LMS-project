"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/components/ui/button"
import { Checkbox } from "@/components/components/ui/checkbox"
import { Label } from "@/components/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/components/ui/collapsible"
import Star from "@/components/../public/assets/Star.svg"
import Image from "next/image"


// Filter options data
interface FilterOption {
  value: string
  label: string
  count?: string
}

interface FilterData {
  rating: FilterOption[]
  duration: FilterOption[]
  categories: FilterOption[]
  level: FilterOption[]
}

const filterData: FilterData = {
  rating: [
    { value: "4.5", label: "4.5 & up", count: "5.8K" },
    { value: "3.5", label: "3.5 & up", count: "1.2K" },
    { value: "3.0", label: "3.0 & up", count: "867" },
    { value: "1.5", label: "1.5 & up", count: "256" },
  ],
  duration: [
    { value: "0-2", label: "0-2 hours", count: "9.4K" },
    { value: "3-5", label: "3-5 Hours", count: "4.1K" },
    { value: "6-12", label: "6-12 Hours", count: "3.8K" },
    { value: "12+", label: "12+ Hours", count: "1K" },
  ],
  categories: [
    { value: "design", label: "Design", count: "3.2K" },
    { value: "programming", label: "Programming", count: "1.4K" },
    { value: "business", label: "Business & Marketing", count: "809" },
    { value: "finance", label: "Finance", count: "548" },
    { value: "music", label: "Music & Film", count: "1.9K" },
    { value: "photo", label: "Photo & Video", count: "2.3K" },
    { value: "writing", label: "Writing", count: "753" },
  ],
  level: [
    { value: "all", label: "All Levels" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ],
}

export default function CourseFilters() {
  // State to track which filters are currently selected
  interface SelectedFilters {
    rating: string[]
    duration: string[]
    categories: string[]
    level: string[]
    software: string[]
    language: string[]
  }

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    rating: [], 
    duration: ["0-2"], 
    categories: ["design"], 
    level: ["beginner"], 
    software: [],
    language: [], 
  })

  // State to control which filter sections are expanded/collapsed
  const [expandedSections, setExpandedSections] = useState({
    rating: true, 
    duration: true, 
    categories: true, 
    software: false, 
    level: true, 
    language: false, 
  })

  // to handle filter selection/deselection
  const handleFilterChange = (category: keyof SelectedFilters, value: string, checked: boolean) => {
    setSelectedFilters((prev: SelectedFilters) => ({
      ...prev,
      // If checked is true, add the value to the array
      // If checked is false, remove the value from the array
      [category]: checked
        ? [...prev[category], value] // Add value to existing array
        : prev[category].filter((item) => item !== value), // Remove value from array
    }))
  }

  // Function to clear all selected filters
  const clearFilters = () => {
    setSelectedFilters({
      rating: [],
      duration: [],
      categories: [],
      level: [],
      software: [],
      language: [],
    })
  }

  // Function to toggle the expanded/collapsed state of filter sections
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section], // Flip the boolean value
    }))
  }

  // Function to render star rating display
  const renderStars = (rating:number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div key={i} className="w-4 h-4 relative">
        {/* If the current index is less than the integer part of the rating, show a full star */}
        {i < Math.floor(rating) ? (
          <Image src="/assets/Star.svg" alt='Star' className="absolute w-full h-full" fill />
        ) 
        // If the current index matches the fractional part of the rating, show a half star
        : i === Math.floor(rating) && rating - Math.floor(rating) >= 0.1 ? (
          <Image src="/assets/HalfStar.svg" alt='Half Star' className="absolute w-full h-full" fill />
        )
        // Otherwise, render nothing for empty stars
        : null}
      </div>
    ))
  }

  return (
    <div className="flex min-h-screen mt-[var(--margin-section-top)] container mx-auto font-poppins">
      {/* Sidebar Filters - Left side panel containing all filter options */}
      <div className="w-80p-6 border-r border-popover-foreground/10 p-6">
        {/* Filter Header - Contains title and clear button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Filter</h2>
          {/* Clear button - calls clearFilters function when clicked */}
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-popover-foreground/60 hover:text-popover-foreground/80">
            Clear
          </Button>
        </div>

        {/* Filter Sections Container */}
        <div className="space-y-6">
          {/* Rating Filter Section */}
          <Collapsible open={expandedSections.rating} onOpenChange={() => toggleSection("rating")}>
            {/* Section Header - Clickable to expand/collapse */}
            <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
              <h3 className="font-medium">Rating</h3>
              {/* Show up/down arrow based on expanded state */}
              {expandedSections.rating ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            {/* Section Content - Only visible when expanded */}
            <CollapsibleContent className="mt-3 space-y-3">
              {/* Map through rating options and create checkboxes */}
              {filterData.rating.map((item) => (
                <div key={item.value} className="flex items-center space-x-2">
                  {/* Checkbox - controlled by selectedFilters state */}
                  <Checkbox
                    id={`rating-${item.value}`}
                    checked={selectedFilters.rating.includes(item.value)}
                    onCheckedChange={(checked: boolean) => handleFilterChange("rating", item.value, checked)}
                  />
                  {/* Label with star display and count */}
                  <Label htmlFor={`rating-${item.value}`} className="flex items-center space-x-2 cursor-pointer">
                    <div className="flex items-center space-x-1">{renderStars(Number.parseFloat(item.value))}</div>
                    <span className="text-sm">
                      {item.label} ({item.count})
                    </span>
                  </Label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Video Duration Filter Section */}
          <Collapsible open={expandedSections.duration} onOpenChange={() => toggleSection("duration")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
              <h3 className="font-medium">Video Duration</h3>
              {expandedSections.duration ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 space-y-3">
              {/* Map through duration options */}
              {filterData.duration.map((item) => (
                <div key={item.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`duration-${item.value}`}
                    checked={selectedFilters.duration.includes(item.value)}
                    onCheckedChange={(checked: boolean) => handleFilterChange("duration", item.value, checked)}
                  />
                  <Label htmlFor={`duration-${item.value}`} className="cursor-pointer text-sm">
                    {item.label} ({item.count})
                  </Label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Categories Filter Section */}
          <Collapsible open={expandedSections.categories} onOpenChange={() => toggleSection("categories")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
              <h3 className="font-medium">Categories</h3>
              {expandedSections.categories ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 space-y-3">
              {/* Map through category options */}
              {filterData.categories.map((item) => (
                <div key={item.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${item.value}`}
                    checked={selectedFilters.categories.includes(item.value)}
                    onCheckedChange={(checked: boolean) => handleFilterChange("categories", item.value, checked)}
                  />
                  <Label htmlFor={`category-${item.value}`} className="cursor-pointer text-sm">
                    {item.label} ({item.count})
                  </Label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Software Filter Section - Currently empty/placeholder */}
          <Collapsible open={expandedSections.software} onOpenChange={() => toggleSection("software")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
              <h3 className="font-medium">Software</h3>
              {expandedSections.software ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 space-y-3">
              <p className="text-sm text-gray-500">No software filters available</p>
            </CollapsibleContent>
          </Collapsible>

          {/* Level Filter Section */}
          <Collapsible open={expandedSections.level} onOpenChange={() => toggleSection("level")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
              <h3 className="font-medium">Level</h3>
              {expandedSections.level ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 space-y-3">
              {/* Map through level options */}
              {filterData.level.map((item) => (
                <div key={item.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`level-${item.value}`}
                    checked={selectedFilters.level.includes(item.value)}
                    onCheckedChange={(checked: boolean) => handleFilterChange("level", item.value, checked)}
                  />
                  <Label htmlFor={`level-${item.value}`} className="cursor-pointer text-sm">
                    {item.label}
                  </Label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Language Filter Section - Currently empty/placeholder */}
          <Collapsible open={expandedSections.language} onOpenChange={() => toggleSection("language")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
              <h3 className="font-medium">Language</h3>
              {expandedSections.language ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 space-y-3">
              <p className="text-sm text-popover-foreground/40">No language filters available</p>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>

      {/* Main Content Area - Right side containing course results */}
      <div className="flex-1 p-6">
        {/* Results Header - Shows count and sort options */}
        <div className="flex items-center justify-between mb-6">
          {/* Results count display */}
          <div>
            <p className="text-popover-foreground/70 text-sm">
              Showing 2,312 results of <span className="font-semibold">UI Design</span>
            </p>
          </div>
          {/* Sort dropdown */}
          <Select defaultValue="popular">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Course Grid - Responsive grid layout for course cards */}
       

        {/* Pagination Section */}
    
      </div>
    </div>
  )
}
