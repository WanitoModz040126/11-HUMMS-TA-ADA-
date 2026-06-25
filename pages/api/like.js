import { getRedis } from "../../lib/redis";
import { rateLimit, getClientIp } from "../../lib/rateLimit";

const COUNTER_KEY = "humms:likes:total";
const VISITORS_KEY = "humms:likes:visitors";

// Fallback counter used only when no database is connected yet, so the
// button still works during local testing. This resets on cold start —
// connect a database from the Vercel Marketplace for a real, permanent count.
let fallbackTotal = 0;
const fallbackVisitors = new Set();

export default async function handler(req, res) {
  const redis = getRedis();
  const ip = getClientIp(req);

  const limitResult = await rateLimit(redis, `like:${ip}`, {
    limit: 30,
    windowSeconds: 10,
  });

  if (!limitResult.allowed) {
    res.setHeader("Retry-After", "10");
    return res.status(429).json({ error: "Too many requests. Please slow down." });
  }

  if (req.method === "GET") {
    const total = redis ? Number((await redis.get(COUNTER_KEY)) || 0) : fallbackTotal;
    return res.status(200).json({ total });
  }

  if (req.method === "POST") {
    const { visitorId } = req.body || {};

    if (!visitorId || typeof visitorId !== "string" || visitorId.length > 100) {
      return res.status(400).json({ error: "Missing or invalid visitorId." });
    }

    let isNewLike = false;

    if (redis) {
      const added = await redis.sadd(VISITORS_KEY, visitorId);
      isNewLike = added === 1;
      if (isNewLike) {
        await redis.incr(COUNTER_KEY);
      }
    } else {
      isNewLike = !fallbackVisitors.has(visitorId);
      if (isNewLike) {
        fallbackVisitors.add(visitorId);
        fallbackTotal += 1;
      }
    }

    const total = redis ? Number((await redis.get(COUNTER_KEY)) || 0) : fallbackTotal;
    return res.status(200).json({ total, counted: isNewLike });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: "Method not allowed." });
}
