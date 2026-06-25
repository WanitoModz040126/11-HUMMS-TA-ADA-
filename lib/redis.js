import { Redis } from "@upstash/redis";

let client = null;
let warned = false;

export function getRedis() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    if (!warned) {
      console.warn(
        "[redis] KV_REST_API_URL / KV_REST_API_TOKEN are not set. " +
          "The like counter will run in a temporary in-memory mode and " +
          "will reset on every deploy or cold start. Connect a database " +
          "from the Vercel Marketplace (Upstash) to make it permanent."
      );
      warned = true;
    }
    return null;
  }

  if (!client) {
    client = new Redis({ url, token });
  }
  return client;
}
