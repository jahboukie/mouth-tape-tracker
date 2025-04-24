import { Flame, Calendar, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface StreakCardProps {
  currentStreak: number;
  longestStreak: number;
  isLoading: boolean;
}

export default function StreakCard({ currentStreak, longestStreak, isLoading }: StreakCardProps) {
  // Determine which badges to show based on streak achievements
  const hasDayOneBadge = currentStreak > 0 || longestStreak > 0;
  const hasWeekBadge = currentStreak >= 7 || longestStreak >= 7;
  const hasMonthBadge = currentStreak >= 30 || longestStreak >= 30;
  
  return (
    <>
      <h2 className="text-xl font-heading font-semibold text-slate-900 mb-4">Your Streaks</h2>
      <Card className="border border-slate-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Flame className="h-5 w-5 text-yellow-500" />
              <span className="ml-2 text-lg font-semibold">Current Streak</span>
            </div>
            {isLoading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <span className="text-2xl font-bold text-primary-600">{currentStreak}</span>
            )}
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-medium text-slate-700">Longest Streak</span>
            {isLoading ? (
              <Skeleton className="h-6 w-20" />
            ) : (
              <span className="text-sm font-medium text-primary-600">{longestStreak} days</span>
            )}
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-slate-700 mb-2">Achievement Badges</h3>
            <div className="flex flex-wrap gap-3">
              <div className="flex flex-col items-center">
                <div className={`h-12 w-12 rounded-full ${hasDayOneBadge ? 'bg-yellow-100' : 'bg-slate-100'} flex items-center justify-center`}>
                  <Award className={`h-6 w-6 ${hasDayOneBadge ? 'text-yellow-500' : 'text-slate-400'}`} />
                </div>
                <span className="text-xs text-slate-600 mt-1">First Day</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className={`h-12 w-12 rounded-full ${hasWeekBadge ? 'bg-primary-100' : 'bg-slate-100'} flex items-center justify-center`}>
                  <Calendar className={`h-6 w-6 ${hasWeekBadge ? 'text-primary-500' : 'text-slate-400'}`} />
                </div>
                <span className="text-xs text-slate-600 mt-1">7 Days</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className={`h-12 w-12 rounded-full ${hasMonthBadge ? 'bg-teal-100' : 'bg-slate-100'} flex items-center justify-center`}>
                  <Calendar className={`h-6 w-6 ${hasMonthBadge ? 'text-teal-500' : 'text-slate-400'}`} />
                </div>
                <span className="text-xs text-slate-600 mt-1">30 Days</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
