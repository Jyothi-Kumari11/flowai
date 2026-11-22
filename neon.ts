import { defineConfig } from "@neon/config/v1";

export default defineConfig({
  // Lakebase Postgres is always included — no declaration needed.
  // Add more Neon services here when needed:
  // auth: true,
  // aiGateway: true,
  // buckets: { uploads: { access: "private" } },

  // Branch policy: per-branch tuning
  branch: (branch) => {
    if (branch.isDefault) {
      return {};
    }
    if (!branch.exists) {
      // New non-default branches auto-expire after 7 days
      return { ttl: "7d" };
    }
    return {};
  },
});
