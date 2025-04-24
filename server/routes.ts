import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertTrackingSchema, 
  insertReminderSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // User routes
  app.get("/api/user", async (req, res) => {
    // For demo purposes, return the default user
    const user = await storage.getUserByUsername("demo");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Don't return the password
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  });
  
  // Tracking routes
  app.post("/api/tracking", async (req: Request, res: Response) => {
    try {
      const trackingData = insertTrackingSchema.parse(req.body);
      const tracking = await storage.createTracking(trackingData);
      res.status(201).json(tracking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid tracking data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create tracking" });
    }
  });
  
  app.get("/api/tracking/:userId/:date", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const date = new Date(req.params.date);
    
    if (isNaN(userId) || isNaN(date.getTime())) {
      return res.status(400).json({ message: "Invalid userId or date" });
    }
    
    const tracking = await storage.getTrackingByDate(userId, date);
    
    if (!tracking) {
      return res.status(404).json({ message: "Tracking not found for this date" });
    }
    
    res.json(tracking);
  });
  
  app.put("/api/tracking/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid tracking id" });
    }
    
    try {
      const updatedTracking = await storage.updateTracking(id, req.body);
      
      if (!updatedTracking) {
        return res.status(404).json({ message: "Tracking not found" });
      }
      
      res.json(updatedTracking);
    } catch (error) {
      res.status(500).json({ message: "Failed to update tracking" });
    }
  });
  
  app.get("/api/tracking/range/:userId/:startDate/:endDate", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const startDate = new Date(req.params.startDate);
    const endDate = new Date(req.params.endDate);
    
    if (isNaN(userId) || isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({ message: "Invalid parameters" });
    }
    
    const trackings = await storage.getTrackingsForDateRange(userId, startDate, endDate);
    res.json(trackings);
  });
  
  // Stats routes
  app.get("/api/stats/:userId", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }
    
    const stats = await storage.getUserStats(userId);
    res.json(stats);
  });
  
  // Reminder routes
  app.get("/api/reminders/:userId", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }
    
    const reminders = await storage.getRemindersForUser(userId);
    res.json(reminders);
  });
  
  app.post("/api/reminders", async (req: Request, res: Response) => {
    try {
      const reminderData = insertReminderSchema.parse(req.body);
      const reminder = await storage.createReminder(reminderData);
      res.status(201).json(reminder);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid reminder data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create reminder" });
    }
  });
  
  app.put("/api/reminders/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid reminder id" });
    }
    
    try {
      const updatedReminder = await storage.updateReminder(id, req.body);
      
      if (!updatedReminder) {
        return res.status(404).json({ message: "Reminder not found" });
      }
      
      res.json(updatedReminder);
    } catch (error) {
      res.status(500).json({ message: "Failed to update reminder" });
    }
  });
  
  app.delete("/api/reminders/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid reminder id" });
    }
    
    const success = await storage.deleteReminder(id);
    
    if (!success) {
      return res.status(404).json({ message: "Reminder not found" });
    }
    
    res.status(204).end();
  });
  
  return httpServer;
}
