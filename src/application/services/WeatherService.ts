import { WeatherForecast } from "../../core/models/Weather";

export interface IWeatherService {
  getForecast(latitude: number, longitude: number, days?: number): Promise<WeatherForecast>;
}

export class GetWeatherForecastUseCase {
  constructor(private readonly weatherService: IWeatherService) {}

  execute(latitude: number, longitude: number, days: number = 5): Promise<WeatherForecast> {
    return this.weatherService.getForecast(latitude, longitude, days);
  }
}
