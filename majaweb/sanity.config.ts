import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/schema";

// Fallback to placeholder if environment variables are not set
const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || "your-project-id";
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "desa-maja-studio",
  title: "Admin Desa Maja",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
  basePath: "/studio",
});
