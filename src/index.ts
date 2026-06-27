import { startServer } from "./infrastructure/server";

startServer().catch((error) => {
  console.error("Failed to start Travel Planner GraphQL API", error);
  process.exit(1);
});
