// Prisma 7 Configuration
// Loads environment variables from .env file
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    // Seed command for populating database with sample data
    seed: "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts",
  },
  datasource: {
    // Database connection URL
    url: env("DATABASE_URL"),
  },
});
