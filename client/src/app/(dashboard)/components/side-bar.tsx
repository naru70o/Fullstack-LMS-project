import BottomActions from "./bottomActions";
import Navigation from "./navigation";
import Profile from "./profile";

export function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border bg-background">
      {/* Profile Section */}
      <Profile />
      {/* Navigation */}
      <Navigation />
      {/* Bottom Actions */}
      <BottomActions />
    </aside>
  );
}
