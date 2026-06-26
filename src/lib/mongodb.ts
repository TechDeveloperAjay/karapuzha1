import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Cache connection state globally to reuse connections across serverless invocation cycles.
 * In development, this avoids opening new connections on hot reload.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  error: any | null;
}

declare global {
  // Prevent duplicate declarations in global namespace
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

// Global cached connection cache
let cached = global.mongoose;

export async function dbConnect(): Promise<typeof mongoose> {
  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null, error: null };
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (cached.error) {
    throw cached.error;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // Production-safe connection pool size configuration
      maxPoolSize: 10,
      // Auto-create indexes in development but typically disabled in high-traffic production environments
      autoIndex: process.env.NODE_ENV !== "production",
      // Connect timeout and socket settings
      connectTimeoutMS: 3000, // Reduced to 3s to prevent long hangs on compilation/dev timeouts
      socketTimeoutMS: 30000,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((m) => {
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    cached.error = e; // Cache connection error to prevent infinite retry loops in the same lifecycle
    throw e;
  }

  return cached.conn;
}
