import * as React from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  redirect,
  useLoaderData,
  useRouteError,
  useRouteLoaderData,
} from "react-router-dom";
import {
  Dock,
  Goal,
  Handshake,
  Home as HomeIcon,
  HomeIcon as HomeSectionIcon,
  IdCardLanyard,
  Infinity as InfinityIcon,
  LayoutDashboard,
  LucidePanelBottom,
  MessagesSquare,
  ReceiptText,
  Settings as SettingsIcon,
  UserRoundPen,
  Users as UsersIcon,
} from "lucide-react";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import AppNavbar from "@/app/(dashboard)/_components/app-navbar";
import { Toaster } from "@/components/ui/sonner";
import Chatbot from "@/app/(appfront)/_components/chatbot/chatbot";
import { NavbarDemo } from "@/app/(appfront)/_components/common/Navbar";
import FooterSection from "@/app/(appfront)/_components/common/footer2";
import Home from "@/app/(appfront)/_components/home";
import Features from "@/app/(appfront)/_components/features";
import Services from "@/app/(appfront)/_components/services";
import ContentSection from "@/app/(appfront)/_components/content";
import ServicesStrip from "@/app/(appfront)/_components/services-strip";
import CallToAction from "@/app/(appfront)/_components/cta";
import CareerInfo from "@/app/(appfront)/_components/career-info";
import Offerings from "@/app/(appfront)/_components/offerings";
import ServicesSection from "@/app/(appfront)/_components/services-section.page";
import PartnerInfo from "@/app/(appfront)/_components/partner-info";
import { Benefits } from "@/app/(appfront)/_components/benefits";
import ContactForm from "@/app/(appfront)/_components/contact-form";
import HomeSectionForm from "@/app/(dashboard)/_components/home-section-form";
import VisionSectionForm from "@/app/(dashboard)/_components/vision-section-form";
import TestimonySectionForm from "@/app/(dashboard)/_components/testimony-section-form";
import AddServiceModal from "@/app/(dashboard)/_components/add-service-modal";
import ServiceSection from "@/app/(dashboard)/_components/service-section";
import AddInfiniteModal from "@/app/(dashboard)/_components/add-infinite-modal";
import InfiniteSection from "@/app/(dashboard)/_components/infinite-section";
import ContactSectionForm from "@/app/(dashboard)/_components/contact-section-form";
import AddJobModal from "@/app/(dashboard)/_components/add-job-modal";
import CareerSection from "@/app/(dashboard)/_components/career-section";
import AddBenefitModal from "@/app/(dashboard)/_components/add-benefit-modal";
import ParterSection from "@/app/(dashboard)/_components/partner-sction";
import MessageList from "@/app/(dashboard)/_components/Message-list";
import FooterSectionForm from "@/app/(dashboard)/_components/footer-section-form";
import SettingsSection from "@/app/(dashboard)/_components/settings";
import DashboardOverview from "@/app/(dashboard)/_components/Dashboard-overview";
import UserSections from "@/app/(dashboard)/_components/users-section";
import { LoginForm } from "@/components/ui/login-form";
import { SignupForm } from "@/components/ui/signup-form";
import { ForgotPassword } from "@/app/(dashboard)/_components/forgot-password";
import { ResetPasswordForm } from "@/app/(dashboard)/_components/reset-password";
import {
  fetchCurrentUser,
} from "@/app/lib/api";
import {
  getAiSettings,
  getAllDashobardJobs,
  getAllJobs,
  getAllServices,
  getAppliedJobs,
  getCareerDetails,
  getContactDetails,
  getFeatureDetails,
  getFooterDetails,
  getHomeDetails,
  getInfiniteDetails,
  getMessages,
  getPartnerBenefits,
  getPartnerDetails,
  getServiccesDetails,
  getSettingDetails,
  getTestimonyDetails,
  getUserDetails,
} from "@/app/lib/data";

type DashboardUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type ServiceItem = {
  id: number;
};

type DashboardJob = {
  id: number;
  jobStatus: string;
  expiresAt: string | Date | null;
};

type AppliedJobRecord = {
  id: number;
};

type PartnerBenefit = {
  id: number;
};

type MessageRecord = {
  id: number;
};

type SiteSettings = {
  REGISTER_PIN: string;
};

type AiSettings = {
  questions: string[];
};

type FooterData = {
  email: string;
  address: string;
  linkedIn: string;
  facebook: string;
};

