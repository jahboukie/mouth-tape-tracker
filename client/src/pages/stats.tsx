import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  BarChart,
  Bar
} from "recharts";
import type { User, UserStats, Tracking } from "@shared/schema";
import { format, subDays } from "date-fns";

export default function Stats() {
  const { data: user, isLoading: isLoadingUser } = useQuery<User>({
    queryKey: ['/api/user'],
  });
  
  const { data: stats, isLoading: isLoadingStats } = useQuery<UserStats>({
    queryKey: ['/api/stats', user?.id],
    enabled: !!user?.id,
  });
  
  const today = new Date();
  const startDate = subDays(today, 30);
  
  const { data: trackings, isLoading: isLoadingTrackings } = useQuery<Tracking[]>({
    queryKey: ['/api/tracking/range', user?.id, startDate.toISOString().split('T')[0], today.toISOString().split('T')[0]],
    enabled: !!user?.id,
  });
  
  // Prepare chart data
  const sleepQualityData = trackings?.map(tracking => ({
    date: format(new Date(tracking.date), 'MM/dd'),
    quality: tracking.sleepQuality || 0,
    taped: tracking.isMouthTaped ? 1 : 0
  })) || [];
  
  // Group data by week for weekly view
  const weeklyData = trackings?.reduce((acc: any[], tracking) => {
    const weekStart = format(new Date(tracking.date), 'MM/dd');
    const existingWeek = acc.find(item => item.week === weekStart);
    
    if (existingWeek) {
      existingWeek.tapedDays += tracking.isMouthTaped ? 1 : 0;
      existingWeek.totalDays += 1;
      existingWeek.qualitySum += tracking.sleepQuality || 0;
      existingWeek.qualityCount += tracking.sleepQuality ? 1 : 0;
    } else {
      acc.push({
        week: weekStart,
        tapedDays: tracking.isMouthTaped ? 1 : 0,
        totalDays: 1,
        qualitySum: tracking.sleepQuality || 0,
        qualityCount: tracking.sleepQuality ? 1 : 0
      });
    }
    
    return acc;
  }, [])?.map(week => ({
    week: week.week,
    tapedPercentage: Math.round((week.tapedDays / week.totalDays) * 100),
    avgQuality: week.qualityCount > 0 ? Number((week.qualitySum / week.qualityCount).toFixed(1)) : 0
  })) || [];
  
  if (isLoadingUser) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="h-[400px] w-full mb-8 rounded-xl" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-heading font-semibold text-slate-900 mb-6">Your Statistics</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 pt-6">
            <div className="text-3xl font-bold text-primary-600">{stats?.totalDays || 0}</div>
            <p className="text-sm text-slate-600">Total Days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 pt-6">
            <div className="text-3xl font-bold text-primary-600">{stats?.tapedDays || 0}</div>
            <p className="text-sm text-slate-600">Taped Nights</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 pt-6">
            <div className="text-3xl font-bold text-primary-600">
              {stats ? `${Math.round((stats.tapedDays / stats.totalDays) * 100) || 0}%` : '0%'}
            </div>
            <p className="text-sm text-slate-600">Adherence Rate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 pt-6">
            <div className="text-3xl font-bold text-primary-600">{stats?.averageSleep || 0}</div>
            <p className="text-sm text-slate-600">Avg. Sleep Quality</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Sleep Quality Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Sleep Quality Trend (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingTrackings ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sleepQualityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" domain={[0, 5]} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 1]} />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="quality" 
                  name="Sleep Quality" 
                  stroke="#4F46E5" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="taped" 
                  name="Mouth Taped" 
                  stroke="#0D9488" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
      
      {/* Weekly Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingTrackings ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis yAxisId="left" domain={[0, 100]} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 5]} />
                <Tooltip />
                <Legend />
                <Bar 
                  yAxisId="left"
                  dataKey="tapedPercentage" 
                  name="Taped %" 
                  fill="#4F46E5" 
                />
                <Bar 
                  yAxisId="right"
                  dataKey="avgQuality" 
                  name="Avg. Sleep Quality" 
                  fill="#0D9488" 
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
