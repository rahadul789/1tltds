import { db } from "./db";
import {
  career,
  footer,
  home,
  jobs,
  partner,
  partnerBenefits,
  serviceItems,
  services,
  usersTable,
  features,
  testimonial,
  infinite,
  contact,
  appliedJobs,
  messages,
  settings,
  aiSettings,
} from "./db/schema";
import { and, eq, gte, isNull, or } from "drizzle-orm";

export const getUserDetails = async () => {
  const users = await db.select().from(usersTable);
  return users;
};

export const getHomeDetails = async () => {
  const [item] = await db.select().from(home);
  return item;
};

export const getFeatureDetails = async () => {
  const [item] = await db.select().from(features);
  return item;
};

export const getServiccesDetails = async () => {
  const [item] = await db.select().from(services);
  return item;
};

export const getTestimonyDetails = async () => {
  const [item] = await db.select().from(testimonial);
  return item;
};

export const getInfiniteDetails = async () => {
  const item = await db.select().from(infinite).orderBy(infinite.id);
  return item;
};

export const getContactDetails = async () => {
  const [item] = await db.select().from(contact);
  return item;
};

export const getCareerDetails = async () => {
  const [item] = await db.select().from(career);
  return item;
};
export const getFooterDetails = async () => {
  const [item] = await db.select().from(footer);
  return item;
};

export const getAllServices = async () => {
  const allServices = await db
    .select()
    .from(serviceItems)
    .orderBy(serviceItems.id);
  return allServices;
};

export const getAllJobs = async () => {
  const now = new Date();

  const allJobs = await db
    .select()
    .from(jobs)
    .where(
      and(
        eq(jobs.jobStatus, "published"),
        or(
          isNull(jobs.expiresAt), // show if no expiry
          gte(jobs.expiresAt, now) // show if still valid
        )
      )
    )
    .orderBy(jobs.id);

  return allJobs;
};

export const getAllDashobardJobs = async () => {
  const allJobs = await db.select().from(jobs).orderBy(jobs.id);
  return allJobs;
};

export const getAppliedJobs = async () => {
  const allJobs = await db.select().from(appliedJobs).orderBy(appliedJobs.id);
  return allJobs;
};

export const getPartnerDetails = async () => {
  const [item] = await db.select().from(partner);
  return item;
};

export const getPartnerBenefits = async () => {
  const items = await db
    .select()
    .from(partnerBenefits)
    .orderBy(partnerBenefits.id);
  return items;
};

export const getMessages = async () => {
  const item = await db.select().from(messages);
  return item;
};

export const getSettingDetails = async () => {
  const [item] = await db.select().from(settings).orderBy(settings.id);
  return item;
};

// AI CHATBOT

export const getAiSettings = async () => {
  const [item] = await db.select().from(aiSettings).orderBy(aiSettings.id);
  return item;
};
