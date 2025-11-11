import { getUserSession } from "@/components/actions/authentication";
import MobileNavigation from "@/components/components/mobileNavigation";
import { NavigationFixed } from "@/components/components/navigation";
import { Avatar, AvatarImage } from "@/components/components/ui/avatar";
import { UserSession } from "@/components/util/interfaces";
import Tabs from "../my-learning/_components/tabs";
import ProfileEditor from "./_components/EditProfileImage";
import Form from "./_components/form";

export default async function page() {
  const userSession: UserSession = await getUserSession();
  const { image } = userSession;

  console.log(userSession);
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
      {/* avatar upload --- React Image Crop */}
      <div className="flex flex-col items-center">
        <div className="cursor-pointer relative">
          <Avatar asChild className="w-24 h-24 mt-10">
            <AvatarImage
              className="object-cover"
              src={image}
              alt="User Avatar"
            />
          </Avatar>
          <ProfileEditor />
        </div>
      </div>
      {/* form */}
      <div className="flex flex-col items-center gap-4 mt-8">
        <Form userSession={userSession} />
      </div>
    </div>
  );
}
