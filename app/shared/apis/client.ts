import { getAccessToken } from "./utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getApiUrl = (endpoint: string) => {
  if (endpoint.startsWith("https://") || endpoint.startsWith("http://"))
    return endpoint;
  return `${API_URL}${endpoint}`;
};

export const httpClient = {
  get: async (endpoint: string, init?: RequestInit | undefined) => {
    const accessToken = await getAccessToken();
    const bearerToken = `Bearer ${accessToken}`;

    return fetch(getApiUrl(endpoint), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
      ...init,
    });
  },

  post: async (endpoint: string, init?: RequestInit) => {
    const accessToken = await getAccessToken();
    const bearerToken = `Bearer ${accessToken}`;

    return fetch(getApiUrl(endpoint), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
      ...init,
    });
  },
  formPost: async (endpoint: string, init?: RequestInit) => {
    const accessToken = await getAccessToken();
    const bearerToken = `Bearer ${accessToken}`;

    return fetch(getApiUrl(endpoint), {
      method: "POST",
      headers: {
        Authorization: bearerToken,
      },
      ...init,
    });
  },

  put: async (endpoint: string, init?: RequestInit) => {
    const accessToken = await getAccessToken();
    const bearerToken = `Bearer ${accessToken}`;

    return fetch(getApiUrl(endpoint), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
      ...init,
    });
  },
  patch: async function patch(endpoint: string, init?: RequestInit) {
    const accessToken = await getAccessToken();
    const bearerToken = `Bearer ${accessToken}`;

    return fetch(getApiUrl(endpoint), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
      ...init,
    });
  },
  formPatch: async (endpoint: string, init?: RequestInit) => {
    const accessToken = await getAccessToken();
    const bearerToken = `Bearer ${accessToken}`;

    return fetch(getApiUrl(endpoint), {
      method: "PATCH",
      headers: {
        Authorization: bearerToken,
      },
      ...init,
    });
  },

  formPut: async (endpoint: string, init?: RequestInit) => {
    const accessToken = await getAccessToken();
    const bearerToken = `Bearer ${accessToken}`;

    return fetch(getApiUrl(endpoint), {
      method: "PUT",
      headers: {
        Authorization: bearerToken,
      },
      ...init,
    });
  },
  delete: async (endpoint: string, init?: RequestInit) => {
    const accessToken = await getAccessToken();
    const bearerToken = `Bearer ${accessToken}`;

    return fetch(getApiUrl(endpoint), {
      method: "DELETE",
      headers: {
        Authorization: bearerToken,
      },
      ...init,
    });
  },
};
