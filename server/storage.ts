import { 
  users, type User, type InsertUser,
  trackings, type Tracking, type InsertTracking,
  reminders, type Reminder, type InsertReminder,
  type UserStats
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Tracking methods
  getTrackingByDate(userId: number, date: Date): Promise<Tracking | undefined>;
  getTrackingsForDateRange(userId: number, startDate: Date, endDate: Date): Promise<Tracking[]>;
  createTracking(tracking: InsertTracking): Promise<Tracking>;
  updateTracking(id: number, tracking: Partial<InsertTracking>): Promise<Tracking | undefined>;
  
  // Statistics methods
  getUserStats(userId: number): Promise<UserStats>;
  
  // Reminder methods
  getRemindersForUser(userId: number): Promise<Reminder[]>;
  createReminder(reminder: InsertReminder): Promise<Reminder>;
  updateReminder(id: number, reminder: Partial<InsertReminder>): Promise<Reminder | undefined>;
  deleteReminder(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private trackings: Map<number, Tracking>;
  private reminders: Map<number, Reminder>;
  userCurrentId: number;
  trackingCurrentId: number;
  reminderCurrentId: number;

  constructor() {
    this.users = new Map();
    this.trackings = new Map();
    this.reminders = new Map();
    this.userCurrentId = 1;
    this.trackingCurrentId = 1;
    this.reminderCurrentId = 1;
    
    // Create a default user for demonstration
    this.createUser({
      username: "demo",
      password: "password"
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Tracking methods
  async getTrackingByDate(userId: number, date: Date): Promise<Tracking | undefined> {
    const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD format
    
    return Array.from(this.trackings.values()).find(
      (tracking) => 
        tracking.userId === userId && 
        tracking.date.toISOString().split('T')[0] === dateStr
    );
  }

  async getTrackingsForDateRange(userId: number, startDate: Date, endDate: Date): Promise<Tracking[]> {
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();
    
    return Array.from(this.trackings.values()).filter(
      (tracking) => 
        tracking.userId === userId && 
        tracking.date.getTime() >= startTimestamp && 
        tracking.date.getTime() <= endTimestamp
    );
  }

  async createTracking(insertTracking: InsertTracking): Promise<Tracking> {
    const id = this.trackingCurrentId++;
    const tracking: Tracking = { 
      ...insertTracking, 
      id,
      date: new Date(insertTracking.date) // Ensure date is a Date object
    };
    
    this.trackings.set(id, tracking);
    return tracking;
  }

  async updateTracking(id: number, partialTracking: Partial<InsertTracking>): Promise<Tracking | undefined> {
    const tracking = this.trackings.get(id);
    
    if (!tracking) {
      return undefined;
    }
    
    const updatedTracking: Tracking = { 
      ...tracking, 
      ...partialTracking,
      // Handle date conversion if date is provided
      date: partialTracking.date ? new Date(partialTracking.date) : tracking.date
    };
    
    this.trackings.set(id, updatedTracking);
    return updatedTracking;
  }

  // Statistics methods
  async getUserStats(userId: number): Promise<UserStats> {
    const userTrackings = Array.from(this.trackings.values())
      .filter(tracking => tracking.userId === userId)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
    
    const totalDays = userTrackings.length;
    const tapedDays = userTrackings.filter(tracking => tracking.isMouthTaped).length;
    
    // Calculate average sleep quality
    const sleepQualityValues = userTrackings
      .filter(tracking => tracking.sleepQuality !== undefined && tracking.sleepQuality > 0)
      .map(tracking => tracking.sleepQuality as number);
    
    const averageSleep = sleepQualityValues.length > 0 
      ? Number((sleepQualityValues.reduce((acc, val) => acc + val, 0) / sleepQualityValues.length).toFixed(1))
      : 0;
    
    // Calculate current streak
    let currentStreak = 0;
    if (userTrackings.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Check if the most recent tracking is from today or yesterday
      const lastTracking = userTrackings[userTrackings.length - 1];
      const lastDate = new Date(lastTracking.date);
      lastDate.setHours(0, 0, 0, 0);
      const timeDiff = Math.floor((today.getTime() - lastDate.getTime()) / (24 * 60 * 60 * 1000));
      
      if (timeDiff <= 1 && lastTracking.isMouthTaped) {
        currentStreak = 1;
        
        // Count backwards from the last tracking
        for (let i = userTrackings.length - 2; i >= 0; i--) {
          const currentTracking = userTrackings[i];
          const currentDate = new Date(currentTracking.date);
          const prevDate = new Date(userTrackings[i + 1].date);
          
          // Check if the current date is exactly one day before the previous date
          const dayDiff = Math.floor((prevDate.getTime() - currentDate.getTime()) / (24 * 60 * 60 * 1000));
          
          if (dayDiff === 1 && currentTracking.isMouthTaped) {
            currentStreak++;
          } else {
            break;
          }
        }
      }
    }
    
    // Calculate longest streak
    let longestStreak = 0;
    let currentLongestStreak = 0;
    
    for (let i = 0; i < userTrackings.length; i++) {
      if (userTrackings[i].isMouthTaped) {
        currentLongestStreak++;
        
        if (i === userTrackings.length - 1 || 
            !userTrackings[i + 1].isMouthTaped ||
            Math.floor((userTrackings[i + 1].date.getTime() - userTrackings[i].date.getTime()) / (24 * 60 * 60 * 1000)) > 1) {
          
          longestStreak = Math.max(longestStreak, currentLongestStreak);
          currentLongestStreak = 0;
        }
      } else {
        currentLongestStreak = 0;
      }
    }
    
    return {
      totalDays,
      tapedDays,
      averageSleep,
      currentStreak,
      longestStreak
    };
  }

  // Reminder methods
  async getRemindersForUser(userId: number): Promise<Reminder[]> {
    return Array.from(this.reminders.values()).filter(
      (reminder) => reminder.userId === userId
    );
  }

  async createReminder(insertReminder: InsertReminder): Promise<Reminder> {
    const id = this.reminderCurrentId++;
    const reminder: Reminder = { ...insertReminder, id };
    
    this.reminders.set(id, reminder);
    return reminder;
  }

  async updateReminder(id: number, partialReminder: Partial<InsertReminder>): Promise<Reminder | undefined> {
    const reminder = this.reminders.get(id);
    
    if (!reminder) {
      return undefined;
    }
    
    const updatedReminder: Reminder = { ...reminder, ...partialReminder };
    this.reminders.set(id, updatedReminder);
    return updatedReminder;
  }

  async deleteReminder(id: number): Promise<boolean> {
    return this.reminders.delete(id);
  }
}

export const storage = new MemStorage();
