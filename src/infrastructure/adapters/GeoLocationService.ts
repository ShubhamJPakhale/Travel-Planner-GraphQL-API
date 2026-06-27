import { IGeoLocationService } from "../../application/services/CityService";
import { CitySuggestion } from "../../core/models/City";
import { OPEN_METEO_GEO_URL } from "../config";

type OpenMeteoGeoResponse = {
  results?: Array<{
    id: number;
    name: string;
    country?: string;
    country_code?: string;
    latitude: number;
    longitude: number;
  }>;
};

export class OpenMeteoGeoLocationService implements IGeoLocationService {
  async searchCities(query: string, limit = 10): Promise<CitySuggestion[]> {
    const url = new URL(OPEN_METEO_GEO_URL);
    url.searchParams.set("name", query);
    url.searchParams.set("count", String(limit));
    url.searchParams.set("language", "en");

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Failed to search cities: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as OpenMeteoGeoResponse;
    return (data.results ?? []).map((result) => ({
      id: String(result.id),
      name: result.name,
      country: result.country,
      countryCode: result.country_code ?? result.country ?? "",
      latitude: result.latitude,
      longitude: result.longitude,
    }));
  }
}
