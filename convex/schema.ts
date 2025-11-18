import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  urls: defineTable({
    originalUrl: v.string(),
    url: v.string(),
  }),
});
