import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";
import { format, subDays } from "date-fns";
import type { UserStats, Tracking } from "@shared/schema";

interface ProgressStatsProps {
  userId: number;
  stats?: UserStats;
  isLoading: boolean;
}

export default function ProgressStats({ userId, stats, isLoading }: ProgressStatsProps) {
  const [timeRange, setTimeRange] = useState<"7days" | "30days">("7days");
  
  const startDate = timeRange === "7days" 
    ? subDays(new Date(), 7) 
    : subDays(new Date(), 30);
  const endDate = new Date();
  
  const { data: trackings, isLoading: isLoadingTrackings } = useQuery<Tracking[]>({
    queryKey: ['/api/tracking/range', userId, startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]],
    enabled: !!userId,
  });
  
  // Prepare chart data
  const chartData = trackings?.map(tracking => ({
    date: format(new Date(tracking.date), 'MM/dd'),
    quality: tracking.sleepQuality || 0,
    isTaped: tracking.isMouthTaped ? 1 : 0,
  })).sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  }) || [];
  
  return (
    <>
      <h2 className="text-xl font-heading font-semibold text-slate-900 mb-4">Your Progress</h2>
      <Card className="border border-slate-100">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-4 rounded-lg bg-primary-50">
              <span className="text-3xl font-bold text-primary-600">
                {isLoading ? <Skeleton className="h-9 w-16" /> : stats?.totalDays || 0}
              </span>
              <span className="text-sm text-slate-600">Total Days Tracked</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg bg-teal-50">
              <span className="text-3xl font-bold text-teal-600">
                {isLoading ? <Skeleton className="h-9 w-16" /> : stats?.tapedDays || 0}
              </span>
              <span className="text-sm text-slate-600">Days Mouth Taped</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg bg-purple-50">
              <span className="text-3xl font-bold text-purple-600">
                {isLoading ? <Skeleton className="h-9 w-16" /> : stats?.averageSleep || 0}
              </span>
              <span className="text-sm text-slate-600">Avg. Sleep Quality</span>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-700">Sleep Quality Trend</h3>
              <Tabs 
                value={timeRange} 
                onValueChange={(value) => setTimeRange(value as "7days" | "30days")}
                className="w-[200px]"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="7days">7 Days</TabsTrigger>
                  <TabsTrigger value="30days">30 Days</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {isLoadingTrackings ? (
              <Skeleton className="h-40 w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" orientation="left" domain={[0, 5]} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 1]} />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="quality" name="Sleep Quality" fill="#4F46E5" />
                  <Bar yAxisId="right" dataKey="isTaped" name="Mouth Taped" fill="#0D9488" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
