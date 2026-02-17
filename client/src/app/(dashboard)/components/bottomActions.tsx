import { Button } from "@/components/ui/button";
import { HelpCircle, LogOut } from "lucide-react";
import React from "react";

export default function BottomActions() {
  return (
    <div className="border-t border-border p-4">
      <div className="space-y-1">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-foreground hover:bg-accent cursor-pointer"
        >
          <HelpCircle className="h-5 w-5" />
          <span className="text-sm font-medium">Help</span>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer"
        >
          <LogOut className="h-5 w-5" />
          <span className="text-sm font-medium">Logout Account</span>
        </Button>
      </div>
    </div>
  );
}
