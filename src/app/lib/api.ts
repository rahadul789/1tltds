type ActionResponse = {
  success?: boolean;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
};

function serializeFormData(formData: FormData) {
  return Array.from(formData.entries()).map(([key, value]) => [
    key,
    typeof value === "string" ? value : value.name,
  ]);
}

async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    throw data;
  }

  if (!isJson) {
    throw new Error(
      "Expected JSON from the API but received a non-JSON response instead."
    );
  }

  return data;
}

export async function fetchData<T>(name: string): Promise<T> {
  const normalizedName = name.startsWith("/") ? name : `/${name}`;
  const response = await fetch(`/api/data${normalizedName}`, {
    credentials: "include",
  });

  return parseResponse<T>(response);
}

export async function submitAction<T extends ActionResponse = ActionResponse>(
  name: string,
  formData: FormData
): Promise<T> {
  const response = await fetch(`/api/actions/${name}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      entries: serializeFormData(formData),
    }),
  });

  return parseResponse<T>(response);
}

export async function submitJson<T>(
  url: string,
  body?: Record<string, unknown>
): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });

  return parseResponse<T>(response);
}

export async function fetchCurrentUser<T>() {
  const response = await fetch("/api/auth/me", {
    credentials: "include",
  });

  if (response.status === 401) {
    return null;
  }

  return parseResponse<T>(response);
}
