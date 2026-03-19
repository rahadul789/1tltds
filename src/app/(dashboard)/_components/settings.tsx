"use client";

import React, {
  useState,
  useEffect,
  useActionState,
  use,
  type ChangeEvent,
} from "react";
import { useFormStatus } from "react-dom";
import { updateSettings } from "@/app/lib/actions";
import {
  Settings as SettingsIcon,
  BotMessageSquare,
  Info,
  Edit,
  Loader2,
  KeyRound,
  Link,
  ShieldEllipsis,
  SquareAsterisk,
  Bell,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ContextSection } from "./context-section";
import QuestionList from "./question-list";

/* ------------------------------------------------------ */
/*                 Reusable SectionCard                   */
/* ------------------------------------------------------ */
const SectionCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: any;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="p-6 rounded-xl border bg-card shadow-sm space-y-3 hover:shadow-md transition">
    <div className="flex items-center gap-3">
      <div className="p-3 rounded-lg bg-brand-teal/20 text-brand-teal">
        <Icon size={20} />
      </div>
      <h2 className="text-sm font-semibold">{title}</h2>
    </div>
    {children}
  </div>
);

/* ------------------------------------------------------ */
/*           Per-form Save/Cancel with pending            */
/* ------------------------------------------------------ */
const SaveCancelButtons = ({
  onCancel,
  isChanged,
}: {
  onCancel: () => void;
  isChanged: boolean;
}) => {
  const { pending } = useFormStatus();

  return (
    <>
      <Button
        type="submit"
        disabled={!isChanged || pending}
        className="bg-brand-teal hover:bg-brand-teal/80 cursor-pointer"
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
      </Button>

      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={pending}
      >
        Cancel
      </Button>
    </>
  );
};

interface SettingsProps {
  settings: Promise<{
    id: number;
    REGISTER_PIN: string;
    SMTP_USER: string;
    SMTP_PASS: string;
    NEXT_PUBLIC_APP_URL: string;
    NOTIFY_EMAIL: string;
    NOTIFY_EMAIL_PASS: string;
    PINATA_JWT: string;
    NEXT_PUBLIC_GATEWAY_URL: string;
    OPENAI_API_KEY: string;
  }>;
  aiSettings: Promise<{ id: number; context: string; questions: string[] }>;
}

