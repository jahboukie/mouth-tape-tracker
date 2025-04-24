import { useState, ReactNode } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { User, Reminder } from "@shared/schema";

interface ReminderDialogProps {
  children: ReactNode;
}

export function ReminderDialog({ children }: ReminderDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [reminderTime, setReminderTime] = useState("21:00");
  const [selectedDays, setSelectedDays] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]); // All days by default
  
  const { data: user } = useQuery<User>({
    queryKey: ['/api/user'],
  });
  
  const { data: reminders, isLoading: isLoadingReminders } = useQuery<Reminder[]>({
    queryKey: ['/api/reminders', user?.id],
    enabled: !!user?.id,
  });
  
  // Find existing reminder if any
  const existingReminder = reminders?.[0];
  
  // Initialize form with existing reminder data
  useState(() => {
    if (existingReminder) {
      setReminderTime(existingReminder.time);
      setSelectedDays(existingReminder.daysOfWeek.split(',').map(Number));
    }
  });
  
  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!user?.id) return null;
      
      const payload = {
        userId: user.id,
        time: reminderTime,
        daysOfWeek: selectedDays.join(','),
        isActive: true
      };
      
      if (existingReminder) {
        // Update existing reminder
        return apiRequest('PUT', `/api/reminders/${existingReminder.id}`, payload);
      } else {
        // Create new reminder
        return apiRequest('POST', '/api/reminders', payload);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/reminders'] });
      setOpen(false);
      toast({
        title: "Reminder Saved",
        description: "Your mouth taping reminder has been set.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save reminder. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  const toggleDay = (day: number) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };
  
  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Reminder</DialogTitle>
          <DialogDescription>
            Set a nightly reminder to tape your mouth before going to bed.
          </DialogDescription>
        </DialogHeader>
        
        {isLoadingReminders ? (
          <div className="py-4">
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="reminder-time">Reminder Time</Label>
              <Input
                id="reminder-time"
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Repeat</Label>
              <div className="grid grid-cols-7 gap-1">
                {dayLabels.map((day, index) => (
                  <Toggle
                    key={index}
                    pressed={selectedDays.includes(index)}
                    onPressedChange={() => toggleDay(index)}
                    className="h-8 w-8 rounded-full p-0"
                    variant={selectedDays.includes(index) ? "default" : "outline"}
                  >
                    {day}
                  </Toggle>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)} 
            className="mr-2"
          >
            Cancel
          </Button>
          <Button 
            onClick={() => saveMutation.mutate()}
            disabled={saveMutation.isPending}
          >
            Save Reminder
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
