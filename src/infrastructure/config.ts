import dotenv from "dotenv";

dotenv.config();

const env = process.env;

export const PORT = Number(env.PORT ?? 4000);
export const OPEN_METEO_FORECAST_URL = env.OPEN_METEO_FORECAST_URL ?? "https://api.open-meteo.com/v1/forecast";
export const OPEN_METEO_GEO_URL = env.OPEN_METEO_GEO_URL ?? "https://geocoding-api.open-meteo.com/v1/search";
export const DEFAULT_FORECAST_DAYS = Number(env.DEFAULT_FORECAST_DAYS ?? 5);
