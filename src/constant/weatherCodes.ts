export const weatherCodeDescriptions: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Freezing drizzle",
  57: "Freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Freezing rain",
  67: "Freezing rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with heavy hail",
};

export const getWeatherCodeDescription = (code: number): string =>
  weatherCodeDescriptions[code] ?? "Unknown weather";

export const getWeatherCodeLabel = (weatherCode: number): string => {
  if (weatherCode === 0) return "clear skies";
  if (weatherCode <= 3) return "partly cloudy skies";
  if (weatherCode <= 48) return "foggy conditions";
  if (weatherCode <= 67) return "rainy weather";
  if (weatherCode <= 77) return "snowy conditions";
  if (weatherCode <= 99) return "ice or hail";
  return "variable weather";
};
