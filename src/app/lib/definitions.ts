import { Copyright } from "lucide-react";
import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  pin: z.string().min(2, { message: "Pin is required" }).trim(),
  password: z
    .string()
    .min(4, { message: "Be at least 4 characters long" })
    // .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    // .regex(/[0-9]/, { message: "Contain at least one number." })
    // .regex(/[^a-zA-Z0-9]/, {
    //   message: "Contain at least one special character.",
    // })
    .trim(),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        pin?: string[];
      };
      message?: string;
    }
  | undefined;

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().trim(),
});

export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export const ChangePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(4, { message: "Old password required." })
      .trim(),
    newPassword: z
      .string()
      .min(4, { message: "Be at least 4 characters long." })
      // .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      // .regex(/[0-9]/, { message: "Contain at least one number." })
      // .regex(/[^a-zA-Z0-9]/, {
      //   message: "Contain at least one special character.",
      // })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords did not match.",
  });

export type ChangePasswordFormState =
  | {
      errors?: {
        oldPassword?: string[];
        newPassword?: string[];
        confirmPassword?: string[];
      };
      message?: string;
    }
  | undefined;

export interface SessionPayload {
  userId: number; // unique identifier for user
  email?: string; // user’s email
  role?: string; // optional role (admin, user, etc.)
  name?: string; // optional display name
  iat?: number; // issued at (set automatically by jose)
  exp?: number; // expiration time (set automatically by jose)
  expiresAt: Date;
  sessionId?: Date;
  [key: string]: unknown; // allow extension if needed
}

export const homeFormSchema = z.object({
  badge1: z.string().min(1, { message: "Field can not be empty." }).trim(),
  badge2: z.string().min(1, { message: "Field can not be empty." }).trim(),
  title1: z.string().min(1, { message: "Field can not be empty." }).trim(),
  title2: z.string().min(1, { message: "Field can not be empty." }).trim(),
  paragraph: z.string().min(1, { message: "Field can not be empty." }).trim(),
  buttonText: z.string().min(1, { message: "Field can not be empty." }).trim(),
});

export type HomeFormState =
  | {
      errors?: {
        badge1?: string[];
        badge2?: string[];
        title1?: string[];
        title2?: string[];
        paragraph?: string[];
        buttonText?: string[];
      };
      message?: string;
    }
  | undefined;

export const contactFormSchema = z.object({
  title: z.string().min(1, { message: "Title can not be empty." }).trim(),
  subTitle: z
    .string()
    .min(1, { message: "Sub Title can not be empty." })
    .trim(),
  buttonLabel: z
    .string()
    .min(1, { message: "Button Label can not be empty." })
    .trim(),
  buttonLink: z
    .string()
    .min(1, { message: "Button Link can not be empty." })
    .trim(),
});

export type ContactFormState =
  | {
      errors?: {
        title?: string[];
        subTitle?: string[];
        buttonLabel?: string[];
        buttonLink?: string[];
      };
      message?: string;
    }
  | undefined;

export const featuresFormSchema = z.object({
  title: z.string().min(1, { message: "Field can not be empty." }).trim(),
  subTitle: z.string().min(1, { message: "Field can not be empty." }).trim(),

  feature1Title: z
    .string()
    .min(1, { message: "Field can not be empty." })
    .trim(),
  feature1Description: z
    .string()
    .min(1, { message: "Field can not be empty." })
    .trim(),

  feature2Title: z
    .string()
    .min(1, { message: "Field can not be empty." })
    .trim(),
  feature2Description: z
    .string()
    .min(1, { message: "Field can not be empty." })
    .trim(),

  feature3Title: z
    .string()
    .min(1, { message: "Field can not be empty." })
    .trim(),
  feature3Description: z
    .string()
    .min(1, { message: "Field can not be empty." })
    .trim(),
});

export type FeaturesFormState =
  | {
      errors?: {
        title?: string[];
        subTitle?: string[];
        feature1Title?: string[];
        feature1Description?: string[];
        feature2Title?: string[];
        feature2Description?: string[];
        feature3Title?: string[];
        feature3Description?: string[];
      };
      message?: string;
    }
  | undefined;

export const serviceFormSchema = z.object({
  title: z.string().min(1, { message: "Title can not be empty." }).trim(),
  subTitle: z
    .string()
    .min(1, { message: "Sub title can not be empty." })
    .trim(),
});

