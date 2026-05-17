import Redis from "ioredis";

let redis: Redis | null = null;

function getRedis(): Redis {
  if (!redis) {
    redis = new Redis(process.env.RATE_LIMIT_REDIS_URL ?? "redis://localhost:6379/1", {
      lazyConnect: true,
      maxRetriesPerRequest: 1,
    });
  }
  return redis;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
}

// Sliding window counter — máx `limit` peticiones en `windowSec` segundos por clave.
export async function rateLimit(
  key: string,
  limit = 3,
  windowSec = 600,
): Promise<RateLimitResult> {
  const client = getRedis();
  const now    = Date.now();
  const window = now - windowSec * 1000;
  const redisKey = `rl:${key}`;

  try {
    const pipeline = client.pipeline();
    pipeline.zremrangebyscore(redisKey, 0, window);
    pipeline.zadd(redisKey, now, `${now}`);
    pipeline.zcard(redisKey);
    pipeline.expire(redisKey, windowSec);

    const results = await pipeline.exec();
    const count   = (results?.[2]?.[1] as number) ?? 0;

    return {
      allowed:   count <= limit,
      remaining: Math.max(0, limit - count),
    };
  } catch {
    // Si Redis no está disponible, no bloqueamos al usuario
    return { allowed: true, remaining: limit };
  }
}

export function ipKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip        = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  return ip;
}
