"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Mail,
  FileText,
  Users,
  Briefcase,
  ListChecks,
  MessageSquare,
  Layers,
  CheckCircle,
  ShieldAlert,
  NotebookText,
  Sparkles,
  KeyRound,
  Info,
  Radio,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default function DashboardOverview({
  summary,
  selected,
}: {
  summary: {
    usersCount: number;
    servicesCount: number;
    jobsCount: number;
    // jobsCountLive: number;
    // jobsCountDraft: number;
    liveJobsCount: number;
    inActiveJobsCount: number;
    appliedJobsCount: number;
    benefitsCount: number;
    messagesCount: number;
    settingsCount: number;
    aiQuestionsCount: number;
    footer: number;
  };
  selected: {
    address: {
      email: string;
      address: string;
      linkedIn: string;
      facebook: string;
    };
    ai: {
      questions: string[];
    };
    pin: string | number;
  };
}) {
  return (
    <div className="space-y-8 p-6">
      {/* TOP GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* LEFT PANEL */}
        <div className="xl:col-span-2 md:col-span-2 col-span-1 h-full ">
          <div className="border rounded-xl p-4 shadow-sm h-full flex flex-col gap-4 pb-8">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <div className="p-3 rounded-lg bg-brand-teal/20 text-brand-teal">
                <Briefcase className="text-brand-teal" size={22} />
              </div>
              <h2 className="leading-none font-semibold">Job Overview</h2>
            </div>

            {/* Grid inside */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              <JobTypeCard
                title="All Jobs"
                count={summary.jobsCount}
                icon={Layers}
                color="brand-teal"
              />
              <JobTypeCard
                title="Live Jobs"
                count={summary.liveJobsCount}
                icon={Radio}
                color="green"
              />
              <JobTypeCard
                title="Inactive Jobs"
                count={summary.inActiveJobsCount}
                icon={ShieldAlert}
                color="yellow"
              />
              <JobTypeCard
                title="Applied Jobs"
                count={summary.appliedJobsCount}
                icon={Users}
                color="blue"
              />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="xl:col-span-2 md:col-span-2 col-span-1 h-full">
          <div className="border rounded-xl p-4 shadow-sm h-full flex flex-col gap-4 pb-8">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <div className="p-3 rounded-lg bg-brand-teal/20 text-brand-teal">
                <Users className="text-brand-teal" size={22} />
              </div>
              <h2 className="leading-none font-semibold">System Metrics</h2>
            </div>

            {/* Grid inside */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              <MetricCard
                icon={Users}
                title="Total Users"
                value={summary.usersCount}
              />
              <MetricCard
                icon={ListChecks}
                title="Services"
                value={summary.servicesCount}
              />
              <MetricCard
                icon={CheckCircle}
                title="Partner Benefits"
                value={summary.benefitsCount}
              />
              <MetricCard
                icon={MessageSquare}
                title="Messages"
                value={summary.messagesCount}
              />
            </div>
          </div>
        </div>
      </div>

      {/* THREE PANEL LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* SYSTEM SETTINGS */}
        <Card className="border rounded-xl h-full flex flex-col">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="p-3 rounded-lg bg-brand-teal/20 text-brand-teal">
              <KeyRound size={22} />
            </div>
            <CardTitle>System Settings</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 flex-1">
            <div className="flex items-center justify-between">
              <InfoRow label="Security PIN" value={selected.pin} />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-transparent p-0 m-0"
                  >
                    <Info />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This PIN will be required during new user registration.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardContent>
        </Card>

        {/* AI QUESTIONS */}
        <Card className="border rounded-xl h-full flex flex-col">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="p-3 rounded-lg bg-brand-teal/20 text-brand-teal">
              <Sparkles size={22} />
            </div>
            <CardTitle>
              AI Custom Questions ({selected.ai.questions.length})
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-2 flex-1">
            {selected.ai.questions.length === 0 && (
              <p className="text-muted-foreground text-sm">
                No custom AI questions added yet.
              </p>
            )}

            {selected.ai.questions.map((q, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-muted/40 border text-sm"
              >
                {q}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* CONTACT DETAILS */}
        <Card className="border rounded-xl h-full flex flex-col">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="p-3 rounded-lg bg-brand-teal/20 text-brand-teal">
              <NotebookText size={22} />
            </div>
            <CardTitle>Contact Details</CardTitle>
          </CardHeader>

          <CardContent className="text-sm space-y-4 flex-1">
            <InfoRow label="Email" value={selected.address.email} />
            <InfoRow label="Address" value={selected.address.address} />
            <InfoRow label="LinkedIn" value={selected.address.linkedIn} />
            <InfoRow label="Facebook" value={selected.address.facebook} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* -------------------- COMPONENTS -------------------- */

function JobTypeCard({
  title,
  count,
  icon: Icon,
  color,
}: {
  title: string;
  count: number;
  icon: any;
  color: "brand-teal" | "green" | "yellow" | "blue";
}) {
  const colorMap: Record<string, string> = {
    "brand-teal": "bg-brand-teal/10 text-brand-teal",
    green: "bg-green-500/10 text-green-600",
    yellow: "bg-yellow-500/10 text-yellow-600",
    blue: "bg-blue-500/10 text-blue-600",
  };

  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition ">
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-lg ${colorMap[color]}`}>
          <Icon size={22} />
        </div>

        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold">{count}</p>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  title,
  value,
}: {
  icon: any;
  title: string;
  value: number;
}) {
  return (
    <Card className="rounded-xl border shadow-sm hover:shadow-md transition-all p-4">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-lg bg-brand-teal/20 text-brand-teal">
          <Icon size={20} />
        </div>

        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
      </div>
    </Card>
  );
}

function InfoRow({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-muted-foreground uppercase tracking-wide">
        {label}
      </span>

      {typeof value === "string" && value.startsWith("https") ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand-teal underline hover:opacity-80 transition break-words"
        >
          {value}
        </a>
      ) : (
        <span className="font-medium text-foreground">{value || "—"}</span>
      )}
    </div>
  );
}
