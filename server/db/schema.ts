import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { timestamps } from "./helpers";
import { sql } from "drizzle-orm";

export const role = pgEnum("role", ["user", "admin"]);

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  email: varchar().notNull(),
  password: varchar().notNull(),
  role: role().notNull().default("user"),
  ...timestamps,
});

export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer().notNull(),
  token: varchar().notNull(),
  expiresAt: timestamp().notNull(),
});

export const sessions = pgTable("sessions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  // session: varchar().notNull(),
  userId: integer().notNull(),
  expiresAt: timestamp().notNull(),
  ...timestamps,
});

export const home = pgTable("home", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title1: varchar().notNull(),
  title2: varchar().notNull(),
  badge1: varchar().notNull(),
  badge2: varchar().notNull(),
  paragraph: varchar().notNull(),
  buttonText: varchar().notNull(),
  ...timestamps,
});

export const features = pgTable("features", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar().notNull(),
  subTitle: varchar().notNull(),
  feature1Title: varchar().notNull(),
  feature1Description: varchar().notNull(),
  feature2Title: varchar().notNull(),
  feature2Description: varchar().notNull(),
  feature3Title: varchar().notNull(),
  feature3Description: varchar().notNull(),
  ...timestamps,
});

export const footer = pgTable("footer", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar().notNull(),
  address: varchar().notNull(),
  email: varchar().notNull(),
  copyright: varchar().notNull(),
  facebook: varchar().notNull(),
  linkedIn: varchar().notNull(),

  ...timestamps,
});

export const services = pgTable("services", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar().notNull(),
  subTitle: varchar().notNull(),
  ...timestamps,
});

export const testimonial = pgTable("testimonial", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  heading: varchar().notNull(),
  paragraph: varchar().notNull(),
  testimony: varchar().notNull(),
  author: varchar().notNull(),
  ...timestamps,
});

export const serviceItems = pgTable("service_items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  serviceId: integer()
    .notNull()
    .references(() => services.id, { onDelete: "cascade" }),
  title: varchar().notNull(),
  summary: varchar().notNull(),
  description: varchar().notNull(),
  url: varchar().notNull(),

  ...timestamps,
});

export const infinite = pgTable("infinite", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar().notNull(),
  heading: varchar().notNull(),
  url: varchar().notNull(),
  ...timestamps,
});

export const contact = pgTable("contact", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar().notNull(),
  subTitle: varchar().notNull(),
  buttonLabel: varchar().notNull(),
  buttonLink: varchar().notNull(),
  ...timestamps,
});

export const career = pgTable("career", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  heroTitle: varchar().notNull(),
  title: varchar().notNull(),
  subTitle: varchar().notNull(),
  email: varchar().notNull(),
  ...timestamps,
});

export const jobs = pgTable("jobs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  jobStatus: varchar().notNull().default("published"),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
  }),
  position: varchar().notNull(),
  experience: varchar().notNull(),
  type: varchar().notNull(),
  educationLevel: varchar().notNull().default("none"),
  seniorityLevel: varchar().notNull().default("mid"),

  salaryType: varchar().notNull().default("negotiable"),
  salaryMin: varchar(),
  salaryMax: varchar(),
  salaryInterval: varchar(), // yearly | monthly | hourly
  isSalaryVisible: boolean().notNull().default(true),

  location: varchar().notNull(),
  summary: varchar().notNull(),
  keyResponsibilities: varchar()
    .array()
    .notNull()
    .default(sql`ARRAY[]::varchar[]`),
  qualifications: varchar()
    .array()
    .notNull()
    .default(sql`ARRAY[]::varchar[]`),
  benefits: varchar()
    .array()
    .notNull()
    .default(sql`ARRAY[]::varchar[]`),
  ...timestamps,
});

export const appliedJobs = pgTable("applied_jobs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  position: varchar().notNull(),
  name: varchar().notNull(),
  email: varchar().notNull(),
  phone: varchar().notNull(),
  location: varchar().notNull(),
  github: varchar(),
  linkedIn: varchar(),
  expectedSalary: varchar().notNull(),
  experience: varchar().notNull(),
  whyInterested: varchar().notNull(),
  keySkills: varchar(),
  coverLetter: varchar(),
  resumeUrl: varchar().notNull(),
  ...timestamps,
});

export const partner = pgTable("partner", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  bannerTitle: varchar().notNull(),
  bannerParagraph: varchar().notNull(),

  benefitTitle: varchar().notNull(),

  contactTitle: varchar().notNull(),
  contactParagraph: varchar().notNull(),

  email: varchar().notNull(),
  buttonLabel: varchar().notNull(),
  buttonLink: varchar().notNull(),

  ...timestamps,
});

export const partnerBenefits = pgTable("partner_benefits", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar().notNull(),
  description: varchar().notNull(),
  ...timestamps,
});

export const messages = pgTable("messages", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  email: varchar().notNull(),
  message: varchar().notNull(),
  ...timestamps,
});

export const settings = pgTable("settings", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  REGISTER_PIN: varchar().notNull(),

  SMTP_USER: varchar().notNull(),
  SMTP_PASS: varchar().notNull(),
  NEXT_PUBLIC_APP_URL: varchar().notNull(),
  NOTIFY_EMAIL: varchar().notNull(),
  NOTIFY_EMAIL_PASS: varchar().notNull(),
  PINATA_JWT: varchar().notNull(),
  NEXT_PUBLIC_GATEWAY_URL: varchar().notNull(),
  OPENAI_API_KEY: varchar().notNull(),
  ...timestamps,
});

export const aiSettings = pgTable("ai_settings", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  context: varchar().notNull(),
  questions: varchar()
    .array()
    .notNull()
    .default(sql`ARRAY[]::varchar[]`),

  ...timestamps,
});

// PINATA_JWT
// NEXT_PUBLIC_GATEWAY_URL
