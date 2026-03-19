import { submitAction, submitJson } from "./api";

type ActionState = {
  success?: boolean;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
};

function refreshOnSuccess<T extends ActionState>(result: T) {
  if (result?.success) {
    window.setTimeout(() => {
      window.location.reload();
    }, 400);
  }

  return result;
}

function createAction(name: string) {
  return async (_prevState: unknown, formData: FormData) =>
    refreshOnSuccess(await submitAction(name, formData));
}

export const updateHome = createAction("updateHome");
export const updateFeatures = createAction("updateFeatures");
export const updateTestimony = createAction("updateTestimony");
export const addInfiniteItem = createAction("addInfiniteItem");
export const deleteInfiniteItem = createAction("deleteInfiniteItem");
export const updateInfiniteItem = createAction("updateInfiniteItem");
export const updateInfiniteItemsHeading = createAction("updateInfiniteItemsHeading");
export const updateContact = createAction("updateContact");
export const updateService = createAction("updateService");
export const updateServiceItem = createAction("updateServiceItem");
export const addService = createAction("addService");
export const deleteService = createAction("deleteService");
export const updateCareer = createAction("updateCareer");
export const addJob = createAction("addJob");
export const updatePosition = createAction("updatePosition");
export const updateExipreTime = createAction("updateExipreTime");
export const updateExperience = createAction("updateExperience");
export const updateJobType = createAction("updateJobType");
export const updateEducationalLevel = createAction("updateEducationalLevel");
export const updateJobStatus = createAction("updateJobStatus");
export const updateSeniorityLevel = createAction("updateSeniorityLevel");
export const updateSalary = createAction("updateSalary");
export const updateLocation = createAction("updateLocation");
export const updateSummary = createAction("updateSummary");
export const updateKeyResponsibilities = createAction("updateKeyResponsibilities");
export const updateQualifications = createAction("updateQualifications");
export const updateBenefits = createAction("updateBenefits");
export const deleteJob = createAction("deleteJob");
export const deleteAppliedJob = createAction("deleteAppliedJob");
export const addBenefits = createAction("addBenefits");
export const updatePartner = createAction("updatePartner");
export const updateBenefitItem = createAction("updateBenefitItem");
export const deleteBenefit = createAction("deleteBenefit");
export const updateFooter = createAction("updateFooter");
export const submitAppliedJob = createAction("submitAppliedJob");
export const addMessage = createAction("addMessage");
export const deleteMessage = createAction("deleteMessage");
export const updateSettings = createAction("updateSettings");
export const addAIQuestions = createAction("addAIQuestions");
export const editAIQuestion = createAction("editAIQuestion");
export const deleteAIQuestion = createAction("deleteAIQuestion");
export const updateAIContext = createAction("updateAIContext");

export async function deleteUser(id: number) {
  return refreshOnSuccess(
    await submitJson<{ success?: boolean; error?: string }>("/api/actions/deleteUser", {
      id,
    })
  );
}
