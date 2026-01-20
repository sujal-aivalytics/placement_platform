import { defineConfig } from "prisma/config";

export default defineConfig({
    migrations: {
        path: "prisma/migrations",
    },
    datasource: {
        // DATABASE_URL is used for pooled connections (runtime queries)
        // DIRECT_URL is used in src/lib/prisma.ts via the adapter
        url: process.env.DATABASE_URL,
    },
});