const SettingsSection = ({
  settings: item,
  aiSettings: allAiSettings,
}: SettingsProps) => {
  const settings = use(item);
  const aiSettings = use(allAiSettings);

  type EditableField =
    | "REGISTER_PIN"
    | "OPENAI_API_KEY"
    | "NOTIFY_EMAIL"
    | "NOTIFY_EMAIL_PASS"
    | "NEXT_PUBLIC_APP_URL";

  const [editingSection, setEditingSection] = useState<EditableField | null>(
    null
  );

  const [contextValue, setContextValue] = useState(aiSettings.context || "");

  const [formData, setFormData] = useState<Record<EditableField, string>>({
    REGISTER_PIN: settings.REGISTER_PIN || "",
    OPENAI_API_KEY: settings.OPENAI_API_KEY || "",
    NOTIFY_EMAIL: settings.NOTIFY_EMAIL || "",
    NOTIFY_EMAIL_PASS: settings.NOTIFY_EMAIL_PASS || "",
    NEXT_PUBLIC_APP_URL: settings.NEXT_PUBLIC_APP_URL || "",
  });

  // generic server action: updateSettings(previousState, formData: FormData)
  // we no longer use the global pending here
  const [state, action] = useActionState<any, FormData>(
    updateSettings,
    undefined
  );

  // curried handler so we can still know which field to update
  const handleOnChange =
    (field: EditableField) => (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  useEffect(() => {
    if (state?.success) {
      setEditingSection(null);
      toast.success("Settings updated successfully.");
    }
  }, [state]);

  const isRegisterPinChanged =
    formData.REGISTER_PIN.trim() !== (settings.REGISTER_PIN || "").trim();
  const isOpenAIKeyChanged =
    formData.OPENAI_API_KEY.trim() !== (settings.OPENAI_API_KEY || "").trim();
  const isNotifyEmailChanged =
    formData.NOTIFY_EMAIL.trim() !== (settings.NOTIFY_EMAIL || "").trim();
  const isNotifyEmailPassChanged =
    formData.NOTIFY_EMAIL_PASS.trim() !==
    (settings.NOTIFY_EMAIL_PASS || "").trim();
  const isAppUrlChanged =
    formData.NEXT_PUBLIC_APP_URL.trim() !==
    (settings.NEXT_PUBLIC_APP_URL || "").trim();

  return (
    <section className="my-8 w-full max-w-3xl">
      <Tabs defaultValue="general">
        {/* ------------------------------------------- */}
        {/*                 SETTINGS TABS               */}
        {/* ------------------------------------------- */}
        <TabsList>
          <TabsTrigger
            value="general"
            className="flex items-center gap-1 cursor-pointer"
          >
            <SettingsIcon size={14} /> General Settings
          </TabsTrigger>
          <TabsTrigger
            value="ai"
            className="flex items-center gap-1 cursor-pointer"
          >
            <BotMessageSquare size={14} /> AI Settings
          </TabsTrigger>
        </TabsList>

        {/* ------------------------------------------- */}
        {/*               GENERAL SETTINGS TAB          */}
        {/* ------------------------------------------- */}
        <TabsContent value="general">
          <div className="mt-6 space-y-6">
            {/* ------------------- Register PIN ------------------- */}
            <SectionCard icon={ShieldEllipsis} title="Register PIN">
              {editingSection !== "REGISTER_PIN" ? (
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-muted-foreground">
                    <p>{formData.REGISTER_PIN}</p>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full h-6 w-6"
                        >
                          <Info size={14} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          This PIN is required during new user registration.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      onClick={() => setEditingSection("REGISTER_PIN")}
                    >
                      <Edit size={16} />
                    </Button>
                  </div>
                </div>
              ) : (
                <form action={action} className="flex items-center gap-3">
                  {/* field name for server action */}
                  <input type="hidden" name="field" value="REGISTER_PIN" />

                  {/* value for server action */}
                  <Input
                    name="value"
                    value={formData.REGISTER_PIN}
                    onChange={handleOnChange("REGISTER_PIN")}
                    placeholder="Enter new PIN"
                  />

                  <SaveCancelButtons
                    isChanged={isRegisterPinChanged}
                    onCancel={() => {
                      setFormData((prev) => ({
                        ...prev,
                        REGISTER_PIN: settings.REGISTER_PIN || "",
                      }));
                      setEditingSection(null);
                    }}
                  />
                </form>
              )}
            </SectionCard>

            {/* ------------------- OpenAI API Key ------------------- */}
            <SectionCard icon={KeyRound} title="OpenAI API Key">
              {editingSection !== "OPENAI_API_KEY" ? (
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-muted-foreground">
                    <div className="max-w-full overflow-hidden">
                      <p className="break-all whitespace-normal">
                        {formData.OPENAI_API_KEY}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      onClick={() => setEditingSection("OPENAI_API_KEY")}
                    >
                      <Edit size={16} />
                    </Button>
                  </div>
                </div>
              ) : (
                <form action={action} className="flex items-center gap-3">
                  <input type="hidden" name="field" value="OPENAI_API_KEY" />

                  <Input
                    name="value"
                    value={formData.OPENAI_API_KEY}
                    onChange={handleOnChange("OPENAI_API_KEY")}
                    placeholder="Enter OpenAI API key"
                  />

                  <SaveCancelButtons
                    isChanged={isOpenAIKeyChanged}
                    onCancel={() => {
                      setFormData((prev) => ({
                        ...prev,
                        OPENAI_API_KEY: settings.OPENAI_API_KEY || "",
                      }));
                      setEditingSection(null);
                    }}
                  />
                </form>
              )}
            </SectionCard>

            {/* ------------------- Email Notification ------------------- */}
            <SectionCard icon={Bell} title="Email Notification">
              {editingSection !== "NOTIFY_EMAIL" ? (
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-muted-foreground">
                    <p>{formData.NOTIFY_EMAIL}</p>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full h-6 w-6"
                        >
                          <Info size={14} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          A mail will be sent to this email when a user applies
                          to a job.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      onClick={() => setEditingSection("NOTIFY_EMAIL")}
                    >
                      <Edit size={16} />
                    </Button>
                  </div>
                </div>
              ) : (
                <form action={action} className="flex items-center gap-3">
                  <input type="hidden" name="field" value="NOTIFY_EMAIL" />

                  <Input
                    name="value"
                    value={formData.NOTIFY_EMAIL}
                    onChange={handleOnChange("NOTIFY_EMAIL")}
                    placeholder="Enter notification email"
                  />

                  <SaveCancelButtons
                    isChanged={isNotifyEmailChanged}
                    onCancel={() => {
                      setFormData((prev) => ({
                        ...prev,
                        NOTIFY_EMAIL: settings.NOTIFY_EMAIL || "",
                      }));
                      setEditingSection(null);
                    }}
                  />
                </form>
              )}
            </SectionCard>

            {/* ------------------- Email Password ------------------- */}
            <SectionCard icon={SquareAsterisk} title="Email Password">
              {editingSection !== "NOTIFY_EMAIL_PASS" ? (
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-muted-foreground">
                    <p>{formData.NOTIFY_EMAIL_PASS}</p>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full h-6 w-6"
                        >
                          <Info size={14} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          This password is used to authenticate the notification
                          email account.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      onClick={() => setEditingSection("NOTIFY_EMAIL_PASS")}
                    >
                      <Edit size={16} />
                    </Button>
                  </div>
                </div>
              ) : (
                <form action={action} className="flex items-center gap-3">
                  <input type="hidden" name="field" value="NOTIFY_EMAIL_PASS" />

                  <Input
                    name="value"
                    value={formData.NOTIFY_EMAIL_PASS}
                    onChange={handleOnChange("NOTIFY_EMAIL_PASS")}
                    placeholder="Enter email password"
                  />

                  <SaveCancelButtons
                    isChanged={isNotifyEmailPassChanged}
                    onCancel={() => {
                      setFormData((prev) => ({
                        ...prev,
                        NOTIFY_EMAIL_PASS: settings.NOTIFY_EMAIL_PASS || "",
                      }));
                      setEditingSection(null);
                    }}
                  />
                </form>
              )}
            </SectionCard>

            {/* ------------------- Public App URL ------------------- */}
            <SectionCard icon={Link} title="Public App URL">
              {editingSection !== "NEXT_PUBLIC_APP_URL" ? (
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-muted-foreground">
                    <p>{formData.NEXT_PUBLIC_APP_URL}</p>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full h-6 w-6"
                        >
                          <Info size={14} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          URL where this app is accessible in the browser (e.g.
                          https://mama-roan.vercel.app). Used by client-side
                          code for redirects and links.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      onClick={() => setEditingSection("NEXT_PUBLIC_APP_URL")}
                    >
                      <Edit size={16} />
                    </Button>
                  </div>
                </div>
              ) : (
                <form action={action} className="flex items-center gap-3">
                  <input
                    type="hidden"
                    name="field"
                    value="NEXT_PUBLIC_APP_URL"
                  />

                  <Input
                    name="value"
                    value={formData.NEXT_PUBLIC_APP_URL}
                    onChange={handleOnChange("NEXT_PUBLIC_APP_URL")}
                    placeholder="Enter public app URL"
                  />

                  <SaveCancelButtons
                    isChanged={isAppUrlChanged}
                    onCancel={() => {
                      setFormData((prev) => ({
                        ...prev,
                        NEXT_PUBLIC_APP_URL: settings.NEXT_PUBLIC_APP_URL || "",
                      }));
                      setEditingSection(null);
                    }}
                  />
                </form>
              )}
            </SectionCard>
          </div>
        </TabsContent>

        {/* ------------------------------------------- */}
        {/*                   AI SETTINGS TAB           */}
        {/* ------------------------------------------- */}
        <TabsContent value="ai">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles size={16} /> AI Assistant Settings
              </CardTitle>
              <CardDescription>
                Configure how your AI behaves — context, instructions, and
                custom questions the assistant will always consider.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              <ContextSection value={contextValue} onChange={setContextValue} />

              <QuestionList aiSettings={aiSettings} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default SettingsSection;
