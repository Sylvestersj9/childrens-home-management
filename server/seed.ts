import { storage } from "./storage";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

export async function seedUsers() {
  console.log("Checking if admin user exists...");
  const adminExists = await storage.getUserByUsername("admin");
  
  if (!adminExists) {
    console.log("Creating admin user...");
    await storage.createUser({
      username: "admin",
      email: "admin@carehome.org",
      password: await hashPassword("admin123"),
      role: "admin",
      name: "Admin User",
      position: "System Administrator"
    });
    console.log("Admin user created successfully!");
  } else {
    console.log("Admin user already exists.");
  }

  console.log("Checking if staff user exists...");
  const staffExists = await storage.getUserByUsername("staff");
  
  if (!staffExists) {
    console.log("Creating staff user...");
    await storage.createUser({
      username: "staff",
      email: "staff@carehome.org",
      password: await hashPassword("staff123"),
      role: "staff",
      name: "Staff User",
      position: "Care Worker"
    });
    console.log("Staff user created successfully!");
  } else {
    console.log("Staff user already exists.");
  }
}