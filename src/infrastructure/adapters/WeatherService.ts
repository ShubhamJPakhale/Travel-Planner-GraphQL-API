import { IWeatherService } from "../../application/services/WeatherService";
import { WeatherForecast, WeatherDay } from "../../core/models/Weather";
import { OPEN_METEO_FORECAST_URL, DEFAULT_FORECAST_DAYS } from "../config";
import { getWeatherCodeDescription } from "../../constant/weatherCodes";

interface OpenMeteoForecastResponse {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    weathercode: number[];
  };
  current_weather?: {
    temperature: number;
    weathercode: number;
  };
}

export class OpenMeteoWeatherService implements IWeatherService {
  async getForecast(latitude: number, longitude: number, days = DEFAULT_FORECAST_DAYS): Promise<WeatherForecast> {
    const url = new URL(OPEN_METEO_FORECAST_URL);
    url.searchParams.set("latitude", String(latitude));
    url.searchParams.set("longitude", String(longitude));
    url.searchParams.set("daily", "temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode");
    url.searchParams.set("current_weather", "true");
    url.searchParams.set("timezone", "auto");
    url.searchParams.set("forecast_days", String(days));

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Failed to load weather: ${response.status} ${response.statusText}`);
    }

    const body = (await response.json()) as OpenMeteoForecastResponse;
    const daily = body.daily.time.map((date, index) => {
      const weatherCode = body.daily.weathercode[index];
      return {
        date,
        temperatureMax: body.daily.temperature_2m_max[index],
        temperatureMin: body.daily.temperature_2m_min[index],
        precipitationSum: body.daily.precipitation_sum[index],
        weatherCode,
        description: getWeatherCodeDescription(weatherCode),
      } as WeatherDay;
    });

    return {
      latitude,
      longitude,
      summary: daily[0]?.description ?? "Weather forecast available",
      currentTemperature: body.current_weather?.temperature ?? daily[0]?.temperatureMax ?? 0,
      daily,
    };
  }
}
