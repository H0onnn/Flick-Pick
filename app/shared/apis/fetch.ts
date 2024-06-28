import { request } from "./utils";

export const API_VARS = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL as string,
  TMDB_API_URL: process.env.TMDB_API_URL as string,
  TMDM_TOKEN: process.env.TMDB_ACCESS_TOKEN as string,
  YOUTUBE_API_URL: process.env.YOUTUBE_API_URL as string,
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY as string,
} as const;

export const fetchAPI = request.create({
  baseURL: API_VARS.BASE_URL,
  headers: {
    Accept: "application/json",
  },
  credentials: "include",
});

export const fetchTMDB = request.create({
  baseURL: API_VARS.TMDB_API_URL,
  headers: {
    Authorization: `Bearer ${API_VARS.TMDM_TOKEN}`,
    Accept: "application/json",
  },
});

export const fetchYoutube = request.create({
  baseURL: API_VARS.YOUTUBE_API_URL,
  headers: {
    Accept: "application/json",
  },
});
