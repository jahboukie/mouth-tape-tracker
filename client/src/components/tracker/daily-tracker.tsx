import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { Moon, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Tracking } from "@shared/schema";

interface StarRatingProps {
  rating: number;
  onSetRating: (rating: number) => void;
}

export function StarRating({ rating, onSetRating }: StarRatingProps) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onSetRating(star)}
          className="p-1 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full"
        >
          <Star
            className={`h-8 w-8 ${
              star <= rating ? "text-yellow-400 fill-yellow-400" : "text-slate-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

interface DailyTrackerProps {
  userId: number;
  currentStreak: number;
}

export default function DailyTracker({ userId, currentStreak }: DailyTrackerProps) {
  const { toast } = useToast();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const [isMouthTaped, setIsMouthTaped] = useState(false);
  const [sleepQuality, setSleepQuality] = useState(0);
  const [trackingId, setTrackingId] = useState<number | null>(null);
  
  // Fetch today's tracking data
  const { data: todayTracking, isLoading } = useQuery<Tracking>({
    queryKey: ['/api/tracking', userId, today.toISOString().split('T')[0]],
    enabled: !!userId,
  });
  
  // Set the initial state from the fetched data
  useEffect(() => {
    if (todayTracking) {
      setIsMouthTaped(todayTracking.isMouthTaped);
      setSleepQuality(todayTracking.sleepQuality || 0);
      setTrackingId(todayTracking.id);
    }
  }, [todayTracking]);
  
  // Save tracking mutation
  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        userId,
        date: today.toISOString().split('T')[0],
        isMouthTaped,
        sleepQuality
      };
      
      if (trackingId) {
        // Update existing tracking
        return apiRequest('PUT', `/api/tracking/${trackingId}`, payload);
      } else {
        // Create new tracking
        return apiRequest('POST', '/api/tracking', payload);
      }
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['/api/tracking'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
      
      if (!trackingId) {
        setTrackingId((res as Tracking).id);
      }
      
      toast({
        title: "Success!",
        description: "Your tracking has been saved.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save your tracking. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  if (isLoading) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-semibold text-slate-900 mb-6">Today's Tracking</h2>
        <Skeleton className="h-[200px] w-full rounded-xl" />
      </div>
    );
  }
  
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-heading font-semibold text-slate-900 mb-6">Today's Tracking</h2>
      <Card className="border border-slate-100">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-50 text-primary-500">
                    <Moon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">{format(today, "MMMM d, yyyy")}</h3>
                  <p className="text-sm text-slate-500">Track your mouth taping and sleep quality</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-6 md:mt-0">
              <span className="text-xs text-slate-500 mb-1">Current streak</span>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd" />
                </svg>
                <span className="ml-1 text-lg font-semibold text-slate-900">{currentStreak}</span>
                <span className="ml-1 text-sm text-slate-500">days</span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mouth Tape Toggle */}
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="text-md font-medium text-slate-900">Did you tape your mouth last night?</h4>
              <div className="mt-4 flex items-center">
                <Switch
                  checked={isMouthTaped}
                  onCheckedChange={setIsMouthTaped}
                  className={isMouthTaped ? "bg-primary-500" : "bg-slate-200"}
                />
                <span className="ml-3 text-sm font-medium text-slate-900">
                  {isMouthTaped ? "Yes" : "No"}
                </span>
              </div>
            </div>

            {/* Sleep Quality Rating */}
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="text-md font-medium text-slate-900">Rate your sleep quality</h4>
              <div className="mt-4 flex items-center">
                <StarRating 
                  rating={sleepQuality} 
                  onSetRating={setSleepQuality} 
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending}
              className="px-6 py-3"
            >
              {saveMutation.isPending ? "Saving..." : "Save Today's Progress"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
