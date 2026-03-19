import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import multer from "multer";
import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import * as actionHandlers from "./action-handlers";
import * as dataHandlers from "./data";
import { registerAuthRoutes } from "./auth";
import { pinata } from "./pinata";
import { getSessionUser } from "./session";

export const app = express();

const upload = multer();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

registerAuthRoutes(app);

const dataRoutes: Record<string, () => Promise<unknown>> = {
  "/users": dataHandlers.getUserDetails,
  "/home": dataHandlers.getHomeDetails,
  "/features": dataHandlers.getFeatureDetails,
  "/services": dataHandlers.getServiccesDetails,
  "/testimonial": dataHandlers.getTestimonyDetails,
  "/infinite": dataHandlers.getInfiniteDetails,
  "/contact": dataHandlers.getContactDetails,
  "/career": dataHandlers.getCareerDetails,
  "/footer": dataHandlers.getFooterDetails,
  "/service-items": dataHandlers.getAllServices,
  "/jobs": dataHandlers.getAllJobs,
  "/jobs/all": dataHandlers.getAllDashobardJobs,
  "/jobs/applied": dataHandlers.getAppliedJobs,
  "/partner": dataHandlers.getPartnerDetails,
  "/partner-benefits": dataHandlers.getPartnerBenefits,
  "/messages": dataHandlers.getMessages,
  "/settings": dataHandlers.getSettingDetails,
  "/ai-settings": dataHandlers.getAiSettings,
};

for (const [path, handler] of Object.entries(dataRoutes)) {
  app.get(`/api/data${path}`, async (_req, res) => {
    try {
      res.json(await handler());
    } catch (error) {
      console.error(`Failed to load ${path}:`, error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
}

function entriesToFormData(entries: unknown): FormData {
  const formData = new FormData();

  if (Array.isArray(entries)) {
    for (const entry of entries) {
      if (Array.isArray(entry) && entry.length >= 2) {
        formData.append(String(entry[0]), String(entry[1]));
      }
    }
  }

  return formData;
}

app.post("/api/actions/deleteUser", async (req, res) => {
  try {
    const currentUser = await getSessionUser(req);
    const result = await actionHandlers.deleteUser(
      Number(req.body?.id),
      currentUser?.id
    );

    res.json(result);
  } catch (error) {
    console.error("Delete user failed:", error);
    res.status(500).json({ success: false, error: "Failed to delete user." });
  }
});

app.post("/api/actions/:name", async (req, res) => {
  const name = req.params.name as keyof typeof actionHandlers;
  const handler = actionHandlers[name];

  if (typeof handler !== "function") {
    return res.status(404).json({ error: "Unknown action." });
  }

  try {
    const formData = entriesToFormData(req.body?.entries);
    const result = await (
      handler as (state: unknown, formData: FormData) => Promise<unknown>
    )(undefined, formData);

    return res.json(result ?? { success: true });
  } catch (error) {
    console.error(`Action ${name} failed:`, error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/url", async (_req, res) => {
  try {
    const url = await pinata.upload.public.createSignedURL({ expires: 30 });
    return res.json({ url });
  } catch (error) {
    console.error("Signed URL failed:", error);
    return res.status(500).json({ error: "Error creating upload URL." });
  }
});

app.post("/api/files", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const file = new File([req.file.buffer], req.file.originalname, {
      type: req.file.mimetype,
    });
    const { cid } = await pinata.upload.public.file(file);
    const url = await pinata.gateways.public.convert(cid);
    return res.json(url);
  } catch (error) {
    console.error("File upload failed:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

async function pipeResponse(response: Response, res: express.Response) {
  res.status(response.status);
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  if (!response.body) {
    res.end();
    return;
  }

  const reader = response.body.getReader();

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    res.write(Buffer.from(value));
  }

  res.end();
}

app.post("/api/chat", async (req, res) => {
  try {
    const { messages }: { messages: UIMessage[] } = req.body;
    const [settings, cfg] = await Promise.all([
      dataHandlers.getAiSettings(),
      dataHandlers.getSettingDetails(),
    ]);

    const openai = createOpenAI({
      apiKey: cfg?.OPENAI_API_KEY,
    });

    const result = streamText({
      model: openai("gpt-4o-mini-2024-07-18"),
      system: settings?.context ?? "You are a helpful assistant.",
      messages: convertToModelMessages(messages),
      temperature: 1,
    });

    await pipeResponse(result.toUIMessageStreamResponse(), res);
  } catch (error) {
    console.error("Chat failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
