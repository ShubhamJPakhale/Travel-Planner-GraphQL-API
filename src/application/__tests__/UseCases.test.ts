import { SearchCitiesUseCase, IGeoLocationService } from "../services/CityService";
import { GetWeatherForecastUseCase, IWeatherService } from "../services/WeatherService";
import { CitySuggestion } from "../../core/models/City";
import { WeatherForecast } from "../../core/models/Weather";

describe("Application use cases", () => {
  it("SearchCitiesUseCase should forward search queries to the geo location service", async () => {
    const cities: CitySuggestion[] = [
      {
        id: "1",
        name: "Pune",
        country: "India",
        countryCode: "IN",
        latitude: 18.52,
        longitude: 73.85,
      },
    ];

    const mockGeoService: IGeoLocationService = {
      searchCities: jest.fn().mockResolvedValue(cities),
    } as unknown as IGeoLocationService;

    const useCase = new SearchCitiesUseCase(mockGeoService);
    const result = await useCase.execute("Pune", 1);

    expect(result).toEqual(cities);
    expect(mockGeoService.searchCities).toHaveBeenCalledWith("Pune", 1);
  });

  it("GetWeatherForecastUseCase should return the forecast from the weather service", async () => {
    const forecast: WeatherForecast = {
      latitude: 48.85,
      longitude: 2.35,
      summary: "Mild weather",
      currentTemperature: 20,
      daily: [
        {
          date: "2025-08-01",
          temperatureMax: 22,
          temperatureMin: 16,
          precipitationSum: 0,
          weatherCode: 1,
          description: "Mainly clear",
        },
      ],
    };

    const mockWeatherService: IWeatherService = {
      getForecast: jest.fn().mockResolvedValue(forecast),
    } as unknown as IWeatherService;

    const useCase = new GetWeatherForecastUseCase(mockWeatherService);
    const result = await useCase.execute(48.85, 2.35, 1);

    expect(result).toBe(forecast);
    expect(mockWeatherService.getForecast).toHaveBeenCalledWith(48.85, 2.35, 1);
  });
});
