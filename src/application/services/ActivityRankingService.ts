import { ActivityRank, ActivityType, WeatherForecast } from "../../core/models/Weather";
import { getWeatherCodeLabel } from "../../constant/weatherCodes";

const scoreForSkiing = (forecast: WeatherForecast) => {
  const winterDays = forecast.daily.filter((day) => day.weatherCode >= 71 && day.temperatureMax <= 3);
  return Math.min(100, winterDays.length * 20 + (forecast.daily[0]?.temperatureMax <= 3 ? 20 : 0));
};

const scoreForSurfing = (forecast: WeatherForecast) => {
  const warmDays = forecast.daily.filter((day) => day.temperatureMax >= 18 && day.precipitationSum <= 2);
  return Math.min(100, warmDays.length * 20 + (forecast.daily[0]?.temperatureMax >= 18 ? 20 : 0));
};

const scoreForOutdoorSightseeing = (forecast: WeatherForecast) => {
  const goodDays = forecast.daily.filter((day) => day.precipitationSum <= 4 && day.temperatureMax >= 12 && day.temperatureMax <= 28);
  return Math.min(100, goodDays.length * 20 + 10);
};

const scoreForIndoorSightseeing = (forecast: WeatherForecast) => {
  const rainDays = forecast.daily.filter((day) => day.precipitationSum >= 5 || day.temperatureMax <= 8);
  return Math.min(100, rainDays.length * 25 + 10);
};

export class RankActivitiesUseCase {
  execute(forecast: WeatherForecast): ActivityRank[] {
    const activities: ActivityRank[] = [
      {
        activity: ActivityType.SKIING,
        score: scoreForSkiing(forecast),
        reason: `Best when there is snow and cold weather (${getWeatherCodeLabel(forecast.daily[0]?.weatherCode ?? 0)}).`,
      },
      {
        activity: ActivityType.SURFING,
        score: scoreForSurfing(forecast),
        reason: `Best when the forecast is warm and dry (${getWeatherCodeLabel(forecast.daily[0]?.weatherCode ?? 0)}).`,
      },
      {
        activity: ActivityType.OUTDOOR_SIGHTSEEING,
        score: scoreForOutdoorSightseeing(forecast),
        reason: `Best when mild temperatures and low precipitation are expected.`,
      },
      {
        activity: ActivityType.INDOOR_SIGHTSEEING,
        score: scoreForIndoorSightseeing(forecast),
        reason: `Best when weather is cool or rainy, making indoor activities more comfortable.`,
      },
    ];

    return activities.sort((a, b) => b.score - a.score);
  }
}