function DashboardSectionHeader({
  icon: Icon,
  title,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
}) {
  return (
    <div className="flex items-center gap-1 border-b border-dashed mb-10 pb-2">
      <div className="p-[6px] rounded-lg bg-brand-teal/20 text-brand-teal">
        <Icon className="w-4 h-4" />
      </div>
      <h1 className="text-md font-semibold tracking-tight">{title}</h1>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-2xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground">
        The page you are looking for does not exist in the React version.
      </p>
    </div>
  );
}

function RouteErrorPage() {
  const error = useRouteError() as Error | string | undefined;
  const message =
    typeof error === "string"
      ? error
      : error?.message ?? "Something went wrong while loading this page.";

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-2xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-3xl font-semibold">Something went wrong</h1>
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}

async function publicLayoutLoader() {
  const [footer, aiSettings] = await Promise.all([
    getFooterDetails(),
    getAiSettings(),
  ]);

  return { footer, aiSettings };
}

async function requireAuthLoader() {
  const user = await fetchCurrentUser<{
    id: number;
    name: string;
    email: string;
    role: string;
  }>();

  if (!user) {
    throw redirect("/1tltd-login");
  }

  return user;
}

async function guestOnlyLoader() {
  const user = await fetchCurrentUser();

  if (user) {
    throw redirect("/dashboard");
  }

  return null;
}

function PublicLayout() {
  const { footer, aiSettings } = useLoaderData() as {
    footer: any;
    aiSettings: any;
  };

  return (
    <div>
      {aiSettings && <Chatbot settings={aiSettings} />}
      <NavbarDemo>
        <Outlet />
        <Toaster position="top-right" richColors />
      </NavbarDemo>
      {footer && <FooterSection data={footer} />}
    </div>
  );
}

function DashboardLayout() {
  const user = useLoaderData() as {
    id: number;
    name: string;
    email: string;
    role: string;
  } | null;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full px-2 md:px-8">
          <div className="sticky top-2">
            <AppNavbar user={user} />
          </div>
          <Outlet />
          <Toaster position="top-right" richColors />
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}

function HomePage() {
  const data = useLoaderData() as any;

  return (
    <div>
      <div className="space-y-12 md:space-y-16">
        <Home data={data.home} />
        <Features data={data.features} />
      </div>
      <div id="services">
        <Services data={data.services} services={data.serviceList} />
      </div>
      <ContentSection data={data.testimony} />
      <div className="max-w-6xl mx-auto">
        <ServicesStrip data={data.infiniteSlider} />
      </div>
      <CallToAction data={data.contact} />
    </div>
  );
}

function CareerPage() {
  const { career, jobs } = useLoaderData() as any;

  return (
    <div className="max-w-7xl mx-auto px-4 py-2">
      <CareerInfo career={career} />
      <Offerings career={career} jobs={jobs} />
    </div>
  );
}

function ServicesPage() {
  const { services, serviceList } = useLoaderData() as any;
  return <ServicesSection data={services} services={serviceList} />;
}

function PartnerPage() {
  const { partner, partnerBenefits } = useLoaderData() as any;

  return (
    <div className="max-w-7xl mx-auto px-4 py-2">
      <PartnerInfo partner={partner} partnerBenefits={partnerBenefits} />
      <Benefits partners={partner} partnerBenefits={partnerBenefits} />
    </div>
  );
}

function ContactUsPage() {
  return <ContactForm />;
}

function DashboardHomePage() {
  const data = useLoaderData() as any;

  return (
    <div className="mt-8">
      <DashboardSectionHeader icon={HomeSectionIcon} title="Home Section" />
      <HomeSectionForm item={Promise.resolve(data)} />
    </div>
  );
}

function DashboardVisionPage() {
  const data = useLoaderData() as any;

  return (
    <div className="mt-8">
      <DashboardSectionHeader icon={Goal} title="Features Section" />
      <VisionSectionForm item={Promise.resolve(data)} />
    </div>
  );
}

function DashboardTestimonyPage() {
  const data = useLoaderData() as any;

  return (
    <div className="mt-8">
      <DashboardSectionHeader icon={UserRoundPen} title="Testimony Section" />
      <TestimonySectionForm item={Promise.resolve(data)} />
    </div>
  );
}

function DashboardServicesPage() {
  const { item, allServices } = useLoaderData() as any;

  return (
    <div className="mt-8">
      <DashboardSectionHeader icon={Dock} title="Service Section" />
      <AddServiceModal />
      <ServiceSection
        item={Promise.resolve(item)}
        allServices={Promise.resolve(allServices)}
      />
    </div>
  );
}

function DashboardInfinitePage() {
  const items = useLoaderData() as any[];
  const heading = items[0]?.heading || "Powering modern banking";

  return (
    <div className="mt-8">
      <DashboardSectionHeader icon={InfinityIcon} title="Infinite Section" />
      <AddInfiniteModal heading={heading} />
      <InfiniteSection items={Promise.resolve(items)} />
    </div>
  );
}

