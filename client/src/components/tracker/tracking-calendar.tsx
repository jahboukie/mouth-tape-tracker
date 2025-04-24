import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfMonth, endOfMonth, isSameDay } from "date-fns";
import type { User, Tracking } from "@shared/schema";

export default function TrackingCalendar() {
  const [month, setMonth] = useState<Date>(new Date());
  
  const { data: user, isLoading: isLoadingUser } = useQuery<User>({
    queryKey: ['/api/user'],
  });
  
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  
  const { data: trackings, isLoading: isLoadingTrackings } = useQuery<Tracking[]>({
    queryKey: ['/api/tracking/range', user?.id, 
      monthStart.toISOString().split('T')[0], 
      monthEnd.toISOString().split('T')[0]
    ],
    enabled: !!user?.id,
  });
  
  const renderDayContent = (day: Date) => {
    if (!trackings) return null;
    
    const tracking = trackings.find(t => 
      isSameDay(new Date(t.date), day)
    );
    
    if (!tracking) return null;
    
    return (
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
        <Badge 
          variant={tracking.isMouthTaped ? "default" : "destructive"} 
          className="w-1.5 h-1.5 rounded-full p-0" 
        />
      </div>
    );
  };
  
  const previousMonth = () => {
    const newMonth = new Date(month);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setMonth(newMonth);
  };
  
  const nextMonth = () => {
    const newMonth = new Date(month);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setMonth(newMonth);
  };
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-heading font-semibold text-slate-900 mb-4">Tracking Calendar</h2>
      <Card className="border border-slate-100">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <span>{format(month, "MMMM yyyy")}</span>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" onClick={previousMonth}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingTrackings || isLoadingUser ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <>
              <Calendar
                mode="single"
                month={month}
                onMonthChange={setMonth}
                selected={new Date()}
                className="rounded-md border mx-auto"
                components={{
                  DayContent: ({ day }) => (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <span>{format(day, "d")}</span>
                      {renderDayContent(day)}
                    </div>
                  ),
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
    </div>
  );
}
