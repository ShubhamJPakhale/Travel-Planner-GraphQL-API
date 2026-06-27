import { gql } from "apollo-server";

export const typeDefs = gql`
  type CitySuggestion {
    id: ID!
    name: String!
    country: String
    countryCode : String!
    latitude: Float!
    longitude: Float!
  }

  type WeatherDay {
    date: String!
    temperatureMax: Float!
    temperatureMin: Float!
    precipitationSum: Float!
    weatherCode: Int!
    description: String!
  }

  type WeatherForecast {
    latitude: Float!
    longitude: Float!
    summary: String!
    currentTemperature: Float!
    daily: [WeatherDay!]!
  }

  enum ActivityType {
    SKIING
    SURFING
    INDOOR_SIGHTSEEING
    OUTDOOR_SIGHTSEEING
  }
    
  type ActivityRank {
    activity: ActivityType!
    score: Float!
    reason: String!
  }

  type Query {
    searchCities(query: String!, limit: Int = 10): [CitySuggestion!]!
    weatherForecast(latitude: Float!, longitude: Float!, days: Int = 5): WeatherForecast!
    rankedActivities(latitude: Float!, longitude: Float!, days: Int = 5): [ActivityRank!]!
  }
`;
