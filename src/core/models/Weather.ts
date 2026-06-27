export type WeatherDay = {
  date: string;
  temperatureMax: number;
  temperatureMin: number;
  precipitationSum: number;
  weatherCode: number;
  description: string;
};

export type WeatherForecast = {
  latitude: number;
  longitude: number;
  summary: string;
  currentTemperature: number;
  daily: WeatherDay[];
};

export enum ActivityType {
  SKIING = "SKIING",
  SURFING = "SURFING",
  INDOOR_SIGHTSEEING = "INDOOR_SIGHTSEEING",
  OUTDOOR_SIGHTSEEING = "OUTDOOR_SIGHTSEEING",
}

export type ActivityRank = {
  activity: ActivityType;
  score: number;
  reason: string;
};
