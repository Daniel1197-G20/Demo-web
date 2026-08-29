import React, { useState } from 'react';
import {
  AlertOctagon,
  CheckCircle2,
  Bug,
  Search,
  Filter,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Terminal,
} from 'lucide-react';
import { useDeveloperTelemetry } from '../../hooks/useDeveloperTelemetry';
import { useToast } from '../../hooks/useToast';

export default function DeveloperErrors() {
  const { errors, resolveError, store } = useDeveloperTelemetry();
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterResolved, setFilterResolved] = useState('UNRESOLVED');
  const [expandedId, setExpandedId] = useState(null);

  const filteredErrors = errors.filter((err) => {
    if (filterResolved === 'UNRESOLVED' && err.resolved) return false;
    if (filterResolved === 'RESOLVED' && !err.resolved) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchMsg = err.error_message.toLowerCase().includes(q);
      const matchType = err.error_type.toLowerCase().includes(q);
      const matchRoute = err.route.toLowerCase().includes(q);
      if (!matchMsg && !matchType && !matchRoute) return false;
    }
    return true;
  });

  const handleTestError = () => {
    try {
      throw new Error(`Test Error [Signature ${Math.random().toString(36).substring(2, 6)}]: Network timeout fetching catalog asset.`);
    } catch (e) {
      store.recordError(e, window.location.pathname);
      toast.error('Synthetic error captured and sanitized by telemetry listener.', 'Error Intercepted');
    }
  };

  const handleResolve = (id) => {
    resolveError(id);
    toast.success('Error trace marked as resolved.', 'Resolved');
  };

  const totalErrors = errors.length;
  const unresolvedCount = errors.filter((e) => !e.resolved).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#30363d] pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight font-sans">
              Application Error Monitoring & Stack Traces
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono font-medium">
              Sanitized Sentry-Level Traces
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#8b949e] mt-1">
            Real-time capture of unhandled exceptions, runtime errors, and network failures with zero credential leakage.
          </p>
        </div>

        <button
          type="button"
          onClick={handleTestError}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-[#E82C7C] hover:from-rose-500 hover:to-[#ff4593] text-white text-xs font-mono font-bold transition-all shadow-md cursor-pointer self-start sm:self-auto"
        >
          <Bug className="w-3.5 h-3.5" />
          <span>Trigger Test Exception</span>
        </button>
      </div>

      {/* Error Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
        <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-1">
          <span className="text-xs text-[#8b949e] uppercase">Total Unique Errors</span>
          <div className="text-2xl font-black text-white">{totalErrors}</div>
          <p className="text-[11px] text-[#8b949e]">Captured in current lifecycle</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-1">
          <span className="text-xs text-[#8b949e] uppercase">Unresolved Exceptions</span>
          <div className="text-2xl font-black text-rose-400">{unresolvedCount}</div>
          <p className="text-[11px] text-[#8b949e]">Requiring developer attention</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-1">
          <span className="text-xs text-[#8b949e] uppercase">Data Sanitization</span>
          <div className="text-2xl font-black text-emerald-400">100% SECURE</div>
          <p className="text-[11px] text-[#8b949e]">Auth tokens & keys stripped</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] flex flex-col sm:flex-row gap-3 items-center justify-between font-mono text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-[#8b949e] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by error signature or route..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#161b22] border border-[#30363d] text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-rose-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setFilterResolved('UNRESOLVED')}
            className={`px-3 py-1.5 rounded-xl cursor-pointer ${
              filterResolved === 'UNRESOLVED'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'bg-[#161b22] text-[#8b949e]'
            }`}
          >
            Unresolved ({unresolvedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterResolved('RESOLVED')}
            className={`px-3 py-1.5 rounded-xl cursor-pointer ${
              filterResolved === 'RESOLVED'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-[#161b22] text-[#8b949e]'
            }`}
          >
            Resolved ({totalErrors - unresolvedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterResolved('ALL')}
            className={`px-3 py-1.5 rounded-xl cursor-pointer ${
              filterResolved === 'ALL'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                : 'bg-[#161b22] text-[#8b949e]'
            }`}
          >
            All ({totalErrors})
          </button>
        </div>
      </div>

      {/* Error Trace List */}
      <div className="space-y-3 font-mono text-xs">
        {filteredErrors.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#0d1117] border border-[#30363d] text-[#8b949e] space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <p className="text-sm font-sans text-white font-bold">Zero errors matching current filter.</p>
            <p className="text-xs">Application runtime is executing cleanly.</p>
          </div>
        ) : (
          filteredErrors.map((err) => {
            const isExpanded = expandedId === err.id;
            return (
              <div
                key={err.id}
                className="rounded-2xl bg-[#0d1117] border border-[#30363d] overflow-hidden transition-all"
              >
                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#161b22]/50">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/30 text-rose-400 font-bold text-[10px]">
                        {err.error_type}
                      </span>
                      <span className="text-[#8b949e] text-[11px]">
                        Route: <code className="text-rose-300 bg-rose-950/30 px-1 py-0.5 rounded">{err.route}</code>
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-[#21262d] text-[#c9d1d9] text-[10px]">
                        {err.occurrence_count} {err.occurrence_count === 1 ? 'occurrence' : 'occurrences'}
                      </span>
                    </div>
                    <p className="text-white font-semibold text-xs truncate">
                      {err.error_message}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    {!err.resolved ? (
                      <button
                        type="button"
                        onClick={() => handleResolve(err.id)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold text-[11px] cursor-pointer font-sans"
                      >
                        Resolve
                      </button>
                    ) : (
                      <span className="text-emerald-400 text-[11px]">✓ Resolved</span>
                    )}

                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : err.id)}
                      className="px-3 py-1.5 rounded-xl bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] text-[11px] cursor-pointer flex items-center gap-1"
                    >
                      <span>{isExpanded ? 'Hide Trace' : 'Inspect Trace'}</span>
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-4 border-t border-[#21262d] bg-[#090d13] space-y-3">
                    <div>
                      <span className="text-[#8b949e] text-[11px] block mb-1">Sanitized Stack Trace:</span>
                      <pre className="p-3 rounded-xl bg-[#0d1117] border border-[#30363d] text-rose-300 overflow-x-auto text-[11px] leading-relaxed">
                        {err.stack_trace}
                      </pre>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#8b949e]">
                      <div>First Seen: <span className="text-white">{new Date(err.first_seen).toLocaleString()}</span></div>
                      <div>Last Seen: <span className="text-white">{new Date(err.last_seen).toLocaleString()}</span></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
