import { Link } from "wouter";
import { Home, BarChart2, Calendar, BookOpen, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShareDialog } from "@/components/dialogs/share-dialog";

interface TabBarProps {
  currentPath: string;
}

export default function TabBar({ currentPath }: TabBarProps) {
  const isActive = (path: string) => currentPath === path;
  
  const tabs = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/stats", icon: BarChart2, label: "Stats" },
    { path: "/calendar", icon: Calendar, label: "Calendar" },
    { path: "/learn", icon: BookOpen, label: "Learn" },
  ];
  
  return (
    <div className="bg-white border-t border-slate-200 fixed bottom-0 left-0 right-0 z-10 md:hidden">
      <div className="grid grid-cols-5 h-16">
        {tabs.slice(0, 2).map((tab) => (
          <Link key={tab.path} href={tab.path}>
            <div className={cn(
              "flex flex-col items-center justify-center",
              isActive(tab.path) ? "text-violet-700" : "text-slate-500"
            )}>
              <tab.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{tab.label}</span>
            </div>
          </Link>
        ))}
        
        <div className="flex justify-center">
          <ShareDialog>
            <div>
              <Button className="bg-violet-700 text-white rounded-full h-14 w-14 -mt-5 flex items-center justify-center shadow-lg hover:bg-violet-800">
                <Plus className="h-8 w-8" />
              </Button>
            </div>
          </ShareDialog>
        </div>
        
        {tabs.slice(2, 4).map((tab) => (
          <Link key={tab.path} href={tab.path}>
            <div className={cn(
              "flex flex-col items-center justify-center",
              isActive(tab.path) ? "text-violet-700" : "text-slate-500"
            )}>
              <tab.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{tab.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
