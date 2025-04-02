import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Network providers table
export const networks = pgTable("networks", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  slogan: text("slogan"),
  logo: text("logo")
});

// Data bundles table
export const bundles = pgTable("bundles", {
  id: serial("id").primaryKey(),
  networkId: integer("network_id").notNull(),
  name: text("name").notNull(),
  data: text("data").notNull(),
  duration: text("duration").notNull(),
  price: text("price").notNull(),
  code: text("code").notNull().unique()
});

// Orders table
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  bundleId: integer("bundle_id").notNull(),
  recipientNumber: text("recipient_number").notNull(),
  momoNetwork: text("momo_network").notNull(),
  momoWallet: text("momo_wallet").notNull(),
  status: text("status").notNull(),
  createdAt: text("created_at").notNull()
});

// Insert schemas
export const insertNetworkSchema = createInsertSchema(networks).pick({
  code: true,
  name: true,
  slogan: true,
  logo: true
});

export const insertBundleSchema = createInsertSchema(bundles).pick({
  networkId: true,
  name: true,
  data: true,
  duration: true,
  price: true,
  code: true
});

export const insertOrderSchema = createInsertSchema(orders).pick({
  bundleId: true,
  recipientNumber: true,
  momoNetwork: true,
  momoWallet: true,
  status: true,
  createdAt: true
});

// Define types
export type Network = typeof networks.$inferSelect;
export type InsertNetwork = z.infer<typeof insertNetworkSchema>;

export type Bundle = typeof bundles.$inferSelect;
export type InsertBundle = z.infer<typeof insertBundleSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

// Form validation schema
export const orderFormSchema = z.object({
  recipientNumber: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must not exceed 10 digits")
    .regex(/^\d+$/, "Phone number must contain only numbers"),
  bundleId: z.string().min(1, "Please select a data bundle"),
  momoNetwork: z.string().min(1, "Please select a payment network"),
  momoWallet: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must not exceed 10 digits")
    .regex(/^\d+$/, "Phone number must contain only numbers")
});
