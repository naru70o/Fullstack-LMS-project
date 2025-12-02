import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/components/ui/avatar";
import { Button } from "@/components/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { UserSession } from "@/components/util/interfaces";
import { getUserSession } from "@/components/actions/authentication";

export default async function Profile() {
  const userSession: UserSession = await getUserSession();
  const { image, name } = userSession;

  console.log(userSession);
  return (
    <div className="flex items-center justify-between border-b border-border p-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Product Manager
          </span>
          <span className="text-sm font-semibold text-foreground">
            Andrew Smith
          </span>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <ChevronLeft className="h-4 w-4" />
      </Button>
    </div>
  );
}