function DashboardContactPage() {
  const data = useLoaderData() as any;

  return (
    <div className="mt-8">
      <DashboardSectionHeader icon={ReceiptText} title="Contact Section" />
      <ContactSectionForm item={Promise.resolve(data)} />
    </div>
  );
}

function DashboardCareerPage() {
  const { item, jobs, appliedJobs } = useLoaderData() as any;

  return (
    <div className="my-8">
      <DashboardSectionHeader icon={IdCardLanyard} title="Career Section" />
      <AddJobModal />
      <CareerSection
        item={Promise.resolve(item)}
        allJobs={Promise.resolve(jobs)}
        appliedJobs={Promise.resolve(appliedJobs)}
      />
    </div>
  );
}

function DashboardPartnerPage() {
  const { item, benefits } = useLoaderData() as any;

  return (
    <div className="my-8">
      <DashboardSectionHeader icon={Handshake} title="Partner Section" />
      <AddBenefitModal />
      <ParterSection
        item={Promise.resolve(item)}
        benefits={Promise.resolve(benefits)}
      />
    </div>
  );
}

function DashboardMessagesPage() {
  const messages = useLoaderData() as any;

  return (
    <div className="mt-8">
      <DashboardSectionHeader icon={MessagesSquare} title="Messages Section" />
      <MessageList allMessages={Promise.resolve(messages)} />
    </div>
  );
}

function DashboardFooterPage() {
  const data = useLoaderData() as any;

  return (
    <div className="mt-8">
      <DashboardSectionHeader
        icon={LucidePanelBottom}
        title="Footer Section"
      />
      <FooterSectionForm item={Promise.resolve(data)} />
    </div>
  );
}

function DashboardSettingsPage() {
  const { settings, aiSettings } = useLoaderData() as any;

  return (
    <div className="mt-8">
      <DashboardSectionHeader icon={SettingsIcon} title="Settings Section" />
      <SettingsSection
        settings={Promise.resolve(settings)}
        aiSettings={Promise.resolve(aiSettings)}
      />
    </div>
  );
}

function DashboardUsersPage() {
  const users = useLoaderData() as any[];
  const currentUser = useRouteLoaderData("dashboard") as any;

  return (
    <div className="mt-8">
      <DashboardSectionHeader icon={UsersIcon} title="Users Section" />
      <UserSections users={users} currentUserId={currentUser?.id ?? 0} />
    </div>
  );
}

function DashboardOverviewPage() {
  const { summary, selected } = useLoaderData() as any;
  return <DashboardOverview summary={summary} selected={selected} />;
}

function LoginPage() {
  return <LoginForm />;
}

function SignupPage() {
  return <SignupForm />;
}

function ForgotPasswordPage() {
  return <ForgotPassword />;
}

function ResetPasswordPage() {
  const { token } = useLoaderData() as { token: string };
  return <ResetPasswordForm token={token} />;
}

