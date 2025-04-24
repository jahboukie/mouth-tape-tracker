import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function calculateStreak(trackings: any[]): number {
  if (!trackings || trackings.length === 0) return 0;
  
  // Sort trackings by date (newest first)
  const sortedTrackings = [...trackings].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < sortedTrackings.length; i++) {
    const tracking = sortedTrackings[i];
    const trackingDate = new Date(tracking.date);
    trackingDate.setHours(0, 0, 0, 0);
    
    // Calculate the difference in days
    const diffDays = Math.floor(
      (currentDate.getTime() - trackingDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    // If this is the first tracking or it's consecutive with previous day
    if ((i === 0 && diffDays <= 1) || diffDays === i) {
      if (tracking.isMouthTaped) {
        streak++;
        currentDate = trackingDate;
      } else {
        break;
      }
    } else {
      // There's a gap in dates
      break;
    }
  }
  
  return streak;
}
