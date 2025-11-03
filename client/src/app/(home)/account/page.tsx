import MobileNavigation from "@/components/components/mobileNavigation";
import { NavigationFixed } from "@/components/components/navigation";
import { Avatar, AvatarImage } from "@/components/components/ui/avatar";
import { Camera } from "lucide-react";
import Tabs from "../my-learning/_components/tabs";
import Form from "./_components/form";

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
          <label className="absolute right-0 bottom-0 w-6 h-6 bg-popover/50 rounded-full flex items-center justify-center cursor-pointer">
            <Camera
              size={14}
              className="text-popover-foreground transition-all ease-in-out hover:text-primary"
            />
            <input type="file" className="hidden" />
          </label>
        </div>
      </div>
      {/* form */}
      <div className="flex flex-col items-center gap-4 mt-8">
        <Form />
      </div>
    </div>
  );
}
