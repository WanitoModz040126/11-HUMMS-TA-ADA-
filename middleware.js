import { NextResponse } from "next/server";

// This runs at the edge, before a request ever reaches an API route or
// page. It catches obvious request floods early and cheaply. It is a
// deterrent layer, not a replacement for the network-level protection
// Vercel's edge already provides against large-scale DDoS traffic.

const WINDOW_MS = 10_000;
const MAX_REQUESTS = 60;
const buckets = new Map();

function isFlooding(ip) {
  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  bucket.count += 1;
  return bucket.count > MAX_REQUESTS;
}

export function middleware(request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isFlooding(ip)) {
    return new NextResponse(
      JSON.stringify({ error: "Too many requests, please try again shortly." }),
      { status: 429, headers: { "Content-Type": "application/json", "Retry-After": "10" } }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
