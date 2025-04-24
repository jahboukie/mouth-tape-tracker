import { useQuery } from "@tanstack/react-query";
import DailyTracker from "@/components/tracker/daily-tracker";
import ProgressStats from "@/components/tracker/progress-stats";
import StreakCard from "@/components/tracker/streak-card";
import EducationalContent from "@/components/content/educational-content";
import { Skeleton } from "@/components/ui/skeleton";
import type { User, UserStats } from "@shared/schema";

export default function Home() {
  const { data: user, isLoading: isLoadingUser } = useQuery<User>({
    queryKey: ['/api/user'],
  });
  
  const { data: stats, isLoading: isLoadingStats } = useQuery<UserStats>({
    queryKey: ['/api/stats', user?.id],
    enabled: !!user?.id,
  });
  
  if (isLoadingUser) {
    return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Skeleton className="h-[200px] w-full mb-8 rounded-xl" />
      <Skeleton className="h-[300px] w-full mb-8 rounded-xl" />
      <Skeleton className="h-[200px] w-full rounded-xl" />
    </div>;
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {user && (
        <>
          <DailyTracker userId={user.id} currentStreak={stats?.currentStreak || 0} />
          
          <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ProgressStats userId={user.id} stats={stats} isLoading={isLoadingStats} />
            </div>
            <div>
              <StreakCard 
                currentStreak={stats?.currentStreak || 0} 
                longestStreak={stats?.longestStreak || 0} 
                isLoading={isLoadingStats}
              />
            </div>
          </div>
          
          <EducationalContent />
        </>
      )}
    </div>
  );
}
