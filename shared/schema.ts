import { pgTable, text, serial, integer, boolean, timestamp, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("staff"),
  name: text("name"),
  position: text("position"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  role: true,
  name: true,
  position: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Resident schema
export const residents = pgTable("residents", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  gender: text("gender").notNull(),
  room: text("room").notNull(),
  status: text("status").notNull().default("present"),
  admissionDate: text("admission_date").notNull(),
  photo: text("photo"),
  keyWorkerId: integer("key_worker_id").references(() => staff.id),
  notes: text("notes"),
  medicalInfo: jsonb("medical_info"),
  educationInfo: jsonb("education_info"),
  contactInfo: jsonb("contact_info"),
});

export const insertResidentSchema = createInsertSchema(residents).omit({
  id: true,
});

export type InsertResident = z.infer<typeof insertResidentSchema>;
export type Resident = typeof residents.$inferSelect;

// Staff schema
export const staff = pgTable("staff", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  photo: text("photo"),
  status: text("status").notNull().default("active"),
  qualifications: jsonb("qualifications"),
  certifications: jsonb("certifications"),
  startDate: text("start_date").notNull(),
  userId: integer("user_id").references(() => users.id),
});

export const insertStaffSchema = createInsertSchema(staff).omit({
  id: true,
});

export type InsertStaff = z.infer<typeof insertStaffSchema>;
export type Staff = typeof staff.$inferSelect;

// Daily Log schema
export const dailyLogs = pgTable("daily_logs", {
  id: text("id").primaryKey(),
  residentId: integer("resident_id").notNull().references(() => residents.id),
  residentName: text("resident_name").notNull(),
  staffId: integer("staff_id").references(() => staff.id),
  staffName: text("staff_name").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  category: text("category").notNull(),
  content: text("content").notNull(),
  important: boolean("important").notNull().default(false),
  mood: text("mood"),
  activities: jsonb("activities"),
  attachments: jsonb("attachments"),
});

export const insertDailyLogSchema = createInsertSchema(dailyLogs).omit({
  id: true,
  timestamp: true,
});

export type InsertDailyLog = z.infer<typeof insertDailyLogSchema>;
export type DailyLog = typeof dailyLogs.$inferSelect;

// Incident schema
export const incidents = pgTable("incidents", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  residentId: integer("resident_id").references(() => residents.id),
  residentName: text("resident_name").notNull(),
  reportedBy: integer("reported_by").references(() => staff.id),
  reportedByName: text("reported_by_name").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  category: text("category").notNull(),
  severity: text("severity").notNull(),
  status: text("status").notNull().default("open"),
  description: text("description").notNull(),
  actions: jsonb("actions"),
  witnesses: jsonb("witnesses"),
  followUp: jsonb("follow_up"),
  attachments: jsonb("attachments"),
});

export const insertIncidentSchema = createInsertSchema(incidents).omit({
  id: true,
  timestamp: true,
});

export type InsertIncident = z.infer<typeof insertIncidentSchema>;
export type Incident = typeof incidents.$inferSelect;

// Calendar Event schema
export const events = pgTable("events", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  start: timestamp("start").notNull(),
  end: timestamp("end").notNull(),
  allDay: boolean("all_day").notNull().default(false),
  type: text("type").notNull(),
  attendees: jsonb("attendees").notNull(),
  location: text("location"),
  createdBy: integer("created_by").references(() => staff.id),
  recurrence: jsonb("recurrence"),
  notifications: jsonb("notifications"),
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
});

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

// Document schema
export const documents = pgTable("documents", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  fileType: text("file_type").notNull(),
  category: text("category").notNull(),
  path: text("path").notNull(),
  uploadedBy: integer("uploaded_by").references(() => staff.id),
  uploadedByName: text("uploaded_by_name").notNull(),
  uploadDate: timestamp("upload_date").notNull().defaultNow(),
  size: text("size").notNull(),
  lastAccessed: timestamp("last_accessed"),
  restricted: boolean("restricted").notNull().default(false),
  tags: jsonb("tags"),
  metadata: jsonb("metadata"),
});

export const insertDocumentSchema = createInsertSchema(documents).omit({
  id: true,
  uploadDate: true,
});

export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type Document = typeof documents.$inferSelect;
