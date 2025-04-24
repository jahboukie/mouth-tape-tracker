import { pgTable, text, serial, integer, boolean, date, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const trackings = pgTable("trackings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  date: date("date").notNull(),
  isMouthTaped: boolean("is_mouth_taped").notNull(),
  sleepQuality: integer("sleep_quality"),
  notes: text("notes"),
});

export const insertTrackingSchema = createInsertSchema(trackings).pick({
  userId: true,
  date: true,
  isMouthTaped: true,
  sleepQuality: true,
  notes: true,
});

export const reminders = pgTable("reminders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  time: text("time").notNull(), // Store as "HH:MM" format
  daysOfWeek: text("days_of_week").notNull(), // Store as comma-separated string of day numbers (0-6)
  isActive: boolean("is_active").notNull().default(true),
});

export const insertReminderSchema = createInsertSchema(reminders).pick({
  userId: true,
  time: true,
  daysOfWeek: true,
  isActive: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Tracking = typeof trackings.$inferSelect;
export type InsertTracking = z.infer<typeof insertTrackingSchema>;

export type Reminder = typeof reminders.$inferSelect;
export type InsertReminder = z.infer<typeof insertReminderSchema>;

// Types for statistics returned from queries
export type UserStats = {
  totalDays: number;
  tapedDays: number;
  averageSleep: number;
  currentStreak: number;
  longestStreak: number;
};