export type ServiceFormState =
  | {
      errors?: {
        title?: string[];
        subTitle?: string[];
      };
      message?: string;
    }
  | undefined;

export const serviceItemFormSchema = z.object({
  id: z.coerce.number().int().positive(),
  title: z.string().min(1, { message: "Title can not be empty." }).trim(),
  summary: z.string().min(1, { message: "Summary can not be empty." }).trim(),
  url: z.string().min(1, { message: "Image is required." }).trim(),
  description: z
    .string()
    .min(1, { message: "Description can not be empty." })
    .trim(),
});

export type ServiceItemFormState =
  | {
      errors?: {
        id?: string[];
        title?: string[];
        summary?: string[];
        description?: string[];
        url?: string[];
      };
      message?: string;
    }
  | undefined;

export const testimonyFormSchema = z.object({
  heading: z.string().min(1, { message: "Field can not be empty." }).trim(),
  paragraph: z.string().min(1, { message: "Field can not be empty." }).trim(),
  testimony: z.string().min(1, { message: "Field can not be empty." }).trim(),
  author: z.string().min(1, { message: "Field can not be empty." }).trim(),
});

export type TestimonyFormState =
  | {
      errors?: {
        heading?: string[];
        paragraph?: string[];
        testimony?: string[];
        author?: string[];
      };
      message?: string;
    }
  | undefined;

export const AddServiceFormSchema = z.object({
  title: z.string().min(1, { message: "Title can not be empty." }).trim(),
  summary: z.string().min(1, { message: "Summary can not be empty." }).trim(),
  url: z.string().min(1, { message: "Image is required" }).trim(),

  description: z
    .string()
    .min(1, { message: "Description can not be empty." })
    .trim(),
});

export type AddServiceFormState =
  | {
      errors?: {
        title?: string[];
        summary?: string[];
        description?: string[];
        url?: string[];
      };
      message?: string;
    }
  | undefined;

export const AddInfiniteItemsFormSchema = z.object({
  title: z.string().min(1, { message: "Title can not be empty." }).trim(),
  heading: z.string().min(1, { message: "Heading can not be empty." }).trim(),
  url: z.string().min(1, { message: "Image is required" }).trim(),
});

export const updateInfiniteItemsFormSchema = z.object({
  id: z.coerce.number().int().positive(), //// pore remove this if not needed

  title: z.string().min(1, { message: "Title can not be empty." }).trim(),
  url: z.string(),
  // tempUrl: z.string(),
  // deletedUrl: z.string(),
});

export type AddInfiniteItemsFormState =
  | {
      errors?: {
        title?: string[];
        heading?: string[];
        url?: string[];
      };
      message?: string;
    }
  | undefined;

export type AddInfiniteItemsHeadingFormState =
  | {
      errors?: {
        heading?: string[];
      };
      message?: string;
    }
  | undefined;

export const addInfiniteItemsHeadingFormSchema = z.object({
  heading: z.string().min(1, { message: "Heading can not be empty." }).trim(),
});

export const DeleteInfiniteItemFormSchema = z.object({
  id: z.coerce.number().int().positive(),
  url: z.string().min(1, { message: "Image cannot be empty." }).trim(),
});

