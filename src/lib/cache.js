/**
 * Tory's Treats Frontend Caching Layer
 * Provides in-memory query/data caching with TTL, stale-while-revalidate,
 * pattern-based invalidation, and subscription mechanics.
 * Structured for smooth eventual migration to server-side query libraries.
 */

export const CACHE_TTL = {
  SHORT: 30 * 1000,           // 30 seconds
  DEFAULT: 5 * 60 * 1000,     // 5 minutes
  PRODUCTS: 10 * 60 * 1000,   // 10 minutes
  CATEGORIES: 15 * 60 * 1000, // 15 minutes
  SETTINGS: 30 * 60 * 1000,   // 30 minutes
  STATIC: 60 * 60 * 1000,     // 1 hour
};

class QueryCache {
  constructor() {
    this.store = new Map();
    this.listeners = new Map();
  }

  /**
   * Helper to generate a standardized cache key
   */
  makeKey(prefix, ...args) {
    if (!args || args.length === 0) return String(prefix);
    const serializedArgs = args
      .filter((a) => a !== undefined && a !== null)
      .map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a)))
      .join(':');
    return `${prefix}:${serializedArgs}`;
  }

  /**
   * Retrieve cached item
   * @param {string} key
   * @returns {{ data: any, isStale: boolean } | null}
   */
  get(key) {
    const entry = this.store.get(key);
    if (!entry) return null;

    const now = Date.now();
    const isStale = now - entry.timestamp > entry.ttl;

    return {
      data: entry.data,
      timestamp: entry.timestamp,
      isStale,
    };
  }

  /**
   * Check if a valid (non-stale) item exists in cache
   */
  has(key) {
    const item = this.get(key);
    return Boolean(item && !item.isStale);
  }

  /**
   * Save item into cache with TTL
   */
  set(key, data, { ttl = CACHE_TTL.DEFAULT } = {}) {
    const entry = {
      data,
      timestamp: Date.now(),
      ttl,
    };

    this.store.set(key, entry);
    this._notify(key, data);
    return data;
  }

  /**
   * Directly mutate cached data and notify subscribers (essential for optimistic updates)
   */
  mutate(key, updaterOrData) {
    const current = this.store.get(key);
    const currentData = current ? current.data : undefined;
    const nextData =
      typeof updaterOrData === 'function'
        ? updaterOrData(currentData)
        : updaterOrData;

    const ttl = current ? current.ttl : CACHE_TTL.DEFAULT;
    return this.set(key, nextData, { ttl });
  }

  /**
   * Invalidate a single key or pattern matching multiple keys
   * @param {string|RegExp} pattern e.g. 'products' or 'products:*' or /products/
   */
  invalidate(pattern) {
    let invalidatedCount = 0;

    if (typeof pattern === 'string') {
      const isWildcard = pattern.endsWith('*');
      const prefix = isWildcard ? pattern.slice(0, -1) : pattern;

      for (const key of this.store.keys()) {
        if (key === pattern || (isWildcard && key.startsWith(prefix)) || key.startsWith(`${pattern}:`)) {
          this.store.delete(key);
          this._notify(key, null, true);
          invalidatedCount++;
        }
      }
    } else if (pattern instanceof RegExp) {
      for (const key of this.store.keys()) {
        if (pattern.test(key)) {
          this.store.delete(key);
          this._notify(key, null, true);
          invalidatedCount++;
        }
      }
    }

    return invalidatedCount;
  }

  /**
   * Clear all cached items
   */
  clear() {
    this.store.clear();
    for (const key of this.listeners.keys()) {
      this._notify(key, null, true);
    }
  }

  /**
   * Subscribe to cache updates for a given key
   */
  subscribe(key, callback) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key).add(callback);

    return () => {
      const subs = this.listeners.get(key);
      if (subs) {
        subs.delete(callback);
        if (subs.size === 0) {
          this.listeners.delete(key);
        }
      }
    };
  }

  /**
   * Internal notification helper
   */
  _notify(key, data, isInvalidated = false) {
    const subs = this.listeners.get(key);
    if (subs) {
      subs.forEach((cb) => {
        try {
          cb(data, isInvalidated);
        } catch (err) {
          console.error(`Error in cache listener for ${key}:`, err);
        }
      });
    }
  }

  /**
   * Get total number of cached entries
   */
  size() {
    return this.store.size;
  }

  /**
   * Get all active cache entries (useful for Dev showcase & diagnostics)
   */
  getEntries() {
    const now = Date.now();
    const entries = [];
    for (const [key, val] of this.store.entries()) {
      entries.push({
        key,
        timestamp: val.timestamp,
        ttl: val.ttl,
        expiresInMs: Math.max(0, val.timestamp + val.ttl - now),
        isStale: now - val.timestamp > val.ttl,
      });
    }
    return entries;
  }
}

// Global Singleton Cache Instance
export const frontendCache = new QueryCache();

export default frontendCache;
