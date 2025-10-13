"use client";

import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/components/ui/avatar";
import { Button } from "@/components/components/ui/button";
import {
  Home,
  Users,
  FileText,
  Calendar,
  TrendingUp,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
} from "lucide-react";

export function Sidebar() {
  const [studentsOpen, setStudentsOpen] = useState(false);
  const [incomeOpen, setIncomeOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border bg-background">
      {/* Profile Section */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/professional-headshot.png" alt="Andrew Smith" />
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

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        {/* Main Section */}
        <div className="mb-6">
          <h3 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Main
          </h3>
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-foreground hover:bg-accent cursor-pointer"
            >
              <Home className="h-5 w-5" />
              <span className="text-sm font-medium">Dashboard</span>
            </Button>

            <div>
              <Button
                variant="ghost"
                className="w-full justify-between gap-3 text-foreground hover:bg-accent cursor-pointer"
                onClick={() => setStudentsOpen(!studentsOpen)}
              >
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5" />
                  <span className="text-sm font-medium">Students</span>
                </div>
                {studentsOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>

            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-foreground hover:bg-accent cursor-pointer"
            >
              <FileText className="h-5 w-5" />
              <span className="text-sm font-medium">Courses</span>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-foreground hover:bg-accent cursor-pointer"
            >
              <Calendar className="h-5 w-5" />
              <span className="text-sm font-medium">Schedules</span>
            </Button>

            <div>
              <Button
                variant="ghost"
                className="w-full justify-between gap-3 text-foreground hover:bg-accent cursor-pointer"
                onClick={() => setIncomeOpen(!incomeOpen)}
              >
                <div className="flex items-center gap-3 cursor-pointer">
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-sm font-medium">Income</span>
                </div>
                {incomeOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
              {incomeOpen && (
                <div className="ml-8 mt-1 space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer"
                  >
                    Earnings
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm text-foreground hover:bg-accent cursor-pointer"
                  >
                    Refunds
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer"
                  >
                    Declines
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer"
                  >
                    Payouts
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div>
          <h3 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground cursor-pointer">
            Settings
          </h3>
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-between gap-3 text-foreground hover:bg-accent cursor-pointer"
              onClick={() => setSettingsOpen(!settingsOpen)}
            >
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5" />
                <span className="text-sm font-medium">Settings</span>
              </div>
              {settingsOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Bottom Actions */}
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
    </aside>
  );
}