export type DeleteInfiniteItemFormState =
  | {
      errors?: {
        id?: string[];
        url?: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;

export const DeleteServiceFormSchema = z.object({
  id: z.coerce.number().int().positive(),
  url: z.string().min(1, { message: "Image cannot be empty." }).trim(),
});

export type DeleteServiceFormState =
  | {
      errors?: { id?: string[]; url?: string[] };
      message?: string;
      success?: boolean;
    }
  | undefined;

export const careerFormSchema = z.object({
  heroTitle: z
    .string()
    .min(1, { message: "Hero Title can not be empty." })
    .trim(),
  title: z.string().min(1, { message: "Title can not be empty." }).trim(),
  email: z.string().min(1, { message: "Email can not be empty." }).trim(),
  subTitle: z
    .string()
    .min(1, { message: "Sub title can not be empty." })
    .trim(),
});

export type CareerFormState =
  | {
      errors?: {
        heroTitle?: string[];
        title?: string[];
        subTitle?: string[];
        email?: string[];
      };
      message?: string;
    }
  | undefined;

export const AddJobFormSchema = z.object({
  jobStatus: z.string().min(1).trim(),
  expiresAt: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val ? new Date(val) : null)),
  educationLevel: z.string().min(1).trim(),
  seniorityLevel: z.string().min(1).trim(),

  salaryType: z
    .string()
    .min(1, { message: "Salary type cannot be empty." })
    .trim(),
  salaryMin: z
    .string()
    .optional()
    .transform((v) => (v === "" ? null : v)),
  salaryMax: z
    .string()
    .optional()
    .transform((v) => (v === "" ? null : v)),
  salaryInterval: z
    .string()
    .optional()
    .transform((v) => (v === "" ? null : v)),
  isSalaryVisible: z.string().min(1).trim(),

  position: z.string().min(1, { message: "Position cannot be empty." }).trim(),
  experience: z
    .string()
    .min(1, { message: "Experience cannot be empty." })
    .trim(),
  type: z.string().min(1).trim(),

  location: z.string().min(1, { message: "Location cannot be empty." }).trim(),
  summary: z.string().min(1, { message: "Summary cannot be empty." }).trim(),
  hasExpiry: z.string(),

  keyResponsibilities: z.array(z.string().min(1).trim()).default([]),
  qualifications: z.array(z.string().min(1).trim()).default([]),
  benefits: z.array(z.string().min(1).trim()).default([]),
});

export type AddJobFormState =
  | {
      errors?: {
        jobStatus?: string[];
        expiresAt?: string[];
        educationLevel?: string[];
        seniorityLevel?: string[];
        salaryType?: string[];
        salaryMin?: string[];
        salaryMax?: string[];
        salaryInterval?: string[];
        isSalaryVisible?: string[];
        position?: string[];
        hasExpire?: string[];
        experience?: string[];
        type?: string[];
        salaryRange?: string[];
        location?: string[];
        summary?: string[];
        keyResponsibilities?: string[];
        qualifications?: string[];
        benefits?: string[];
      };
      messages?: boolean;
    }
  | undefined;

//////////////////////// JOB
export const positionFormSchema = z.object({
  id: z.coerce.number().int().positive(),
  position: z.string().min(1, { message: "Position can not be empty." }).trim(),
});

export type PositionFormState =
  | {
      errors?: {
        id?: string[];
        position?: string[];
      };
      message?: string;
    }
  | undefined;

// UPDATE EXPIRE TIME
export const expireTimeFormSchema = z.object({
  id: z.coerce.number().int().positive(),
  // expiresAt: z.string().min(1, { message: "expire date is required." }).trim(),
});

export type ExpireTimeFormState =
  | {
      errors?: {
        id?: string[];
        // expiresAt?: string[];
      };
      message?: string;
    }
  | undefined;

export const experienceFormSchema = z.object({
  id: z.coerce.number().int().positive(),
  experience: z
    .string()
    .min(1, { message: "Experience can not be empty." })
    .trim(),
});

export type ExperienceFormState =
  | {
      errors?: {
        id?: string[];
        experience?: string[];
      };
      message?: string;
    }
  | undefined;

export const jobTypeFormSchema = z.object({
  id: z.coerce.number().int().positive(),
  type: z.string().min(1, { message: "Job type can not be empty." }).trim(),
});

export type JobTypeFormState =
  | {
      errors?: {
        id?: string[];
        type?: string[];
      };
      message?: string;
    }
  | undefined;

export const educationLevelFormSchema = z.object({
  id: z.coerce.number().int().positive(),
  educationLevel: z
    .string()
    .min(1, { message: "Education level can not be empty." })
    .trim(),
});

export type EducationLevelFormState =
  | {
      errors?: {
        id?: string[];
        educationLevel?: string[];
      };
      message?: string;
    }
  | undefined;

export const updateJobFormSchema = z.object({
  id: z.coerce.number().int().positive(),
  jobStatus: z
    .string()
    .min(1, { message: "Job status can not be empty." })
    .trim(),
});

export type updateJobFormState =
  | {
      errors?: {
        id?: string[];
        jobStatus?: string[];
      };
      message?: string;
    }
  | undefined;

export const seniorityLevelFormSchema = z.object({
  id: z.coerce.number().int().positive(),
  seniorityLevel: z
    .string()
    .min(1, { message: "Education level can not be empty." })
    .trim(),
});

export type SeniorityLevelLevelFormState =
  | {
      errors?: {
        id?: string[];
        seniorityLevel?: string[];
      };
      message?: string;
    }
  | undefined;

