import { useState, useEffect, useCallback, useRef } from 'react';
import frontendCache, { CACHE_TTL } from '../lib/cache';

/**
 * Reusable data-fetching hook with built-in frontend caching, stale-while-revalidate,
 * background refresh, and optimistic mutation capabilities.
 *
 * @param {string} key - Cache key
 * @param {Function} fetcherFn - Data fetching function returning a Promise or raw data
 * @param {Object} options - Configuration options
 * @returns {Object} Query result object
 */
export function useCachedData(key, fetcherFn, options = {}) {
  const {
    ttl = CACHE_TTL.DEFAULT,
    staleWhileRevalidate = true,
    initialData = null,
    enabled = true,
    onSuccess,
    onError,
  } = options;

  // Read initial data from cache synchronously to prevent layout shifts
  const initialCache = key ? frontendCache.get(key) : null;
  const initialValue = initialCache ? initialCache.data : initialData;
  const initiallyHasValidData = Boolean(initialCache && !initialCache.isStale);

  const [data, setDataState] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(!initialCache && enabled);
  const [isFetching, setIsFetching] = useState(Boolean(initialCache?.isStale && enabled));
  const [error, setError] = useState(null);
  const [isStale, setIsStale] = useState(Boolean(initialCache?.isStale));

  const fetcherRef = useRef(fetcherFn);
  fetcherRef.current = fetcherFn;

  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;

  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  // Core fetch logic
  const executeFetch = useCallback(
    async (force = false) => {
      if (!key || !enabled) return;

      const cached = frontendCache.get(key);
      if (cached && !cached.isStale && !force) {
        setDataState(cached.data);
        setIsLoading(false);
        setIsFetching(false);
        setIsStale(false);
        return cached.data;
      }

      if (!cached) {
        setIsLoading(true);
      } else {
        setIsFetching(true);
        setIsStale(true);
      }
      setError(null);

      try {
        const result = await Promise.resolve(fetcherRef.current());
        frontendCache.set(key, result, { ttl });
        setDataState(result);
        setIsLoading(false);
        setIsFetching(false);
        setIsStale(false);
        if (onSuccessRef.current) onSuccessRef.current(result);
        return result;
      } catch (err) {
        setError(err);
        setIsLoading(false);
        setIsFetching(false);
        if (onErrorRef.current) onErrorRef.current(err);
        // If we had stale cached data, we retain it rather than blanking the screen
        if (cached) {
          setDataState(cached.data);
        }
      }
    },
    [key, ttl, enabled]
  );

  // Subscribe to cache updates for this key
  useEffect(() => {
    if (!key) return;

    const unsubscribe = frontendCache.subscribe(key, (newData, isInvalidated) => {
      if (isInvalidated) {
        executeFetch(true);
      } else if (newData !== undefined) {
        setDataState(newData);
        setIsStale(false);
      }
    });

    return unsubscribe;
  }, [key, executeFetch]);

  // Trigger fetch on mount or key change
  useEffect(() => {
    if (!enabled || !key) return;

    const cached = frontendCache.get(key);
    if (!cached) {
      executeFetch();
    } else if (cached.isStale || staleWhileRevalidate) {
      // Stale while revalidate
      setDataState(cached.data);
      if (cached.isStale) {
        executeFetch();
      }
    }
  }, [key, enabled, staleWhileRevalidate, executeFetch]);

  // Optimistically set data in both local state and cache
  const setData = useCallback(
    (updaterOrData) => {
      if (!key) return;
      const next = frontendCache.mutate(key, updaterOrData);
      setDataState(next);
      return next;
    },
    [key]
  );

  // Invalidate this specific key
  const invalidate = useCallback(() => {
    if (!key) return;
    frontendCache.invalidate(key);
  }, [key]);

  // Manual refetch
  const refetch = useCallback(() => {
    return executeFetch(true);
  }, [executeFetch]);

  return {
    data,
    isLoading,
    isFetching,
    isStale,
    error,
    refetch,
    setData,
    invalidate,
  };
}

export default useCachedData;
