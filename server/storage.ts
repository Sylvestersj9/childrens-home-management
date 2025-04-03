import {
  users, 
  type User, 
  type InsertUser,
  residents,
  type Resident,
  type InsertResident,
  staff,
  type Staff,
  type InsertStaff,
  dailyLogs,
  type DailyLog,
  type InsertDailyLog,
  incidents,
  type Incident,
  type InsertIncident,
  events,
  type Event,
  type InsertEvent,
  documents,
  type Document,
  type InsertDocument
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Resident management
  getAllResidents(): Promise<Resident[]>;
  getResident(id: number): Promise<Resident | undefined>;
  createResident(resident: InsertResident): Promise<Resident>;
  
  // Staff management
  getAllStaff(): Promise<Staff[]>;
  getStaffMember(id: number): Promise<Staff | undefined>;
  createStaffMember(staffMember: InsertStaff): Promise<Staff>;
  
  // Daily logs
  getAllDailyLogs(): Promise<DailyLog[]>;
  getDailyLog(id: string): Promise<DailyLog | undefined>;
  createDailyLog(dailyLog: InsertDailyLog): Promise<DailyLog>;
  
  // Incidents
  getAllIncidents(): Promise<Incident[]>;
  getIncident(id: string): Promise<Incident | undefined>;
  createIncident(incident: InsertIncident): Promise<Incident>;
  
  // Calendar events
  getAllEvents(): Promise<Event[]>;
  getEvent(id: string): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  // Documents
  getAllDocuments(): Promise<Document[]>;
  getDocument(id: string): Promise<Document | undefined>;
  createDocument(document: InsertDocument): Promise<Document>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private residents: Map<number, Resident>;
  private staffMembers: Map<number, Staff>;
  private dailyLogs: Map<string, DailyLog>;
  private incidents: Map<string, Incident>;
  private eventsMap: Map<string, Event>;
  private documents: Map<string, Document>;
  
  currentUserId: number;
  currentResidentId: number;
  currentStaffId: number;
  sessionStore: session.SessionStore;

  constructor() {
    this.users = new Map();
    this.residents = new Map();
    this.staffMembers = new Map();
    this.dailyLogs = new Map();
    this.incidents = new Map();
    this.eventsMap = new Map();
    this.documents = new Map();
    
    this.currentUserId = 1;
    this.currentResidentId = 1;
    this.currentStaffId = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
  }

  // User management
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase(),
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Resident management
  async getAllResidents(): Promise<Resident[]> {
    return Array.from(this.residents.values());
  }
  
  async getResident(id: number): Promise<Resident | undefined> {
    return this.residents.get(id);
  }
  
  async createResident(insertResident: InsertResident): Promise<Resident> {
    const id = this.currentResidentId++;
    const resident: Resident = { ...insertResident, id };
    this.residents.set(id, resident);
    return resident;
  }
  
  // Staff management
  async getAllStaff(): Promise<Staff[]> {
    return Array.from(this.staffMembers.values());
  }
  
  async getStaffMember(id: number): Promise<Staff | undefined> {
    return this.staffMembers.get(id);
  }
  
  async createStaffMember(insertStaff: InsertStaff): Promise<Staff> {
    const id = this.currentStaffId++;
    const staffMember: Staff = { ...insertStaff, id };
    this.staffMembers.set(id, staffMember);
    return staffMember;
  }
  
  // Daily logs
  async getAllDailyLogs(): Promise<DailyLog[]> {
    return Array.from(this.dailyLogs.values());
  }
  
  async getDailyLog(id: string): Promise<DailyLog | undefined> {
    return this.dailyLogs.get(id);
  }
  
  async createDailyLog(insertDailyLog: InsertDailyLog): Promise<DailyLog> {
    const id = crypto.randomUUID();
    const dailyLog: DailyLog = { ...insertDailyLog, id, timestamp: new Date().toISOString() };
    this.dailyLogs.set(id, dailyLog);
    return dailyLog;
  }
  
  // Incidents
  async getAllIncidents(): Promise<Incident[]> {
    return Array.from(this.incidents.values());
  }
  
  async getIncident(id: string): Promise<Incident | undefined> {
    return this.incidents.get(id);
  }
  
  async createIncident(insertIncident: InsertIncident): Promise<Incident> {
    const id = crypto.randomUUID();
    const incident: Incident = { ...insertIncident, id, timestamp: new Date().toISOString() };
    this.incidents.set(id, incident);
    return incident;
  }
  
  // Calendar events
  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.eventsMap.values());
  }
  
  async getEvent(id: string): Promise<Event | undefined> {
    return this.eventsMap.get(id);
  }
  
  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = crypto.randomUUID();
    const event: Event = { ...insertEvent, id };
    this.eventsMap.set(id, event);
    return event;
  }
  
  // Documents
  async getAllDocuments(): Promise<Document[]> {
    return Array.from(this.documents.values());
  }
  
  async getDocument(id: string): Promise<Document | undefined> {
    return this.documents.get(id);
  }
  
  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const id = crypto.randomUUID();
    const document: Document = { 
      ...insertDocument, 
      id, 
      uploadDate: new Date().toISOString() 
    };
    this.documents.set(id, document);
    return document;
  }
}

export const storage = new MemStorage();