export const salaryFormSchema = z.object({
  id: z.coerce.number().int().positive(),
  salaryType: z.string().min(1, { message: "Salary can not be empty." }).trim(),
});

export type SalaryFormState =
  | {
      errors?: {
        id?: string[];
        salaryType?: string[];
      };
      message?: string;
    }
  | undefined;

export const locationFormSchema = z.object({
  id: z.coerce.number().int().positive(),
  location: z.string().min(1, { message: "Location can not be empty." }).trim(),
});

export type LocationFormState =
  | {
      errors?: {
        id?: string[];
        location?: string[];
      };
      message?: string;
    }
  | undefined;

export const summaryFormSchema = z.object({
  id: z.coerce.number().int().positive(),
  summary: z.string().min(1, { message: "Summary can not be empty." }).trim(),
});

export type SummaryFormState =
  | {
      errors?: {
        id?: string[];
        summary?: string[];
      };
      message?: string;
    }
  | undefined;

export type KeyResponsibilitiesFormState = {
  success?: boolean;
  errors?: Record<string, string[]>;
};

export const keyResponsibilitiesFormSchema = z.object({
  id: z.coerce.number(),
  keyResponsibilities: z
    .array(z.string().trim().min(1, "Item cannot be empty"))
    .max(100, "Too many items"),
});

export type QualificationsFormState = {
  success?: boolean;
  errors?: Record<string, string[]>;
};

export const qualificationsFormSchema = z.object({
  id: z.coerce.number(),
  qualifications: z
    .array(z.string().trim().min(1, "Item cannot be empty"))
    .max(100, "Too many items"),
});

export type BenefitsFormState = {
  success?: boolean;
  errors?: Record<string, string[]>;
};

export const benefitsFormSchema = z.object({
  id: z.coerce.number(),
  benefits: z
    .array(z.string().trim().min(1, "Item cannot be empty"))
    .max(100, "Too many items"),
});

export const DeleteJobFormSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type DeleteJobFormState =
  | {
      errors?: { id?: string[] };
      message?: string;
      success?: boolean;
    }
  | undefined;

// PARTNER

export const AddPartnerBenefitFormSchema = z.object({
  title: z.string().min(1, { message: "Title cannot be empty." }).trim(),
  description: z
    .string()
    .min(1, { message: "Description cannot be empty." })
    .trim(),
});

export type AddPartnerBenefitFormState =
  | {
      errors?: {
        title?: string[];
        description?: string[];
      };
      messages?: boolean;
    }
  | undefined;

export const partnerFormSchema = z.object({
  bannerTitle: z.string().min(1, { message: "Field can not be empty." }).trim(),
  bannerParagraph: z
    .string()
    .min(1, { message: "Field can not be empty." })
    .trim(),
  benefitTitle: z
    .string()
    .min(1, { message: "Field can not be empty." })
    .trim(),
  contactTitle: z
    .string()
    .min(1, { message: "Field can not be empty." })
    .trim(),
  contactParagraph: z
    .string()
    .min(1, { message: "Field can not be empty." })
    .trim(),
  email: z.string().min(1, { message: "Field can not be empty." }).trim(),
  buttonLabel: z.string().min(1, { message: "Field can not be empty." }).trim(),
  buttonLink: z.string().min(1, { message: "Field can not be empty." }).trim(),
});

export type PartnerFormState =
  | {
      errors?: {
        bannerTitle?: string[];
        bannerParagraph?: string[];
        benefitTitle?: string[];
        contactTitle?: string[];
        contactParagraph?: string[];
        email?: string[];
        buttonLabel?: string[];
        buttonLink?: string[];
      };
      message?: string;
    }
  | undefined;

export const benefitItemFormSchema = z.object({
  id: z.coerce.number().int().positive(),
  title: z.string().min(1, { message: "Title can not be empty." }).trim(),
  description: z
    .string()
    .min(1, { message: "Description can not be empty." })
    .trim(),
});

export type BenefitItemFormState =
  | {
      errors?: {
        id?: string[];
        title?: string[];
        description?: string[];
      };
      message?: string;
    }
  | undefined;

export const DeleteBenefitFormSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type DeleteBenefitFormState =
  | {
      errors?: { id?: string[] };
      message?: string;
      success?: boolean;
    }
  | undefined;

