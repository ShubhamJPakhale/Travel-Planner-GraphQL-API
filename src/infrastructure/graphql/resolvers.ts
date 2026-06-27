import { SearchCitiesUseCase } from "../../application/services/CityService";
import { GetWeatherForecastUseCase } from "../../application/services/WeatherService";
import { RankActivitiesUseCase } from "../../application/services/ActivityRankingService";
import { IGeoLocationService } from "../../application/services/CityService";
import { IWeatherService } from "../../application/services/WeatherService";

export const createResolvers = (
  geoLocationService: IGeoLocationService,
  weatherService: IWeatherService
) => {
  const searchCitiesUseCase = new SearchCitiesUseCase(geoLocationService);
  const getWeatherForecastUseCase = new GetWeatherForecastUseCase(weatherService);
  const rankActivitiesUseCase = new RankActivitiesUseCase();

  return {
    Query: {
      searchCities: (_: unknown, args: { query: string; limit?: number }) =>
        searchCitiesUseCase.execute(args.query, args.limit),
      weatherForecast: (_: unknown, args: { latitude: number; longitude: number; days?: number }) =>
        getWeatherForecastUseCase.execute(args.latitude, args.longitude, args.days),
      rankedActivities: async (_: unknown, args: { latitude: number; longitude: number; days?: number }) => {
        const forecast = await getWeatherForecastUseCase.execute(
          args.latitude,
          args.longitude,
          args.days
        );
        return rankActivitiesUseCase.execute(forecast);
      },
    },
  };
};
