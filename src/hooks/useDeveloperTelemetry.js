import { useState, useEffect, useCallback } from 'react';
import developerStore from '../lib/developerStore';

/**
 * Custom React hook for subscribing to real-time developer telemetry,
 * observing browser Performance entries, and capturing client metrics.
 */
export function useDeveloperTelemetry() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const handleUpdate = () => setTick((t) => t + 1);
    window.addEventListener('torys_dev_telemetry_updated', handleUpdate);
    return () => window.removeEventListener('torys_dev_telemetry_updated', handleUpdate);
  }, []);

  // Performance Observer for real-time client Web Vitals
  useEffect(() => {
    if (typeof window === 'undefined' || !window.PerformanceObserver) return;

    try {
      // Observe LCP
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          const lcpSec = lastEntry.startTime / 1000;
          const rating = lcpSec <= 2.5 ? 'good' : lcpSec <= 4.0 ? 'needs-improvement' : 'poor';
          developerStore.recordClientVital('lcp', lcpSec, rating);
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      // Observe CLS
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        const rating = clsValue <= 0.1 ? 'good' : clsValue <= 0.25 ? 'needs-improvement' : 'poor';
        developerStore.recordClientVital('cls', clsValue, rating);
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });

      // Observe Navigation Timing for TTFB
      const navEntries = performance.getEntriesByType('navigation');
      if (navEntries.length > 0) {
        const nav = navEntries[0];
        const ttfbMs = nav.responseStart - nav.requestStart;
        if (ttfbMs > 0) {
          const rating = ttfbMs <= 800 ? 'good' : ttfbMs <= 1800 ? 'needs-improvement' : 'poor';
          developerStore.recordClientVital('ttfb', ttfbMs, rating);
        }
      }

      return () => {
        lcpObserver.disconnect();
        clsObserver.disconnect();
      };
    } catch (e) {
      // Browser does not support specific performance entry types
    }
  }, []);

  // Error capturing listener
  useEffect(() => {
    const handleWindowError = (event) => {
      developerStore.recordError(
        event.error || { name: 'Error', message: event.message, stack: `${event.filename}:${event.lineno}` },
        window.location.pathname
      );
    };

    const handleUnhandledRejection = (event) => {
      developerStore.recordError(
        event.reason || { name: 'UnhandledPromiseRejection', message: 'Unhandled Promise Rejection' },
        window.location.pathname
      );
    };

    window.addEventListener('error', handleWindowError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleWindowError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return {
    store: developerStore,
    summary: developerStore.getSummary(),
    securityEvents: developerStore.getSecurityEvents(),
    auditLogs: developerStore.getAuditLogs(),
    errors: developerStore.getErrorEvents(),
    ipReputation: developerStore.getIpReputation(),
    performance: developerStore.getPerformanceMetrics(),
    resolveSecurityEvent: useCallback((id) => developerStore.resolveSecurityEvent(id), []),
    resolveError: useCallback((id) => developerStore.resolveError(id), []),
    unblockIp: useCallback((ip) => developerStore.unblockIp(ip), []),
    blockIpManual: useCallback((ip, reason) => developerStore.blockIpManual(ip, reason), []),
    logAction: useCallback((action, resource, id, details) => developerStore.logAction(action, resource, id, details), []),
  };
}

export default useDeveloperTelemetry;
