import { RankActivitiesUseCase } from "../services/ActivityRankingService";
import { WeatherForecast } from "../../core/models/Weather";

describe("RankActivitiesUseCase", () => {
  it("prioritizes indoor sightseeing for cold and rainy forecasts", () => {
    const forecast: WeatherForecast = {
      latitude: 48.8566,
      longitude: 2.3522,
      summary: "Cold and rainy",
      currentTemperature: 5,
      daily: [
        {
          date: "2025-01-01",
          temperatureMax: 5,
          temperatureMin: 1,
          precipitationSum: 12,
          weatherCode: 63,
          description: "Moderate rain",
        },
        {
          date: "2025-01-02",
          temperatureMax: 7,
          temperatureMin: 3,
          precipitationSum: 8,
          weatherCode: 61,
          description: "Light rain",
        },
      ],
    };

    const useCase = new RankActivitiesUseCase();
    const ranked = useCase.execute(forecast);

    expect(ranked[0].activity).toBe("INDOOR_SIGHTSEEING");
    expect(ranked[0].score).toBeGreaterThanOrEqual(ranked[1].score);
  });

  it("returns surfing as the top activity for warm, dry forecasts", () => {
    const forecast: WeatherForecast = {
      latitude: 34.0,
      longitude: -118.25,
      summary: "Warm and dry",
      currentTemperature: 26,
      daily: [
        {
          date: "2025-07-10",
          temperatureMax: 28,
          temperatureMin: 18,
          precipitationSum: 0,
          weatherCode: 1,
          description: "Mainly clear",
        },
      ],
    };

    const useCase = new RankActivitiesUseCase();
    const ranked = useCase.execute(forecast);

    expect(ranked[0].activity).toBe("SURFING");
    expect(ranked[0].score).toBeGreaterThan(0);
  });
});
