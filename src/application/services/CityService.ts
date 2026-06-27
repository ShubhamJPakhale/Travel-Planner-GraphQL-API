import { CitySuggestion } from "../../core/models/City";

export interface IGeoLocationService {
  searchCities(query: string, limit?: number): Promise<CitySuggestion[]>;
}

export class SearchCitiesUseCase {
  constructor(private readonly geoLocationService: IGeoLocationService) {}

  execute(query: string, limit: number = 10): Promise<CitySuggestion[]> {
    return this.geoLocationService.searchCities(query, limit);
  }
}
