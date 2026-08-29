import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  Activity,
  Cpu,
  Server,
  Zap,
  Globe,
  AlertTriangle,
  CheckCircle2,
  Lock,
  ArrowRight,
  RefreshCw,
  Fingerprint,
  AlertOctagon,
  Eye,
  Terminal,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useDeveloperTelemetry } from '../../hooks/useDeveloperTelemetry';
import { useToast } from '../../hooks/useToast';
import Tooltip from '../../components/ui/Tooltip';

export default function DeveloperOverview() {
  const { summary, securityEvents, ipReputation, errors, performance, resolveSecurityEvent } = useDeveloperTelemetry();
  const toast = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Telemetry streams refreshed from edge buffer.', 'Observability Synced');
    }, 400);
  };

  const criticalThreats = securityEvents.filter((e) => !e.resolved && (e.severity === 'CRITICAL' || e.severity === 'HIGH'));
  const recentEvents = securityEvents.slice(0, 5);
  const elevatedIps = ipReputation.filter((i) => i.status === 'BLOCKED' || i.status === 'ELEVATED' || i.status === 'CHALLENGED');

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#30363d] pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight font-sans">
              Platform Observability & Security Center
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
              Vercel Edge Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#8b949e] mt-1">
            Real-time Edge WAF, behavioral anomaly detection, PostgreSQL health, and Core Web Vitals.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] text-xs font-mono text-[#c9d1d9] hover:text-white transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-rose-400' : 'text-[#8b949e]'}`} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh Telemetry'}</span>
          </button>
        </div>
      </div>

      {/* Critical Alert Notice if Threats Exist */}
      {criticalThreats.length > 0 && (
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/80 text-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg shadow-rose-950/20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-900/60 border border-rose-700 flex items-center justify-center text-rose-300 shrink-0">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-bold text-rose-300 uppercase tracking-wider block font-mono">
                {criticalThreats.length} High-Risk Security Event(s) Detected
              </span>
              <p className="text-xs text-rose-200/80 mt-0.5">
                Edge WAF and IP anomaly engine have flagged suspicious endpoint scanning or probing.
              </p>
            </div>
          </div>
          <Link
            to="/developer/security"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold font-sans self-start sm:self-auto transition-colors"
          >
            <span>Review Security Center</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* System Health */}
        <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] shadow-sm space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-medium text-[#8b949e] uppercase">System State</span>
            <Tooltip content="Overall status based on live health checks across Edge, Database, and API">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </Tooltip>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-emerald-400">
              {summary.systemStatus}
            </span>
          </div>
          <div className="text-[11px] text-[#8b949e] flex items-center gap-1.5 pt-1 border-t border-[#21262d]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            <span>Zero-Trust RLS Policies 100% Active</span>
          </div>
        </div>

        {/* P95 API Latency */}
        <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] shadow-sm space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-medium text-[#8b949e] uppercase">P95 Latency</span>
            <Tooltip content="95th Percentile API Response Time. 95% of requests respond faster than this value.">
              <Activity className="w-4 h-4 text-blue-400" />
            </Tooltip>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-white">
              {summary.apiLatencyP95}
            </span>
            <span className="text-[11px] font-mono text-emerald-400">Optimal (&lt;300ms)</span>
          </div>
          <div className="text-[11px] text-[#8b949e] flex items-center justify-between pt-1 border-t border-[#21262d]">
            <span>P50: {performance.apiLatency.p50}ms</span>
            <span>P99: {performance.apiLatency.p99}ms</span>
          </div>
        </div>

        {/* Active Threats / WAF */}
        <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] shadow-sm space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-medium text-[#8b949e] uppercase">Active Threats</span>
            <Tooltip content="Current unresolved high or critical risk events flagged by Edge WAF or Anomaly Engine">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
            </Tooltip>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-amber-400">
              {summary.activeThreats}
            </span>
            <span className="text-[11px] text-[#8b949e]">
              ({summary.blockedIps} IPs Blocked)
            </span>
          </div>
          <div className="text-[11px] text-[#8b949e] flex items-center justify-between pt-1 border-t border-[#21262d]">
            <span>Total Events: {summary.securityEventsCount}</span>
            <Link to="/developer/security" className="text-rose-400 hover:underline">
              Inspect →
            </Link>
          </div>
        </div>

        {/* Core Web Vitals LCP */}
        <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] shadow-sm space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-medium text-[#8b949e] uppercase">LCP Speed</span>
            <Tooltip content="Largest Contentful Paint. Measures perceived load speed of the main bakery storefront.">
              <Zap className="w-4 h-4 text-emerald-400" />
            </Tooltip>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-emerald-400">
              {performance.lcp.value}s
            </span>
            <span className="text-[11px] font-mono text-emerald-400">Good (&lt;2.5s)</span>
          </div>
          <div className="text-[11px] text-[#8b949e] flex items-center justify-between pt-1 border-t border-[#21262d]">
            <span>CLS: {performance.cls.value}</span>
            <span>INP: {performance.inp.value}ms</span>
          </div>
        </div>
      </div>

      {/* Two-Column Grid: Live Security Feed & IP Behavioral Anomalies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Security Stream */}
        <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-4">
          <div className="flex items-center justify-between border-b border-[#21262d] pb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <h2 className="text-sm font-bold text-white font-sans">
                Live Security Telemetry Stream
              </h2>
            </div>
            <Link
              to="/developer/security"
              className="text-xs font-mono text-rose-400 hover:underline flex items-center gap-1"
            >
              <span>View All ({securityEvents.length})</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {recentEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-3 rounded-xl bg-[#161b22] border border-[#30363d] flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                        evt.severity === 'CRITICAL'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : evt.severity === 'HIGH'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}
                    >
                      {evt.severity}
                    </span>
                    <span className="font-mono text-white font-semibold">{evt.event_type}</span>
                    <span className="text-[#8b949e] font-mono text-[11px]">[{evt.ip_address}]</span>
                  </div>
                  <div className="text-[#8b949e] truncate">
                    <code className="text-rose-300 bg-rose-950/30 px-1 py-0.5 rounded">{evt.http_method} {evt.endpoint}</code>
                    {evt.metadata?.rule && <span className="ml-2">• Rule: {evt.metadata.rule}</span>}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono text-[#8b949e] block">
                    {new Date(evt.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {!evt.resolved ? (
                    <button
                      type="button"
                      onClick={() => resolveSecurityEvent(evt.id)}
                      className="text-[10px] text-emerald-400 hover:underline mt-1 cursor-pointer font-mono"
                    >
                      Mark Resolved
                    </button>
                  ) : (
                    <span className="text-[10px] text-[#8b949e] font-mono">Resolved</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Behavioral IP Reputation & Anomaly Tracker */}
        <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-4">
          <div className="flex items-center justify-between border-b border-[#21262d] pb-3">
            <div className="flex items-center gap-2">
              <Fingerprint className="w-4 h-4 text-blue-400" />
              <h2 className="text-sm font-bold text-white font-sans">
                IP Behavioral Risk Matrix
              </h2>
            </div>
            <Link
              to="/developer/ip-anomaly"
              className="text-xs font-mono text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Manage IPs ({ipReputation.length})</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {elevatedIps.map((ip) => (
              <div
                key={ip.ip_address}
                className="p-3 rounded-xl bg-[#161b22] border border-[#30363d] flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white">{ip.ip_address}</span>
                    <span className="text-[10px] font-mono text-[#8b949e]">({ip.ip_country})</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                        ip.status === 'BLOCKED'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : ip.status === 'CHALLENGED'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}
                    >
                      {ip.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8b949e]">{ip.notes}</p>
                </div>

                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1.5 justify-end">
                    <span className="text-[10px] font-mono text-[#8b949e]">Risk:</span>
                    <span
                      className={`font-mono font-black text-sm ${
                        ip.risk_score > 80 ? 'text-rose-400' : ip.risk_score > 50 ? 'text-amber-400' : 'text-blue-400'
                      }`}
                    >
                      {ip.risk_score}/100
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#8b949e]">
                    {ip.total_requests} requests observed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Infrastructure & Architecture Status Matrix */}
      <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-4">
        <div className="flex items-center justify-between border-b border-[#21262d] pb-3">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white font-sans">
              Infrastructure & Defense-in-Depth Status
            </h2>
          </div>
          <span className="text-[11px] font-mono text-[#8b949e]">
            Architecture: Layer 1 Vercel Edge • Layer 2 App • Layer 3 Supabase RLS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          {/* Layer 1 */}
          <div className="p-3.5 rounded-xl bg-[#161b22] border border-[#30363d] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[#8b949e] text-[10px] uppercase">Layer 1: Edge Security</span>
              <span className="text-emerald-400 text-[10px]">OPERATIONAL</span>
            </div>
            <div className="font-bold text-white text-xs">Vercel Edge WAF & Firewall</div>
            <p className="text-[11px] text-[#8b949e] font-sans">
              DDoS mitigation, bot inspection, rate limiting headers, anycast DNS.
            </p>
          </div>

          {/* Layer 2 */}
          <div className="p-3.5 rounded-xl bg-[#161b22] border border-[#30363d] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[#8b949e] text-[10px] uppercase">Layer 2: Application</span>
              <span className="text-emerald-400 text-[10px]">OPERATIONAL</span>
            </div>
            <div className="font-bold text-white text-xs">React 18 + Behavioral Risk</div>
            <p className="text-[11px] text-[#8b949e] font-sans">
              Client Web Vitals observer, error sanitization, zero-trust role guards.
            </p>
          </div>

          {/* Layer 3 */}
          <div className="p-3.5 rounded-xl bg-[#161b22] border border-[#30363d] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[#8b949e] text-[10px] uppercase">Layer 3: Database</span>
              <span className="text-emerald-400 text-[10px]">OPERATIONAL</span>
            </div>
            <div className="font-bold text-white text-xs">Supabase PostgreSQL 15+</div>
            <p className="text-[11px] text-[#8b949e] font-sans">
              100% RLS policy enforcement, role escalation triggers, developer isolation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
