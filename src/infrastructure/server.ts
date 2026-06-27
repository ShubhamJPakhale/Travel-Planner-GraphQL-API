import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/typeDefs";
import { createResolvers } from "./graphql/resolvers";
import { OpenMeteoGeoLocationService } from "./adapters/GeoLocationService";
import { OpenMeteoWeatherService } from "./adapters/WeatherService";
import { PORT } from "./config";

export async function startServer(): Promise<void> {
  const geoLocationService = new OpenMeteoGeoLocationService();
  const weatherService = new OpenMeteoWeatherService();

  const server = new ApolloServer({
    typeDefs,
    resolvers: createResolvers(geoLocationService, weatherService),
  });

  const { url } = await server.listen({ port: PORT });
  console.log(`🚀 Travel Planner GraphQL API ready at ${url}`);
}
