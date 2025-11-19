import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createUrl = mutation({
  args: { url: v.string(), originalUrl: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("urls", {
      ...args,
    });
    return true;
  },
});

export const getOrgUrl = query({
  args: {
    url: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.url) {
      return null;
    }
    const data = await ctx.db
      .query("urls")
      .filter((q) => q.eq(q.field("url"), args.url))
      .first();
    if (!data) {
      return null;
    }
    return data.originalUrl;
  },
});
export const getUrlFromOrgUrl = query({
  args: {
    originalUrl: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.originalUrl) {
      return null;
    }
    const data = await ctx.db
      .query("urls")
      .filter((q) => q.eq(q.field("url"), args.originalUrl))
      .first();
    if (!data) {
      return null;
    }
    return data.url;
  },
});

export const getAllUrls = query({
  handler: async (ctx) => {
    const data = await ctx.db.query("urls").order("desc").collect();
    return data;
  },
});