export const router = createBrowserRouter([
  {
    loader: publicLayoutLoader,
    element: <PublicLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        index: true,
        loader: async () => {
          const [
            home,
            features,
            services,
            serviceList,
            testimony,
            infiniteSlider,
            contact,
          ] = await Promise.all([
            getHomeDetails(),
            getFeatureDetails(),
            getServiccesDetails(),
            getAllServices(),
            getTestimonyDetails(),
            getInfiniteDetails(),
            getContactDetails(),
          ]);

          return {
            home,
            features,
            services,
            serviceList,
            testimony,
            infiniteSlider,
            contact,
          };
        },
        element: <HomePage />,
      },
      {
        path: "career",
        loader: async () => {
          const [career, jobs] = await Promise.all([
            getCareerDetails(),
            getAllJobs(),
          ]);

          return { career, jobs };
        },
        element: <CareerPage />,
      },
      {
        path: "services",
        loader: async () => {
          const [services, serviceList] = await Promise.all([
            getServiccesDetails(),
            getAllServices(),
          ]);

          return { services, serviceList };
        },
        element: <ServicesPage />,
      },
      {
        path: "partner",
        loader: async () => {
          const [partner, partnerBenefits] = await Promise.all([
            getPartnerDetails(),
            getPartnerBenefits(),
          ]);

          return { partner, partnerBenefits };
        },
        element: <PartnerPage />,
      },
      {
        path: "contact-us",
        element: <ContactUsPage />,
      },
    ],
  },
  {
    id: "dashboard",
    path: "dashboard",
    loader: requireAuthLoader,
    element: <DashboardLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        index: true,
        loader: async () => {
          const [
            users,
            services,
            jobs,
            appliedJobs,
            benefits,
            messages,
            settings,
            aiSettings,
            footer,
          ] = (await Promise.all([
            getUserDetails(),
            getAllServices(),
            getAllDashobardJobs(),
            getAppliedJobs(),
            getPartnerBenefits(),
            getMessages(),
            getSettingDetails(),
            getAiSettings(),
            getFooterDetails(),
          ])) as [
            DashboardUser[],
            ServiceItem[],
            DashboardJob[],
            AppliedJobRecord[],
            PartnerBenefit[],
            MessageRecord[],
            SiteSettings | undefined,
            AiSettings | undefined,
            FooterData | undefined,
          ];

          const now = new Date();
          const liveJobs = jobs.filter((job) => {
            const expires = job.expiresAt ? new Date(job.expiresAt) : null;
            return (
              job.jobStatus === "published" &&
              (expires === null || expires >= now)
            );
          });
          const inactiveJobs = jobs.filter((job) => {
            const expires = job.expiresAt ? new Date(job.expiresAt) : null;
            return job.jobStatus === "draft" || (expires !== null && expires < now);
          });

          return {
            summary: {
              usersCount: users?.length ?? 0,
              servicesCount: services?.length ?? 0,
              allJobsCount: jobs?.length ?? 0,
              jobsCount: jobs?.length ?? 0,
              liveJobsCount: liveJobs.length,
              inActiveJobsCount: inactiveJobs.length,
              appliedJobsCount: appliedJobs?.length ?? 0,
              benefitsCount: benefits?.length ?? 0,
              messagesCount: messages?.length ?? 0,
              settingsCount: settings ? 1 : 0,
              aiQuestionsCount: aiSettings?.questions?.length ?? 0,
              footer: users?.length ?? 0,
            },
            selected: {
              address: {
                email: footer?.email ?? "",
                address: footer?.address ?? "",
                linkedIn: footer?.linkedIn ?? "",
                facebook: footer?.facebook ?? "",
              },
              ai: {
                questions: aiSettings?.questions?.map((q) => q) ?? [],
              },
              pin: settings?.REGISTER_PIN,
            },
          };
        },
        element: <DashboardOverviewPage />,
      },
      {
        path: "home",
        loader: getHomeDetails,
        element: <DashboardHomePage />,
      },
      {
        path: "vision",
        loader: getFeatureDetails,
        element: <DashboardVisionPage />,
      },
      {
        path: "services",
        loader: async () => {
          const [item, allServices] = await Promise.all([
            getServiccesDetails(),
            getAllServices(),
          ]);

          return { item, allServices };
        },
        element: <DashboardServicesPage />,
      },
      {
        path: "testimony",
        loader: getTestimonyDetails,
        element: <DashboardTestimonyPage />,
      },
      {
        path: "infinite",
        loader: getInfiniteDetails,
        element: <DashboardInfinitePage />,
      },
      {
        path: "contact",
        loader: getContactDetails,
        element: <DashboardContactPage />,
      },
      {
        path: "career",
        loader: async () => {
          const [item, jobs, appliedJobs] = await Promise.all([
            getCareerDetails(),
            getAllDashobardJobs(),
            getAppliedJobs(),
          ]);

          return { item, jobs, appliedJobs };
        },
        element: <DashboardCareerPage />,
      },
      {
        path: "partner",
        loader: async () => {
          const [item, benefits] = await Promise.all([
            getPartnerDetails(),
            getPartnerBenefits(),
          ]);

          return { item, benefits };
        },
        element: <DashboardPartnerPage />,
      },
      {
        path: "messages",
        loader: getMessages,
        element: <DashboardMessagesPage />,
      },
      {
        path: "footer",
        loader: getFooterDetails,
        element: <DashboardFooterPage />,
      },
      {
        path: "users",
        loader: getUserDetails,
        element: <DashboardUsersPage />,
      },
      {
        path: "settings",
        loader: async () => {
          const [settings, aiSettings] = await Promise.all([
            getSettingDetails(),
            getAiSettings(),
          ]);

          return { settings, aiSettings };
        },
        element: <DashboardSettingsPage />,
      },
      {
        path: "navbar",
        element: <Navigate to="/dashboard" replace />,
      },
    ],
  },
  {
    loader: guestOnlyLoader,
    errorElement: <RouteErrorPage />,
    children: [
      { path: "1tltd-login", element: <LoginPage /> },
      { path: "1tltd-signup", element: <SignupPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      {
        path: "reset-password",
        loader: async ({ request }) => ({
          token: new URL(request.url).searchParams.get("token") || "",
        }),
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
