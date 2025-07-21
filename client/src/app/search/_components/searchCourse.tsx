"use client"

import { Button } from "@/components/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/components/ui/collapsible'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/components/ui/select"
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from "react"
import { CategoryFilter, DurationFilter, LanguageFilter, LevelFilter, RatingFilter, SoftwareFilter } from "../../../components/ratingFilter"

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
    rating: string[];
    duration: string[];
    categories: string[];
    level: string[];
    software: string[];
    language: string[];
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
  interface ExpandedSections {
    rating: boolean
    duration: boolean
    categories: boolean
    software: boolean
    level: boolean
    language: boolean
  }

  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    rating: true, 
    duration: true, 
    categories: true, 
    software: false, 
    level: true, 
    language: false, 
  })

  // to handle filter selection/deselection
  const handleFilterChange = (category: keyof SelectedFilters, value: string, checked: boolean) => {
    setSelectedFilters((prev) => ({
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

  console.log("Selected Filters:", selectedFilters)

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
          <Collapsible
            open={expandedSections.rating}
            onOpenChange={() => toggleSection("rating")}
          >
            {/* Section Header - Clickable to expand/collapse */}
            <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
              <h3 className="font-medium">Rating</h3>
              {/* Show up/down arrow based on expanded state */}
              {expandedSections.rating ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </CollapsibleTrigger>
            {/* Section Content - Only visible when expanded */}
            <CollapsibleContent className="mt-3 space-y-3">
              <RatingFilter
                filterData={filterData}
                selectedFilters={selectedFilters}
                handleFilterChange={handleFilterChange}
              />
            </CollapsibleContent>
          </Collapsible>
          {/* Video Duration Filter Section */}
          <DurationFilter
            expandedSections={expandedSections}
            toggleSection={toggleSection}
            filterData={filterData}
            selectedFilters={selectedFilters}
            handleFilterChange={handleFilterChange}
          />

          {/* Categories Filter Section */}
          <CategoryFilter
            expandedSections={expandedSections}
            toggleSection={toggleSection}
            filterData={filterData}
            selectedFilters={selectedFilters}
            handleFilterChange={handleFilterChange}
          />

          {/* Software Filter Section - Currently empty/placeholder */}
          <SoftwareFilter
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />

          {/* Level Filter Section */}
          <LevelFilter
            expandedSections={expandedSections}
            toggleSection={toggleSection}
            filterData={filterData}
            selectedFilters={selectedFilters}
            handleFilterChange={handleFilterChange}
          />

          {/* Language Filter Section - Currently empty/placeholder */}
          <LanguageFilter
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
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
