import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { StarRating } from "@/components/tracker/daily-tracker";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { format, startOfMonth, endOfMonth, isSameDay } from "date-fns";
import type { User, Tracking } from "@shared/schema";

export default function Calendar() {
  const [date, setDate] = useState<Date>(new Date());
  const [month, setMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDayData, setSelectedDayData] = useState<Tracking | null>(null);
  const [isMouthTaped, setIsMouthTaped] = useState<boolean>(false);
  const [sleepQuality, setSleepQuality] = useState<number>(0);
  
  const { data: user, isLoading: isLoadingUser } = useQuery<User>({
    queryKey: ['/api/user'],
  });
  
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  
  const { data: monthlyTrackings, isLoading: isLoadingTrackings } = useQuery<Tracking[]>({
    queryKey: ['/api/tracking/range', user?.id, 
      monthStart.toISOString().split('T')[0], 
      monthEnd.toISOString().split('T')[0]
    ],
    enabled: !!user?.id,
  });
  
  // Create a day-content render function to show tracking status
  const renderDayContent = (day: Date) => {
    if (!monthlyTrackings || !day || !(day instanceof Date) || isNaN(day.getTime())) return null;
    
    try {
      const tracking = monthlyTrackings.find(t => {
        const trackingDate = new Date(t.date);
        return trackingDate && !isNaN(trackingDate.getTime()) && isSameDay(trackingDate, day);
      });
      
      if (!tracking) return null;
      
      return (
        <div className="w-full flex justify-center">
          <Badge variant={tracking.isMouthTaped ? "default" : "destructive"} className="w-1.5 h-1.5 rounded-full p-0 mt-1" />
        </div>
      );
    } catch (error) {
      console.error("Error rendering day content:", error);
      return null;
    }
  };
  
  // Fetch details for a selected day
  const fetchDayDetails = (date: Date) => {
    setSelectedDate(date);
    
    if (!user?.id) return;
    
    const tracking = monthlyTrackings?.find(t => 
      isSameDay(new Date(t.date), date)
    );
    
    if (tracking) {
      setSelectedDayData(tracking);
      setIsMouthTaped(tracking.isMouthTaped);
      setSleepQuality(tracking.sleepQuality || 0);
    } else {
      setSelectedDayData(null);
      setIsMouthTaped(false);
      setSleepQuality(0);
    }
  };
  
  // Save or update day tracking
  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!user?.id || !selectedDate) return null;
      
      const payload = {
        userId: user.id,
        date: selectedDate.toISOString().split('T')[0],
        isMouthTaped,
        sleepQuality
      };
      
      if (selectedDayData) {
        // Update existing tracking
        return apiRequest('PUT', `/api/tracking/${selectedDayData.id}`, payload);
      } else {
        // Create new tracking
        return apiRequest('POST', '/api/tracking', payload);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tracking/range'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
      setSelectedDate(null);
    }
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-heading font-semibold text-slate-900 mb-6">Tracking Calendar</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{format(month, "MMMM yyyy")}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingTrackings || isLoadingUser ? (
            <Skeleton className="h-[400px] w-full" />
          ) : (
            <>
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={(newDate) => {
                  if (newDate) {
                    setDate(newDate);
                    fetchDayDetails(newDate);
                  }
                }}
                month={month}
                onMonthChange={setMonth}
                className="rounded-md border mx-auto"
                components={{
                  DayContent: ({ day }) => {
                    if (!day || !(day instanceof Date) || isNaN(day.getTime())) {
                      return <span>?</span>;
                    }
                    return (
                      <>
                        <span>{format(day, "d")}</span>
                        {renderDayContent(day)}
                      </>
                    );
                  },
                }}
              />
              
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center">
                  <Badge className="h-3 w-3 rounded-full mr-2" />
                  <span className="text-xs text-slate-600">Mouth Taped</span>
                </div>
                <div className="flex items-center">
                  <Badge variant="destructive" className="h-3 w-3 rounded-full mr-2" />
                  <span className="text-xs text-slate-600">Not Taped</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-slate-300 mr-2" />
                  <span className="text-xs text-slate-600">Not Tracked</span>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      
      {/* Day detail dialog */}
      <Dialog open={!!selectedDate} onOpenChange={(open) => !open && setSelectedDate(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Day Details"}</DialogTitle>
            <DialogDescription>
              Edit your tracking data for this day.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="mouth-taped" className="text-right">
                Mouth Taped
              </Label>
              <Switch
                id="mouth-taped"
                checked={isMouthTaped}
                onCheckedChange={setIsMouthTaped}
              />
              <span>{isMouthTaped ? "Yes" : "No"}</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <Label>Sleep Quality</Label>
              <StarRating 
                rating={sleepQuality} 
                onSetRating={setSleepQuality} 
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              className="mr-2"
              onClick={() => setSelectedDate(null)}
            >
              Cancel
            </Button>
            <Button 
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending}
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
