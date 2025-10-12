import React from "react";
import Tabs from "../my-learning/_components/tabs";
import { Avatar, AvatarImage } from "@/components/components/ui/avatar";
import { Camera } from "lucide-react";
import { NavigationFixed } from "@/components/components/navigation";
import { SelectInput } from "../courses/_components/heroSearchBar";
import { Button } from "@/components/components/ui/button";
import MobileNavigation from "@/components/components/mobileNavigation";

export default function page() {
  return (
    <div className="container max-w-7xl mx-auto px-4 mt-[var(--margin-section-top)]">
      {/* navigation */}
      <NavigationFixed />
      <MobileNavigation />
      {/* title */}
      <h1 className="py-3 lg:py-0 text-2xl font-bold text-center text-popover-foreground">
        My Account
      </h1>
      {/* tabs -- this component will be a reusable component */}
      <Tabs />
      {/* avatar upload */}
      <div className="flex flex-col items-center">
        <div className="cursor-pointer relative">
          <Avatar asChild className="w-24 h-24 mt-10">
            <AvatarImage
              className="object-cover"
              src="https://placehold.co/600x400/png"
              alt="User Avatar"
            />
          </Avatar>
          <label className="absolute right-0 bottom-0 w-6 h-6 bg-popover-foreground/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-popover-foreground/20 transition-all ease-in-out">
            <Camera size={14} />
            <input type="file" className="hidden" />
          </label>
        </div>
      </div>
      {/* form */}
      <div className="flex flex-col items-center gap-4 mt-8">
        <form className="flex flex-col gap-4 w-[300px] md:w-xl">
          <input
            type="text"
            placeholder="full name"
            className="bg-[var(--input-bg-color)] w-full max-w-xl p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-[var(--input-text-color)] font-poppins text-[16px] font-normal leading-[24px]"
          />
          <input
            type="text"
            placeholder="display name"
            className="bg-[var(--input-bg-color)] w-full max-w-xl p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-[var(--input-text-color)] font-poppins text-[16px] font-normal leading-[24px]"
          />
          <input
            type="email"
            placeholder="john.doe@example.com"
            className="bg-[var(--input-bg-color)] w-full max-w-xl p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-[var(--input-text-color)] font-poppins text-[16px] font-normal leading-[24px]"
          />
          <SelectInput
            className="w-full max-w-full"
            selectItems={["somali", "english"]}
            selectLabel="language"
            selectPlaceholder="Select a language"
          />
          <Button
            size="lg"
            variant="primary"
            className="w-full bg-[var(--primary-color)] text-white hover:bg-primary/80 focus:ring-2 focus:ring-[var(--primary-color)] cursor-pointer mt-2"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}
