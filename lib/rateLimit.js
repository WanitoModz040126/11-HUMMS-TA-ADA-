// Fixed-window rate limiter. Not a substitute for network-level DDoS
// protection (that part is handled by Vercel's edge network) — this
// only stops a single client from hammering one API route with
// repeated requests.

const memoryBuckets = new Map();

function memoryLimiter(key, limit, windowSeconds) {
  const now = Date.now();
  const bucket = memoryBuckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    memoryBuckets.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return { allowed: true, remaining: limit - 1 };
  }

  bucket.count += 1;
  const allowed = bucket.count <= limit;
  return { allowed, remaining: Math.max(0, limit - bucket.count) };
}

export async function rateLimit(redis, identifier, { limit = 20, windowSeconds = 10 } = {}) {
  const key = `ratelimit:${identifier}`;

  if (!redis) {
    return memoryLimiter(key, limit, windowSeconds);
  }

  const count = await redis.incr(key);
  if (count === 1) {
    await redis.expire(key, windowSeconds);
  }

  return {
    allowed: count <= limit,
    remaining: Math.max(0, limit - count),
  };
}

export function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "unknown";
}
