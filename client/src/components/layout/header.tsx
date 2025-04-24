import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { ReminderDialog } from "@/components/dialogs/reminder-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import type { User } from "@shared/schema";

export default function Header() {
  const { data: user } = useQuery<User>({
    queryKey: ['/api/user'],
  });
  
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Heart className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-heading font-bold text-primary-600">BreatheBetter</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <ReminderDialog>
              <div className="flex items-center">
                <Button variant="ghost" size="icon" className="mr-2" aria-label="Set Reminder">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </Button>
              </div>
            </ReminderDialog>
            
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full bg-primary-100">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary-100 text-primary-600">
                        {user?.username.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