export const footerFormSchema = z.object({
  title: z.string().min(1, { message: "Title can not be empty." }).trim(),
  address: z.string().min(1, { message: "Address can not be empty." }).trim(),
  email: z.string().min(1, { message: "Email can not be empty." }).trim(),
  facebook: z.string().min(1, { message: "Url can not be empty." }).trim(),
  linkedIn: z.string().min(1, { message: "Url can not be empty." }).trim(),
  copyright: z
    .string()
    .min(1, { message: "Copyright can not be empty." })
    .trim(),
});

export type FooterFormState =
  | {
      errors?: {
        title?: string[];
        address?: string[];
        email?: string[];
        copyright?: string[];
        facebook?: string[];
        linkkedIn?: string[];
      };
      message?: string;
    }
  | undefined;

// APPLIED JOBS
export const appliedJobsSchema = z.object({
  position: z.string().min(1, { message: "Field can not be empty." }).trim(),
  experience: z.string().min(1, { message: "Field can not be empty." }).trim(),
  name: z.string().min(1, { message: "Name can not be empty." }).trim(),
  email: z.string().min(1, { message: "Email can not be empty." }).trim(),
  phone: z.string().min(1, { message: "Phone no can not be empty." }).trim(),
  location: z.string().min(1, { message: "Location can not be empty." }).trim(),
  github: z.string().optional(),
  linkedIn: z.string().optional(),
  expectedSalary: z
    .string()
    .min(1, { message: "Expected salary can not be empty." }),
  whyInterested: z
    .string()
    .min(1, { message: "Field can not be empty." })
    .trim(),
  keySkills: z.string().optional(),
  coverLetter: z.string().optional(),
  resumeUrl: z.string().min(1, { message: "CV/Resume is required." }).trim(),
});

export type appliedJobsFormState =
  | {
      errors?: {
        position?: string[];
        experience?: string[];
        name?: string[];
        email?: string[];
        phone?: string[];
        location?: string[];
        github?: string[];
        linkedIn?: string[];
        expectedSalary?: string[];
        whyInterested?: string[];
        keySkills?: string[];
        coverLetter?: string[];
        resumeUrl?: string[];
      };
      message?: string;
    }
  | undefined;

export const AddMessageFormSchema = z.object({
  name: z.string().min(1, { message: "Name can not be empty." }).trim(),
  email: z.string().min(1, { message: "Email can not be empty." }).trim(),
  message: z.string().min(1, { message: "Message can not be empty." }).trim(),
});

export type AddMessageFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        message?: string[];
      };
      message?: string;
    }
  | undefined;

// export const addSettingsFormSchema = z.object({
//   REGISTER_PIN: z.string().min(1, { message: "Pin can not be empty." }).trim(),
//   OPENAI_API_KEY: z
//     .string()
//     .min(1, { message: "API key can not be empty." })
//     .trim(),
//   NOTIFY_EMAIL: z.string().email({ message: "Invalid email address." }).trim(),
//   NOTIFY_EMAIL_PASS: z
//     .string()
//     .min(1, { message: "Password can not be empty." })
//     .trim(),
//   NEXT_PUBLIC_APP_URL: z
//     .string()
//     .url({ message: "Must be a valid URL." })
//     .trim(),
// });

// export type AddSettingsFormState =
//   | {
//       errors?: {
//         pin?: string[];
//       };
//       message?: string;
//     }
//   | undefined;

// i copied from chatgpt below
export const settingValidators = {
  REGISTER_PIN: z.string().min(1, { message: "Pin can not be empty." }).trim(),
  OPENAI_API_KEY: z
    .string()
    .min(1, { message: "API key can not be empty." })
    .trim(),
  NOTIFY_EMAIL: z.string().email({ message: "Invalid email address." }).trim(),
  NOTIFY_EMAIL_PASS: z
    .string()
    .min(1, { message: "Password can not be empty." })
    .trim(),
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url({ message: "Must be a valid URL." })
    .trim(),
} as const;

export type SettingKey = keyof typeof settingValidators;

export type SettingsFormState =
  | {
      errors?: {
        field?: string[];
        value?: string[];
      };
      message?: string;
    }
  | {
      success: true;
    }
  | undefined;

// AI CHATBOT

export const aiQuestionFormSchema = z.object({
  question: z.string().min(1, { message: "Field can not be empty." }).trim(),
});

export type AiQuestionFormState =
  | {
      errors?: {
        question?: string[];
      };
      message?: string;
    }
  | undefined;
