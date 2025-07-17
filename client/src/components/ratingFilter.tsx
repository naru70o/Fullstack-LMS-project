import React from 'react'
import { Collapsible,CollapsibleTrigger,CollapsibleContent } from './ui/collapsible'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { ChevronDown, ChevronUp } from 'lucide-react'

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

interface ExpandedSections {
    rating: boolean;
    duration: boolean;
    categories: boolean;
    software: boolean;
    level: boolean;
    language: boolean;
}

interface SelectedFilters {
    rating: string[];
    duration: string[];
    categories: string[];
    level: string[];
}

interface FilterData {
    rating: FilterOption[];
    duration: FilterOption[];
    categories: FilterOption[];
    level: FilterOption[];
}

interface RatingFilterProps {
    expandedSections: ExpandedSections;
    toggleSection: (section: keyof ExpandedSections) => void;
    filterData: FilterData;
    selectedFilters: SelectedFilters;
    handleFilterChange: (filterType: keyof SelectedFilters, value: string, checked: boolean) => void;
    renderStars: (rating: number) => React.ReactNode;
}

interface DurationFilterProps {
    expandedSections: ExpandedSections;
    toggleSection: (section: keyof ExpandedSections) => void;
    filterData: FilterData;
    selectedFilters: SelectedFilters;
    handleFilterChange: (filterType: keyof SelectedFilters, value: string, checked: boolean) => void;
}

interface CategoryFilterProps {
    expandedSections: ExpandedSections;
    toggleSection: (section: keyof ExpandedSections) => void;
    filterData: FilterData;
    selectedFilters: SelectedFilters;
    handleFilterChange: (filterType: keyof SelectedFilters, value: string, checked: boolean) => void;
}

interface SoftwareFilterProps {
    expandedSections: ExpandedSections;
    toggleSection: (section: keyof ExpandedSections) => void;
}

interface LevelFilterProps {
    expandedSections: ExpandedSections;
    toggleSection: (section: keyof ExpandedSections) => void;
    filterData: FilterData;
    selectedFilters: SelectedFilters;
    handleFilterChange: (filterType: keyof SelectedFilters, value: string, checked: boolean) => void;
}

interface LanguageFilterProps {
    expandedSections: ExpandedSections;
    toggleSection: (section: keyof ExpandedSections) => void;
}

export const RatingFilter = ({ expandedSections, toggleSection, filterData, selectedFilters, handleFilterChange, renderStars }: RatingFilterProps) => {
  return (
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
  )
}

export const DurationFilter = ({ expandedSections, toggleSection, filterData, selectedFilters, handleFilterChange }: DurationFilterProps) => {
  return (
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
  )
}

export const CategoryFilter = ({ expandedSections, toggleSection, filterData, selectedFilters, handleFilterChange }: CategoryFilterProps) => {
  return (
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
  )
}

export const SoftwareFilter = ({ expandedSections, toggleSection }: SoftwareFilterProps) => {
  return (
   <Collapsible open={expandedSections.software} onOpenChange={() => toggleSection("software")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
              <h3 className="font-medium">Software</h3>
              {expandedSections.software ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 space-y-3">
              <p className="text-sm text-gray-500">No software filters available</p>
            </CollapsibleContent>
          </Collapsible>
  )
}

export const LevelFilter = ({ expandedSections, toggleSection, filterData, selectedFilters, handleFilterChange }: LevelFilterProps) => {
  return (
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
  )
}

export const LanguageFilter = ({ expandedSections, toggleSection}: LanguageFilterProps) => {
  return (
   <Collapsible open={expandedSections.language} onOpenChange={() => toggleSection("language")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
              <h3 className="font-medium">Language</h3>
              {expandedSections.language ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 space-y-3">
              <p className="text-sm text-popover-foreground/40">No language filters available</p>
            </CollapsibleContent>
          </Collapsible>
  )
}