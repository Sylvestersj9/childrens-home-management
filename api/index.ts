import { setupAuth } from '../server/auth';
import express, { NextFunction, Request, Response } from 'express';
import { storage } from '../server/storage';
import { z } from 'zod';
import cors from 'cors';
import { config } from 'dotenv';
import { insertResidentSchema, insertStaffSchema, insertDailyLogSchema, insertIncidentSchema, insertEventSchema, insertDocumentSchema } from "../shared/schema";

// Load environment variables
config();

// Create Express app
const app = express();

// Configure middleware
app.use(express.json());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.VERCEL_URL || '', /\.vercel\.app$/] 
    : 'http://localhost:5000',
  credentials: true
}));

// Initialize auth routes
setupAuth(app);

// Middleware to check authentication
const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

// Admin user setup
async function ensureAdminUser() {
  try {
    // Check if admin user exists
    console.log('Checking if admin user exists...');
    const admin = await storage.getUserByUsername('admin');
    
    if (!admin) {
      // Create admin user if not exists
      console.log('Creating admin user...');
      await storage.createUser({
        username: 'admin',
        password: '$2b$10$HkgFPTSqHBGDSVQ9ZYGYXeZJiQUxnww.bUrSVVx4zGAQoqb8PkUv6', // "password"
        email: 'admin@example.com',
        role: 'admin',
        name: 'Admin User'
      });
      console.log('Admin user created successfully!');
    }

    // Check if staff user exists
    console.log('Checking if staff user exists...');
    const staff = await storage.getUserByUsername('staff');
    
    if (!staff) {
      // Create staff user if not exists
      console.log('Creating staff user...');
      await storage.createUser({
        username: 'staff',
        password: '$2b$10$HkgFPTSqHBGDSVQ9ZYGYXeZJiQUxnww.bUrSVVx4zGAQoqb8PkUv6', // "password"
        email: 'staff@example.com',
        role: 'staff',
        name: 'Staff User'
      });
      console.log('Staff user created successfully!');
    }
  } catch (error) {
    console.error('Error ensuring admin user:', error);
  }
}

// Ensure admin user exists
ensureAdminUser();

// Residents routes
app.get("/api/residents", requireAuth, async (req, res) => {
  try {
    const residents = await storage.getAllResidents();
    res.json(residents);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch residents" });
  }
});

app.get("/api/residents/:id", requireAuth, async (req, res) => {
  try {
    const resident = await storage.getResident(parseInt(req.params.id));
    if (!resident) {
      return res.status(404).json({ message: "Resident not found" });
    }
    res.json(resident);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch resident" });
  }
});

app.post("/api/residents", requireAuth, async (req, res) => {
  try {
    const residentData = insertResidentSchema.parse(req.body);
    const resident = await storage.createResident(residentData);
    res.status(201).json(resident);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid resident data", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to create resident" });
  }
});

// Staff routes
app.get("/api/staff", requireAuth, async (req, res) => {
  try {
    const staff = await storage.getAllStaff();
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch staff" });
  }
});

app.get("/api/staff/:id", requireAuth, async (req, res) => {
  try {
    const staffMember = await storage.getStaffMember(parseInt(req.params.id));
    if (!staffMember) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    res.json(staffMember);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch staff member" });
  }
});

app.post("/api/staff", requireAuth, async (req, res) => {
  try {
    const staffData = insertStaffSchema.parse(req.body);
    const staffMember = await storage.createStaffMember(staffData);
    res.status(201).json(staffMember);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid staff data", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to create staff member" });
  }
});

// Daily logs routes
app.get("/api/daily-logs", requireAuth, async (req, res) => {
  try {
    const dailyLogs = await storage.getAllDailyLogs();
    res.json(dailyLogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch daily logs" });
  }
});

app.get("/api/daily-logs/:id", requireAuth, async (req, res) => {
  try {
    const dailyLog = await storage.getDailyLog(req.params.id);
    if (!dailyLog) {
      return res.status(404).json({ message: "Daily log not found" });
    }
    res.json(dailyLog);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch daily log" });
  }
});

app.post("/api/daily-logs", requireAuth, async (req, res) => {
  try {
    const logData = insertDailyLogSchema.parse(req.body);
    const dailyLog = await storage.createDailyLog(logData);
    res.status(201).json(dailyLog);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid log data", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to create daily log" });
  }
});

// Incidents routes
app.get("/api/incidents", requireAuth, async (req, res) => {
  try {
    const incidents = await storage.getAllIncidents();
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch incidents" });
  }
});

app.get("/api/incidents/:id", requireAuth, async (req, res) => {
  try {
    const incident = await storage.getIncident(req.params.id);
    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }
    res.json(incident);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch incident" });
  }
});

app.post("/api/incidents", requireAuth, async (req, res) => {
  try {
    const incidentData = insertIncidentSchema.parse(req.body);
    const incident = await storage.createIncident(incidentData);
    res.status(201).json(incident);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid incident data", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to create incident" });
  }
});

// Calendar events routes
app.get("/api/events", requireAuth, async (req, res) => {
  try {
    const events = await storage.getAllEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

app.get("/api/events/:id", requireAuth, async (req, res) => {
  try {
    const event = await storage.getEvent(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch event" });
  }
});

app.post("/api/events", requireAuth, async (req, res) => {
  try {
    const eventData = insertEventSchema.parse(req.body);
    const event = await storage.createEvent(eventData);
    res.status(201).json(event);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid event data", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to create event" });
  }
});

// Documents routes
app.get("/api/documents", requireAuth, async (req, res) => {
  try {
    const documents = await storage.getAllDocuments();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch documents" });
  }
});

app.get("/api/documents/:id", requireAuth, async (req, res) => {
  try {
    const document = await storage.getDocument(req.params.id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.json(document);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch document" });
  }
});

app.post("/api/documents", requireAuth, async (req, res) => {
  try {
    const documentData = insertDocumentSchema.parse(req.body);
    const document = await storage.createDocument(documentData);
    res.status(201).json(document);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid document data", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to create document" });
  }
});

// Import the AI service
import { generateIncidentSuggestions, processCustomPrompt, hasOpenAIAccess } from './ai-service';

// OpenAI integration routes
app.post("/api/ai/suggestions", requireAuth, async (req, res) => {
  try {
    const { incidentDescription } = req.body;
    
    if (!incidentDescription || typeof incidentDescription !== 'string') {
      return res.status(400).json({ 
        message: "Invalid request. Please provide an incident description." 
      });
    }
    
    // Generate suggestions using the AI service
    const suggestions = await generateIncidentSuggestions(incidentDescription);
    
    res.json({ suggestions, aiAvailable: hasOpenAIAccess() });
  } catch (error) {
    console.error("Error generating AI suggestions:", error);
    res.status(500).json({ message: "Failed to generate AI suggestions" });
  }
});

app.post("/api/ai/prompt", requireAuth, async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ 
        message: "Invalid request. Please provide a prompt." 
      });
    }
    
    // Process the custom prompt
    const response = await processCustomPrompt(prompt);
    
    res.json({ response, aiAvailable: hasOpenAIAccess() });
  } catch (error) {
    console.error("Error processing AI prompt:", error);
    res.status(500).json({ message: "Failed to process AI prompt" });
  }
});

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

// Export the Express API for serverless use
export default app;