import {
  AddInfiniteItemsFormSchema,
  AddInfiniteItemsFormState,
  AddInfiniteItemsHeadingFormState,
  AddJobFormSchema,
  AddJobFormState,
  AddMessageFormSchema,
  AddMessageFormState,
  AddPartnerBenefitFormSchema,
  AddPartnerBenefitFormState,
  AddServiceFormSchema,
  AddServiceFormState,
  // AddSettingsFormState,
  AiQuestionFormState,
  BenefitItemFormState,
  BenefitsFormState,
  CareerFormState,
  ContactFormState,
  DeleteBenefitFormSchema,
  DeleteBenefitFormState,
  DeleteInfiniteItemFormSchema,
  DeleteInfiniteItemFormState,
  DeleteJobFormSchema,
  DeleteJobFormState,
  DeleteServiceFormSchema,
  DeleteServiceFormState,
  EducationLevelFormState,
  ExperienceFormState,
  ExpireTimeFormState,
  FeaturesFormState,
  FooterFormState,
  HomeFormState,
  JobTypeFormState,
  KeyResponsibilitiesFormState,
  LocationFormState,
  PartnerFormState,
  PositionFormState,
  QualificationsFormState,
  SalaryFormState,
  SeniorityLevelLevelFormState,
  ServiceFormState,
  ServiceItemFormState,
  SettingKey,
  SettingsFormState,
  SummaryFormState,
  TestimonyFormState,
  addInfiniteItemsHeadingFormSchema,
  // addSettingsFormSchema,
  aiQuestionFormSchema,
  appliedJobsFormState,
  appliedJobsSchema,
  benefitItemFormSchema,
  benefitsFormSchema,
  careerFormSchema,
  contactFormSchema,
  educationLevelFormSchema,
  experienceFormSchema,
  expireTimeFormSchema,
  featuresFormSchema,
  footerFormSchema,
  homeFormSchema,
  jobTypeFormSchema,
  keyResponsibilitiesFormSchema,
  locationFormSchema,
  partnerFormSchema,
  positionFormSchema,
  qualificationsFormSchema,
  salaryFormSchema,
  seniorityLevelFormSchema,
  serviceFormSchema,
  serviceItemFormSchema,
  settingValidators,
  summaryFormSchema,
  testimonyFormSchema,
  updateInfiniteItemsFormSchema,
  updateJobFormSchema,
  updateJobFormState,
} from "../src/app/lib/definitions";
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
  features,
  testimonial,
  infinite,
  contact,
  appliedJobs,
  messages,
  settings,
  aiSettings,
  usersTable,
} from "./db/schema";
import { eq } from "drizzle-orm";
import { PinataSDK } from "pinata";
import z from "zod";
import { sendJobApplicationMail } from "./job-mail";
import { sendContactMail } from "./contact-mail";

const revalidatePath = (_path: string) => {};

