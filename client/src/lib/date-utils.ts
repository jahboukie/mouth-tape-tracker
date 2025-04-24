import { format, addDays, subDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

// Format a date to a standard string format (YYYY-MM-DD)
export function formatDateString(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

// Get an array of dates for the current month
export function getDatesForMonth(date: Date): Date[] {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  
  return eachDayOfInterval({ start, end });
}

// Get an array of dates for a week starting from a given date
export function getWeekDates(date: Date): Date[] {
  const start = date;
  const end = addDays(date, 6);
  
  return eachDayOfInterval({ start, end });
}

// Get an array of dates for the past N days
export function getPastDays(days: number): Date[] {
  const end = new Date();
  const start = subDays(end, days - 1);
  
  return eachDayOfInterval({ start, end });
}

// Check if a date is today
export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

// Get date for display in different formats
export function getDisplayDate(date: Date, formatStr: string = 'MMMM d, yyyy'): string {
  return format(date, formatStr);
}

// Get month name
export function getMonthName(date: Date): string {
  return format(date, 'MMMM yyyy');
}

// Get the day of week as a number (0-6, where 0 is Sunday)
export function getDayOfWeek(date: Date): number {
  return date.getDay();
}

// Format a time string (HH:MM) for display
export function formatTimeString(timeStr: string): string {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  
  return format(date, 'h:mm a');
}