export async function updateHome(state: HomeFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = homeFormSchema.safeParse({
    badge1: formData.get("badge1"),
    badge2: formData.get("badge2"),
    title1: formData.get("title1"),
    title2: formData.get("title2"),
    paragraph: formData.get("paragraph"),
    buttonText: formData.get("buttonText"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { badge1, badge2, title1, title2, paragraph, buttonText } =
    validatedFields.data;

  // Call the provider or db to create a user...
  await db.update(home).set({
    badge1,
    badge2,
    title1,
    title2,
    paragraph,
    buttonText,
  });

  revalidatePath("/dashboard/home");
  revalidatePath("/");

  return {
    success: true,
  };
}

export async function updateFeatures(
  state: FeaturesFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = featuresFormSchema.safeParse({
    title: formData.get("title"),
    subTitle: formData.get("subTitle"),
    feature1Title: formData.get("feature1Title"),
    feature1Description: formData.get("feature1Description"),

    feature2Title: formData.get("feature2Title"),
    feature2Description: formData.get("feature2Description"),

    feature3Title: formData.get("feature3Title"),
    feature3Description: formData.get("feature3Description"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {
    title,
    subTitle,
    feature1Title,
    feature1Description,
    feature2Title,
    feature2Description,
    feature3Title,
    feature3Description,
  } = validatedFields.data;

  // Call the provider or db to create a user...
  await db.update(features).set({
    title,
    subTitle,
    feature1Title,
    feature1Description,
    feature2Title,
    feature2Description,
    feature3Title,
    feature3Description,
  });

  revalidatePath("/dashboard/vision");
  revalidatePath("/");
  revalidatePath("/dashboard");

  return {
    success: true,
  };
}

export async function updateTestimony(
  state: TestimonyFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = testimonyFormSchema.safeParse({
    heading: formData.get("heading"),
    paragraph: formData.get("paragraph"),
    testimony: formData.get("testimony"),
    author: formData.get("author"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { heading, paragraph, testimony, author } = validatedFields.data;

  // Call the provider or db to create a user...
  await db.update(testimonial).set({
    heading,
    paragraph,
    testimony,
    author,
  });

  revalidatePath("/dashboard/vision");
  revalidatePath("/");
  revalidatePath("/dashboard");

  return {
    success: true,
  };
}

export async function addInfiniteItem(
  state: AddInfiniteItemsFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = AddInfiniteItemsFormSchema.safeParse({
    title: formData.get("title"),
    heading: formData.get("heading"),
    url: formData.get("url"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, heading, url } = validatedFields.data;

  // Call the provider or db to create a user...
  await db.insert(infinite).values({
    title,
    heading,
    url,
  });

  revalidatePath("/dashboard/infinite");
  revalidatePath("/");
  revalidatePath("/dashboard");

  return {
    success: true,
  };
}

export async function deleteInfiniteItem(
  state: DeleteInfiniteItemFormState,
  formData: FormData
) {
  const validatedFields = DeleteInfiniteItemFormSchema.safeParse({
    id: formData.get("id"),
    url: formData.get("url"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id, url } = validatedFields.data;

  let fileId = null;

  try {
    const urlParts = url.split("/");
    fileId = urlParts[urlParts.length - 1]; // last segment
  } catch (err) {
    console.log("Failed to extract fileId from URL:", err);
  }

  // 4. Initialize Pinata
  const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
    pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL,
  });

  // 5. Delete file from Pinata (if exists)
  if (fileId) {
    const list = await pinata.files.public.list().cid(fileId).limit(1);
    const fileIds = list.files[0].id;

    try {
      await pinata.files.public.delete([fileIds]);
    } catch (err) {
      console.log("Pinata deletion failed:", err);
    }
  }

  await db.delete(infinite).where(eq(infinite.id, id));

  revalidatePath("/dashboard/infinite");
  revalidatePath("/");
  revalidatePath("/dashboard");

  return { success: true };
}

export async function updateInfiniteItem(
  state: AddInfiniteItemsFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = updateInfiniteItemsFormSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    url: formData.get("url"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, id, url } = validatedFields.data;

  const deletedUrl = formData.get("deletedUrl") as string | null;

  /* ----------------------------------------------------------
    1. DELETE OLD IMAGE (ONLY IF replaced)
  ---------------------------------------------------------- */
  if (deletedUrl && deletedUrl.length > 0) {
    try {
      let fileId = null;

      try {
        const urlParts = deletedUrl.split("/");
        fileId = urlParts[urlParts.length - 1]; // last segment
      } catch (err) {
        console.log("Failed to extract fileId from URL:", err);
      }

      // 4. Initialize Pinata
      const pinata = new PinataSDK({
        pinataJwt: process.env.PINATA_JWT,
        pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL,
      });

      // 5. Delete file from Pinata (if exists)
      if (fileId) {
        const list = await pinata.files.public.list().cid(fileId).limit(1);
        const fileIds = list.files[0].id;

        try {
          await pinata.files.public.delete([fileIds]);
        } catch (err) {
          console.log("Pinata deletion failed:", err);
        }
      }
    } catch (error) {
      console.error("Failed to delete old image:", error);
      // Not a blocker → continue
    }
  }

  // Call the provider or db to create a user...
  await db
    .update(infinite)
    .set({
      title,
      url,
    })
    .where(eq(infinite.id, id));

  revalidatePath("/dashboard/infinite");
  revalidatePath("/");
  revalidatePath("/dashboard");

  return {
    success: true,
  };
}

export async function updateInfiniteItemsHeading(
  state: AddInfiniteItemsHeadingFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = addInfiniteItemsHeadingFormSchema.safeParse({
    heading: formData.get("heading"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { heading } = validatedFields.data;

  // Call the provider or db to create a user...
  await db.update(infinite).set({
    heading,
  });

  revalidatePath("/dashboard/infinite");
  revalidatePath("/");
  revalidatePath("/dashboard");

  return {
    success: true,
  };
}

export async function updateContact(
  state: ContactFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = contactFormSchema.safeParse({
    title: formData.get("title"),
    subTitle: formData.get("subTitle"),
    buttonLabel: formData.get("buttonLabel"),
    buttonLink: formData.get("buttonLink"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, subTitle, buttonLabel, buttonLink } = validatedFields.data;

  // Call the provider or db to create a user...
  await db.update(contact).set({
    title,
    subTitle,
    buttonLabel,
    buttonLink,
  });

  revalidatePath("/dashboard/home");
  revalidatePath("/");
  revalidatePath("/dashboard");

  return {
    success: true,
  };
}

export async function updateService(
  state: ServiceFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = serviceFormSchema.safeParse({
    title: formData.get("title"),
    subTitle: formData.get("subTitle"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, subTitle } = validatedFields.data;

  // Call the provider or db to create a user...
  await db.update(services).set({
    title,
    subTitle,
  });

  revalidatePath("/dashboard/services");
  revalidatePath("/services");
  revalidatePath("/");
  revalidatePath("/dashboard");

  return {
    success: true,
  };
}

export async function updateServiceItem(
  state: ServiceItemFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = serviceItemFormSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    summary: formData.get("summary"),
    description: formData.get("description"),
    url: formData.get("url"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, description, id, summary, url } = validatedFields.data;

  const deletedUrl = formData.get("deletedUrl") as string | null;

  /* ----------------------------------------------------------
    1. DELETE OLD IMAGE (ONLY IF replaced)
  ---------------------------------------------------------- */
  if (deletedUrl && deletedUrl.length > 0) {
    try {
      let fileId = null;

      try {
        const urlParts = deletedUrl.split("/");
        fileId = urlParts[urlParts.length - 1]; // last segment
      } catch (err) {
        console.log("Failed to extract fileId from URL:", err);
      }

      // 4. Initialize Pinata
      const pinata = new PinataSDK({
        pinataJwt: process.env.PINATA_JWT,
        pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL,
      });

      // 5. Delete file from Pinata (if exists)
      if (fileId) {
        const list = await pinata.files.public.list().cid(fileId).limit(1);
        const fileIds = list.files[0].id;

        try {
          await pinata.files.public.delete([fileIds]);
        } catch (err) {
          console.log("Pinata deletion failed:", err);
        }
      }
    } catch (error) {
      console.error("Failed to delete old image:", error);
      // Not a blocker → continue
    }
  }

  // Call the provider or db to create a user...
  await db
    .update(serviceItems)
    .set({
      title,
      summary,
      description,
      url,
    })
    .where(eq(serviceItems.id, id));

  revalidatePath("/dashboard/services");
  revalidatePath("/services");
  revalidatePath("/");
  revalidatePath("/dashboard");

  return {
    success: true,
  };
}

export async function addService(
  state: AddServiceFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = AddServiceFormSchema.safeParse({
    title: formData.get("title"),
    summary: formData.get("summary"),
    description: formData.get("description"),
    url: formData.get("url"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, summary, description, url } = validatedFields.data;

  // Call the provider or db to create a user...
  await db.insert(serviceItems).values({
    title,
    summary,
    description,
    url,
    serviceId: 1,
  });

  revalidatePath("/dashboard/services");
  revalidatePath("/services");
  revalidatePath("/");
  revalidatePath("/dashboard");

  return {
    success: true,
  };
}

export async function deleteService(
  state: DeleteServiceFormState,
  formData: FormData
) {
  const validatedFields = DeleteServiceFormSchema.safeParse({
    id: formData.get("id"),
    url: formData.get("url"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id, url } = validatedFields.data;

  let fileId = null;

  try {
    const urlParts = url.split("/");
    fileId = urlParts[urlParts.length - 1]; // last segment
  } catch (err) {
    console.log("Failed to extract fileId from URL:", err);
  }

  // 4. Initialize Pinata
  const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
    pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL,
  });

  // 5. Delete file from Pinata (if exists)
  if (fileId) {
    const list = await pinata.files.public.list().cid(fileId).limit(1);
    const fileIds = list.files[0].id;

    try {
      await pinata.files.public.delete([fileIds]);
    } catch (err) {
      console.log("Pinata deletion failed:", err);
    }
  }

  await db.delete(serviceItems).where(eq(serviceItems.id, id));

  revalidatePath("/dashboard/services");
  revalidatePath("/services");

  revalidatePath("/dashboard");
  revalidatePath("/");

  return { success: true };
}

export async function updateCareer(state: CareerFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = careerFormSchema.safeParse({
    heroTitle: formData.get("heroTitle"),
    title: formData.get("title"),
    subTitle: formData.get("subTitle"),
    email: formData.get("email"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { heroTitle, title, subTitle, email } = validatedFields.data;

  // Call the provider or db to create a user...
  await db.update(career).set({
    heroTitle,
    title,
    subTitle,
    email,
  });

  revalidatePath("/dashboard/career");
  revalidatePath("/dashboard");
  revalidatePath("/career");

  return {
    success: true,
  };
}

function getStringArray(formData: FormData, name: string) {
  // Inputs are named like keyResponsibilities[] / qualifications[]
  const raw = formData.getAll(`${name}[]`).map(String);
  // Trim & drop blanks (so a single empty input won't fail validation)
  return raw.map((s) => s.trim()).filter((s) => s.length > 0);
}

export async function addJob(state: AddJobFormState, formData: FormData) {
  const salaryTypeValue = formData.get("salaryType");
  const hasExpiryValue = formData.get("hasExpiry");

  // Build payload
  const payload = {
    position: formData.get("position"),
    experience: formData.get("experience"),
    type: formData.get("type"),
    location: formData.get("location"),
    summary: formData.get("summary"),
    hasExpiry: hasExpiryValue,

    keyResponsibilities: getStringArray(formData, "keyResponsibilities"),
    qualifications: getStringArray(formData, "qualifications"),
    benefits: getStringArray(formData, "benefits"),

    jobStatus: formData.get("jobStatus"),
    expiresAt: formData.get("expiresAt"),
    educationLevel: formData.get("educationLevel"),
    seniorityLevel: formData.get("seniorityLevel"),
    salaryType: salaryTypeValue,

    salaryMin: salaryTypeValue === "range" ? formData.get("salaryMin") : "",
    salaryMax: salaryTypeValue === "range" ? formData.get("salaryMax") : "",
    salaryInterval:
      salaryTypeValue === "range" ? formData.get("salaryInterval") : "",

    isSalaryVisible: formData.get("isSalaryVisible"),
  };

  // --------------------------------------------------
  // ✅ MANUAL CONDITIONAL VALIDATION (MUST BE HERE)
  // --------------------------------------------------
  const customErrors: any = {};

  // Validate expiry
  if (hasExpiryValue === "true" && !payload.expiresAt) {
    customErrors.expiresAt = ["Expiry date is required."];
  }

  // Validate salary range
  if (salaryTypeValue === "range") {
    if (!payload.salaryMin)
      customErrors.salaryMin = ["Minimum salary required."];
    if (!payload.salaryMax)
      customErrors.salaryMax = ["Maximum salary required."];
    if (!payload.salaryInterval)
      customErrors.salaryInterval = ["Interval is required."];
  }

  // If we have manual errors → stop here
  if (Object.keys(customErrors).length > 0) {
    return { errors: customErrors };
  }

  // --------------------------------------------------
  // Continue with your Zod validation
  // --------------------------------------------------
  const validated = AddJobFormSchema.safeParse(payload);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const {
    position,
    experience,
    type,
    location,
    summary,
    keyResponsibilities,
    qualifications,
    benefits,
    jobStatus,
    expiresAt,
    educationLevel,
    seniorityLevel,
    salaryType,
    salaryMin,
    salaryMax,
    salaryInterval,
    isSalaryVisible,
  } = validated.data;

  await db.insert(jobs).values({
    position,
    experience,
    type,
    location,
    summary,
    keyResponsibilities,
    qualifications,
    benefits,
    jobStatus,
    expiresAt,
    educationLevel,
    seniorityLevel,
    salaryType,
    salaryMin,
    salaryMax,
    salaryInterval,
    isSalaryVisible,
  } as any);

  revalidatePath("/dashboard/career");
  revalidatePath("/dashboard");
  revalidatePath("/career");

  return { success: true };
}

//////////////////////////////////////////// JOB

export async function updatePosition(
  state: PositionFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = positionFormSchema.safeParse({
    id: formData.get("id"),
    position: formData.get("position"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id, position } = validatedFields.data;

  // Call the provider or db to create a user...
  await db
    .update(jobs)
    .set({
      position,
    })
    .where(eq(jobs.id, id));

  revalidatePath("/dashboard/career");
  revalidatePath("/dashboard");
  revalidatePath("/career");

  return {
    success: true,
  };
}

// EXPIRE TIME
export async function updateExipreTime(
  state: ExpireTimeFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = expireTimeFormSchema.safeParse({
    id: formData.get("id"),
    // expiresAt: formData.get("expiresAt"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id } = validatedFields.data;

  const expiresAt = formData.get("expiresAt");

  // Convert expiresAt (string) to a Date or null to satisfy DB column type
  let expiresAtDate: Date | null = null;
  if (expiresAt) {
    const parsed = new Date(String(expiresAt));
    if (!isNaN(parsed.getTime())) {
      expiresAtDate = parsed;
    } else {
      expiresAtDate = null;
    }
  }

  if (expiresAt === null) {
    expiresAtDate = null;
  }

  // Call the provider or db to create a user...
  await db
    .update(jobs)
    .set({
      expiresAt: expiresAtDate,
    })
    .where(eq(jobs.id, id));

  revalidatePath("/dashboard/career");
  revalidatePath("/dashboard");
  revalidatePath("/career");

  return {
    success: true,
  };
}

export async function updateExperience(
  state: ExperienceFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = experienceFormSchema.safeParse({
    id: formData.get("id"),
    experience: formData.get("experience"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id, experience } = validatedFields.data;

  // Call the provider or db to create a user...
  await db
    .update(jobs)
    .set({
      experience,
    })
    .where(eq(jobs.id, id));

  revalidatePath("/dashboard/career");
  revalidatePath("/dashboard");
  revalidatePath("/career");

  return {
    success: true,
  };
}

export async function updateJobType(
  state: JobTypeFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = jobTypeFormSchema.safeParse({
    id: formData.get("id"),
    type: formData.get("type"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id, type } = validatedFields.data;

  // Call the provider or db to create a user...
  await db
    .update(jobs)
    .set({
      type,
    })
    .where(eq(jobs.id, id));

  revalidatePath("/dashboard/career");
  revalidatePath("/dashboard");
  revalidatePath("/career");

  return {
    success: true,
  };
}

export async function updateEducationalLevel(
  state: EducationLevelFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = educationLevelFormSchema.safeParse({
    id: formData.get("id"),
    educationLevel: formData.get("educationLevel"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id, educationLevel } = validatedFields.data;

  // Call the provider or db to create a user...
  await db
    .update(jobs)
    .set({
      educationLevel,
    })
    .where(eq(jobs.id, id));

  revalidatePath("/dashboard/career");
  revalidatePath("/dashboard");
  revalidatePath("/career");

  return {
    success: true,
  };
}

export async function updateJobStatus(
  state: updateJobFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = updateJobFormSchema.safeParse({
    id: formData.get("id"),
    jobStatus: formData.get("jobStatus"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id, jobStatus } = validatedFields.data;

  // Call the provider or db to create a user...
  await db
    .update(jobs)
    .set({
      jobStatus,
    })
    .where(eq(jobs.id, id));

  revalidatePath("/dashboard/career");
  revalidatePath("/dashboard");
  revalidatePath("/career");

  return {
    success: true,
  };
}

export async function updateSeniorityLevel(
  state: SeniorityLevelLevelFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = seniorityLevelFormSchema.safeParse({
    id: formData.get("id"),
    seniorityLevel: formData.get("seniorityLevel"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id, seniorityLevel } = validatedFields.data;

  // Call the provider or db to create a user...
  await db
    .update(jobs)
    .set({
      seniorityLevel,
    })
    .where(eq(jobs.id, id));

  revalidatePath("/dashboard/career");
  revalidatePath("/dashboard");
  revalidatePath("/career");

  return {
    success: true,
  };
}

export async function updateSalary(state: SalaryFormState, formData: FormData) {
  // Validate required fields
  const validatedFields = salaryFormSchema.safeParse({
    id: formData.get("id"),
    salaryType: formData.get("salaryType"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // ---- OPTIONAL FIELDS ----
  const salaryMin = formData.get("salaryMin")?.toString() || "";
  const salaryMax = formData.get("salaryMax")?.toString() || "";
  const salaryInterval = formData.get("salaryInterval")?.toString() || "";

  const { id, salaryType } = validatedFields.data;

  // ---- UPDATE DATABASE ----
  await db
    .update(jobs)
    .set({
      salaryType,
      salaryMin,
      salaryMax,
      salaryInterval,
    })
    .where(eq(jobs.id, id));

  revalidatePath("/dashboard/career");
  revalidatePath("/dashboard");
  revalidatePath("/career");

  return {
    success: true,
  };
}

export async function updateLocation(
  state: LocationFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = locationFormSchema.safeParse({
    id: formData.get("id"),
    location: formData.get("location"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id, location } = validatedFields.data;

  // Call the provider or db to create a user...
  await db
    .update(jobs)
    .set({
      location,
    })
    .where(eq(jobs.id, id));

  revalidatePath("/dashboard/career");
  revalidatePath("/dashboard");
  revalidatePath("/career");

  return {
    success: true,
  };
}

export async function updateSummary(
  state: SummaryFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = summaryFormSchema.safeParse({
    id: formData.get("id"),
    summary: formData.get("summary"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id, summary } = validatedFields.data;

  // Call the provider or db to create a user...
  await db
    .update(jobs)
    .set({
      summary,
    })
    .where(eq(jobs.id, id));

  revalidatePath("/dashboard/career");
  revalidatePath("/dashboard");
  revalidatePath("/career");

  return {
    success: true,
  };
}

export async function updateKeyResponsibilities(
  state: KeyResponsibilitiesFormState,
  formData: FormData
): Promise<KeyResponsibilitiesFormState> {
  // Pull repeated fields from FormData
  const rawList = formData.getAll("keyResponsibilities[]");

  // Normalize: cast to string, trim, drop empties, de-dupe while preserving order
  const seen = new Set<string>();
  const normalized = rawList
    .map((v) => (typeof v === "string" ? v : ""))
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .filter((s) => {
      if (seen.has(s)) return false;
      seen.add(s);
      return true;
    });

  // Validate
  const validated = keyResponsibilitiesFormSchema.safeParse({
    id: formData.get("id"),
    keyResponsibilities: normalized,
  });

  if (!validated.success) {
    console.log(validated.error);
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { id, keyResponsibilities } = validated.data;

  // Persist (works if column is Postgres text[] or jsonb<string[]>)
  await db.update(jobs).set({ keyResponsibilities }).where(eq(jobs.id, id));

  revalidatePath("/dashboard/career");
  revalidatePath("/dashboard");
  revalidatePath("/career");

  return { success: true };
}

export async function updateQualifications(
  state: QualificationsFormState,
  formData: FormData
): Promise<QualificationsFormState> {
  // Pull repeated fields from FormData
  const rawList = formData.getAll("qualifications[]");

  // Normalize: cast to string, trim, drop empties, de-dupe while preserving order
  const seen = new Set<string>();
  const normalized = rawList
    .map((v) => (typeof v === "string" ? v : ""))
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .filter((s) => {
      if (seen.has(s)) return false;
      seen.add(s);
      return true;
    });

  // Validate
  const validated = qualificationsFormSchema.safeParse({
    id: formData.get("id"),
    qualifications: normalized,
  });

  if (!validated.success) {
    console.log(validated.error);
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { id, qualifications } = validated.data;

  // Persist (works if column is Postgres text[] or jsonb<string[]>)
  await db.update(jobs).set({ qualifications }).where(eq(jobs.id, id));

  revalidatePath("/dashboard/career");
  revalidatePath("/dashboard");
  revalidatePath("/career");

  return { success: true };
}

export async function updateBenefits(
  state: BenefitsFormState,
  formData: FormData
): Promise<BenefitsFormState> {
  // Pull repeated fields from FormData
  const rawList = formData.getAll("benefits[]");

  // Normalize: cast to string, trim, drop empties, de-dupe while preserving order
  const seen = new Set<string>();
  const normalized = rawList
    .map((v) => (typeof v === "string" ? v : ""))
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .filter((s) => {
      if (seen.has(s)) return false;
      seen.add(s);
      return true;
    });

  // Validate
  const validated = benefitsFormSchema.safeParse({
    id: formData.get("id"),
    benefits: normalized,
  });

  if (!validated.success) {
    console.log(validated.error);
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { id, benefits } = validated.data;

  // Persist (works if column is Postgres text[] or jsonb<string[]>)
  await db.update(jobs).set({ benefits }).where(eq(jobs.id, id));

  revalidatePath("/dashboard/career");
  revalidatePath("/dashboard");
  revalidatePath("/career");

  return { success: true };
}

export async function deleteJob(state: DeleteJobFormState, formData: FormData) {
  const validatedFields = DeleteJobFormSchema.safeParse({
    id: formData.get("id"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id } = validatedFields.data;

  await db.delete(jobs).where(eq(jobs.id, id));

  revalidatePath("/dashboard/career");
  revalidatePath("/dashboard");
  revalidatePath("/career");

  return { success: true };
}

export async function deleteAppliedJob(state: any, formData: FormData) {
  // 1. Validate
  const validated = DeleteJobFormSchema.safeParse({
    id: formData.get("id"),
  });

  if (!validated.success) {
    console.log(validated.error);
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { id } = validated.data;

  // 2. Fetch job from DB (to get resumeUrl)
  const job = await db
    .select()
    .from(appliedJobs)
    .where(eq(appliedJobs.id, id))
    .limit(1);

  if (!job || job.length === 0) {
    return { errors: { general: "Job not found" } };
  }

  const resumeUrl = job[0].resumeUrl;

  // 3. Extract Pinata file ID (CID or UUID)
  // Example resumeUrl format:
  // https://gateway.pinata.cloud/ipfs/<FILE_ID>
  // or https://mygateway/ipfs/<uuid>

  let fileId = null;

  try {
    const urlParts = resumeUrl.split("/");
    fileId = urlParts[urlParts.length - 1]; // last segment
  } catch (err) {
    console.log("Failed to extract fileId from URL:", err);
  }

  // 4. Initialize Pinata
  const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
    pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL,
  });

  // 5. Delete file from Pinata (if exists)
  if (fileId) {
    const list = await pinata.files.public.list().cid(fileId).limit(1);
    const fileIds = list.files[0].id;

    try {
      await pinata.files.public.delete([fileIds]);
    } catch (err) {
      console.log("Pinata deletion failed:", err);
    }
  }

  // 6. Delete job record from database
  await db.delete(appliedJobs).where(eq(appliedJobs.id, id));

  // 7. Revalidate page
  revalidatePath("/dashboard/career");
  revalidatePath("/dashboard");
  revalidatePath("/career");

  return { success: true };
}

export async function addBenefits(
  state: AddPartnerBenefitFormState,
  formData: FormData
) {
  // Build candidate payload
  const payload = {
    title: formData.get("title"),
    description: formData.get("description"),
  };

  // Validate form fields
  const validated = AddPartnerBenefitFormSchema.safeParse(payload);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { title, description } = validated.data;

  await db.insert(partnerBenefits).values({
    title,
    description,
  });

  revalidatePath("/dashboard/partner");
  revalidatePath("/dashboard");
  revalidatePath("/partner");

  return { success: true };
}

export async function updatePartner(
  state: PartnerFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = partnerFormSchema.safeParse({
    bannerTitle: formData.get("bannerTitle"),
    bannerParagraph: formData.get("bannerParagraph"),
    benefitTitle: formData.get("benefitTitle"),
    contactTitle: formData.get("contactTitle"),
    contactParagraph: formData.get("contactParagraph"),
    email: formData.get("email"),
    buttonLabel: formData.get("buttonLabel"),
    buttonLink: formData.get("buttonLink"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {
    bannerTitle,
    bannerParagraph,
    benefitTitle,
    contactTitle,
    contactParagraph,
    email,
    buttonLabel,
    buttonLink,
  } = validatedFields.data;

  // Call the provider or db to create a user...
  await db.update(partner).set({
    bannerTitle,
    bannerParagraph,
    benefitTitle,
    contactTitle,
    contactParagraph,
    email,
    buttonLabel,
    buttonLink,
  });

  revalidatePath("/dashboard/partner");
  revalidatePath("/dashboard");
  revalidatePath("/partner");

  return {
    success: true,
  };
}

export async function updateBenefitItem(
  state: BenefitItemFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = benefitItemFormSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    description: formData.get("description"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, description, id } = validatedFields.data;

  // Call the provider or db to create a user...
  await db
    .update(partnerBenefits)
    .set({
      title,
      description,
    })
    .where(eq(partnerBenefits.id, id));

  revalidatePath("/dashboard/partner");
  revalidatePath("/dashboard");
  revalidatePath("/partner");

  return {
    success: true,
  };
}

export async function deleteBenefit(
  state: DeleteBenefitFormState,
  formData: FormData
) {
  const validatedFields = DeleteBenefitFormSchema.safeParse({
    id: formData.get("id"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id } = validatedFields.data;

  await db.delete(partnerBenefits).where(eq(partnerBenefits.id, id));

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/partner");
  revalidatePath("/partner");

  return { success: true };
}

export async function updateFooter(state: FooterFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = footerFormSchema.safeParse({
    title: formData.get("title"),
    address: formData.get("address"),
    email: formData.get("email"),
    copyright: formData.get("copyright"),
    facebook: formData.get("facebook"),
    linkedIn: formData.get("linkedIn"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, address, email, copyright, facebook, linkedIn } =
    validatedFields.data;

  // Call the provider or db to create a user...
  await db
    .update(footer)
    .set({ title, address, email, copyright, facebook, linkedIn });

  revalidatePath("/dashboard/footer");
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/career");
  revalidatePath("/contact-us");
  revalidatePath("/partner");
  revalidatePath("/dashboard");

  return {
    success: true,
  };
}

// APPLIED JOBS
export async function submitAppliedJob(
  state: appliedJobsFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = appliedJobsSchema.safeParse({
    position: formData.get("position"),
    experience: formData.get("experience"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    location: formData.get("location"),
    github: formData.get("github"),
    linkedIn: formData.get("linkedIn"),
    expectedSalary: formData.get("expectedSalary"),
    whyInterested: formData.get("whyInterested"),
    keySkills: formData.get("keySkills"),
    coverLetter: formData.get("coverLetter"),
    resumeUrl: formData.get("resumeUrl"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {
    position,
    experience,

    name,
    email,
    phone,
    location,
    github,
    linkedIn,
    expectedSalary,
    whyInterested,
    keySkills,
    coverLetter,
    resumeUrl,
  } = validatedFields.data;

  // Call the provider or db to create a user...
  await db.insert(appliedJobs).values({
    position,
    experience,

    name,
    email,
    phone,
    location,
    github,
    linkedIn,
    expectedSalary,
    whyInterested,
    keySkills,
    coverLetter,
    resumeUrl,
  });

  revalidatePath("/career");

  // -------------------------------------------
  // SEND EMAIL NOTIFICATION TO YOU (ADMIN)
  // -------------------------------------------
  await sendJobApplicationMail({
    position: position,
    name: name,
    email: email,
    phone: phone,
    resumeUrl: resumeUrl,
  });

  return {
    success: true,
  };
}

export async function addMessage(
  state: AddMessageFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = AddMessageFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, message } = validatedFields.data;

  // Call the provider or db to create a user...
  await db.insert(messages).values({
    name,
    email,
    message,
  });

  // -------------------------------------------
  // SEND EMAIL NOTIFICATION TO YOU (ADMIN)
  // -------------------------------------------
  await sendContactMail({
    name: name,
    email: email,
    message: message,
  });

  revalidatePath("/contact-us");

  return {
    success: true,
  };
}

export async function deleteMessage(state: any, formData: FormData) {
  // 1. Validate
  const validated = DeleteJobFormSchema.safeParse({
    id: formData.get("id"),
  });

  if (!validated.success) {
    console.log(validated.error);
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { id } = validated.data;

  // 6. Delete job record from database
  await db.delete(messages).where(eq(messages.id, id));

  // 7. Revalidate page
  revalidatePath("/dashboard/messages");

  return { success: true };
}

// export async function updateSettings(
//   state: AddSettingsFormState,
//   formData: FormData
// ) {
//   // Validate form fields
//   const validatedFields = addSettingsFormSchema.safeParse({
//     pin: formData.get("pin"),
//   });

//   // If any form fields are invalid, return early
//   if (!validatedFields.success) {
//     console.log(validatedFields.error);
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//     };
//   }

//   const { pin } = validatedFields.data;

//   // Call the provider or db to create a user...
//   await db.update(settings).set({
//     pin,
//   });

//   revalidatePath("/dashboard/settings");

//   return {
//     success: true,
//   };
// }

//  copied below from chatgpt

export async function updateSettings(
  state: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  const field = formData.get("field");
  const value = formData.get("value");

  if (typeof field !== "string" || typeof value !== "string") {
    return {
      errors: {
        field: ["Invalid setting field."],
      },
    };
  }

  if (!(field in settingValidators)) {
    return {
      errors: {
        field: ["This setting cannot be updated."],
      },
    };
  }

  const key = field as SettingKey;
  const schema = settingValidators[key];

  const parsed = schema.safeParse(value);

  if (!parsed.success) {
    const flat = parsed.error.flatten();

    return {
      errors: {
        // flat.formErrors is already string[]
        value: flat.formErrors,
      },
    };
  }

  // If you have a single row, you might hardcode the id, or pass it via formData
  await db.update(settings).set({ [key]: parsed.data }); // dynamic column name
  // .where(eq(settings.id, 1)) // add a WHERE clause if needed

  revalidatePath("/dashboard/settings");
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/career");
  revalidatePath("/contact-us");
  revalidatePath("/partner");

  return { success: true };
}

// AI CHATBOT
export async function addAIQuestions(
  state: AiQuestionFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = aiQuestionFormSchema.safeParse({
    question: formData.get("question"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { question } = validatedFields.data;

  // Get current settings row (assuming single row config)
  const [settings] = await db.select().from(aiSettings).limit(1);

  // If no settings row exists yet, create one with this first question
  if (!settings) {
    await db.insert(aiSettings).values({
      context: "", // or some default context
      questions: [question],
    });

    revalidatePath("/dashboard/settings");
    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/career");
    revalidatePath("/contact-us");
    revalidatePath("/partner");
    return { success: true };
  }

  // Append new question to existing array
  const allQuestions = [...settings.questions, question];

  await db
    .update(aiSettings)
    .set({
      questions: allQuestions,
    })
    .where(eq(aiSettings.id, settings.id));

  revalidatePath("/dashboard/settings");
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/career");
  revalidatePath("/contact-us");
  revalidatePath("/partner");

  return {
    success: true,
  };
}

export async function editAIQuestion(
  state: AiQuestionFormState,
  formData: FormData
) {
  // Validate question text
  const validatedFields = aiQuestionFormSchema.safeParse({
    question: formData.get("question"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { question } = validatedFields.data;

  // Get and validate index
  const indexRaw = formData.get("index");
  const index = typeof indexRaw === "string" ? Number(indexRaw) : Number.NaN;

  if (!Number.isInteger(index) || index < 0) {
    return {
      errors: {
        index: ["Invalid question index"],
      },
    };
  }

  // Load current settings (assuming single row)
  const [settings] = await db.select().from(aiSettings).limit(1);

  if (!settings) {
    return {
      errors: {
        _form: ["AI settings not found"],
      },
    };
  }

  if (
    !Array.isArray(settings.questions) ||
    index >= settings.questions.length
  ) {
    return {
      errors: {
        index: ["Question index out of range"],
      },
    };
  }

  // Update the question at given index
  const updatedQuestions = [...settings.questions];
  updatedQuestions[index] = question;

  await db
    .update(aiSettings)
    .set({ questions: updatedQuestions })
    .where(eq(aiSettings.id, settings.id));

  revalidatePath("/dashboard/settings");
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/career");
  revalidatePath("/contact-us");
  revalidatePath("/partner");

  return {
    success: true,
  };
}

export async function deleteAIQuestion(
  state: AiQuestionFormState,
  formData: FormData
) {
  // Read & validate index
  const indexRaw = formData.get("index");
  const index = typeof indexRaw === "string" ? Number(indexRaw) : Number.NaN;

  if (!Number.isInteger(index) || index < 0) {
    return {
      errors: {
        index: ["Invalid question index"],
      },
    };
  }

  // Load current settings (assuming a single row)
  const [settings] = await db.select().from(aiSettings).limit(1);

  if (!settings) {
    return {
      errors: {
        _form: ["AI settings not found"],
      },
    };
  }

  if (
    !Array.isArray(settings.questions) ||
    index >= settings.questions.length
  ) {
    return {
      errors: {
        index: ["Question index out of range"],
      },
    };
  }

  // Remove the question at the given index
  const updatedQuestions = settings.questions.filter((_, i) => i !== index);

  await db
    .update(aiSettings)
    .set({ questions: updatedQuestions })
    .where(eq(aiSettings.id, settings.id));

  revalidatePath("/dashboard/settings");
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/career");
  revalidatePath("/contact-us");
  revalidatePath("/partner");

  return {
    success: true,
  };
}

type AIContextFormState = {
  errors?: {
    context?: string[];
    _form?: string[];
  };
  success?: boolean;
};

const aiContextFormSchema = z.object({
  context: z.string().min(1, "Context is required"),
});

export async function updateAIContext(
  _prevState: AIContextFormState,
  formData: FormData
): Promise<AIContextFormState> {
  const parsed = aiContextFormSchema.safeParse({
    context: formData.get("context"),
  });

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { context } = parsed.data;

  // assuming a single settings row
  const [settings] = await db.select().from(aiSettings).limit(1);

  if (!settings) {
    // create row if it doesn't exist yet
    await db.insert(aiSettings).values({
      context,
      // questions will use DB default (empty array), we don't touch them later
    });
  } else {
    // update only context; questions stay untouched
    await db
      .update(aiSettings)
      .set({ context })
      .where(eq(aiSettings.id, settings.id));
  }

  revalidatePath("/dashboard/settings");
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/career");
  revalidatePath("/contact-us");
  revalidatePath("/partner");

  return { success: true };
}

export async function deleteUser(id: number, currentUserId?: number) {
  try {
    // 🔒 Block self-delete
    if (Number(currentUserId) === Number(id)) {
      return {
        success: false,
        error: "You cannot delete your own account.",
      };
    }

    await db.delete(usersTable).where(eq(usersTable.id, id));
    revalidatePath("/dashboard/users");

    return { success: true };
  } catch (err) {
    console.error("Delete user error:", err);
    return { success: false, error: "Failed to delete user." };
  }
}
