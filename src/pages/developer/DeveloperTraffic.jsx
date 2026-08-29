import React from 'react';
import {
  Globe,
  TrendingUp,
  Smartphone,
  Monitor,
  Tablet,
  Layers,
  ArrowUpRight,
  Server,
  Filter,
} from 'lucide-react';
import { useDeveloperTelemetry } from '../../hooks/useDeveloperTelemetry';
import Tooltip from '../../components/ui/Tooltip';

export default function DeveloperTraffic() {
  const { performance } = useDeveloperTelemetry();

  const STATUS_CODES = [
    { code: '2xx OK', count: performance.requests2xx, percentage: '98.2%', color: 'emerald', desc: 'Successful delivery' },
    { code: '3xx Redirect', count: 112, percentage: '0.6%', color: 'blue', desc: 'Canonical URL & trailing slashes' },
    { code: '4xx Client Error', count: performance.requests4xx, percentage: '1.0%', color: 'amber', desc: '404 not found & 401 unauth' },
    { code: '5xx Server Error', count: performance.requests5xx, percentage: '0.2%', color: 'rose', desc: 'Uncaught exceptions' },
  ];

  const TOP_ENDPOINTS = [
    { endpoint: '/shop', method: 'GET', hits: 7820, latency: '120ms', status: '200' },
    { endpoint: '/api/products', method: 'GET', hits: 5410, latency: '85ms', status: '200' },
    { endpoint: '/checkout', method: 'POST', hits: 1980, latency: '180ms', status: '200' },
    { endpoint: '/catering', method: 'POST', hits: 1120, latency: '195ms', status: '200' },
    { endpoint: '/admin/dashboard', method: 'GET', hits: 890, latency: '140ms', status: '200' },
    { endpoint: '/.env', method: 'GET', hits: 14, latency: '12ms', status: '404 (Blocked)' },
  ];

  const GEO_DISTRIBUTION = [
    { country: 'Nigeria (Lagos / VI / Lekki)', count: 16420, percent: 89 },
    { country: 'United Kingdom (London)', count: 1110, percent: 6 },
    { country: 'United States (US East)', count: 550, percent: 3 },
    { country: 'Other Global Anycast', count: 370, percent: 2 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#30363d] pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight font-sans">
              Traffic Analytics & Edge Routing
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-medium">
              Vercel Global Anycast
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#8b949e] mt-1">
            Request volume, HTTP status distribution, geographic routing, and endpoint telemetry.
          </p>
        </div>

        <span className="text-xs font-mono text-[#8b949e] self-start sm:self-auto">
          Window: Last 24 Hours
        </span>
      </div>

      {/* Traffic Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-2">
          <span className="text-xs text-[#8b949e] uppercase">Total Requests</span>
          <div className="text-3xl font-black text-white">
            {performance.requestsTotal.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% from yesterday</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-2">
          <span className="text-xs text-[#8b949e] uppercase">Page Views</span>
          <div className="text-3xl font-black text-white">
            14,210
          </div>
          <div className="text-[11px] text-[#8b949e]">
            Storefront + Catalog Sessions
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-2">
          <span className="text-xs text-[#8b949e] uppercase">API Invocations</span>
          <div className="text-3xl font-black text-white">
            4,240
          </div>
          <div className="text-[11px] text-[#8b949e]">
            Supabase DB queries & RPCs
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-2">
          <span className="text-xs text-[#8b949e] uppercase">Edge Bandwidth</span>
          <div className="text-3xl font-black text-emerald-400">
            1.82 GB
          </div>
          <div className="text-[11px] text-blue-400">
            92.4% Asset Compression Ratio
          </div>
        </div>
      </div>

      {/* HTTP Status Codes Distribution */}
      <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-4">
        <h2 className="text-sm font-bold text-white font-sans">
          HTTP Status Code Distribution
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
          {STATUS_CODES.map((st) => (
            <div
              key={st.code}
              className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{st.code}</span>
                <span
                  className={`text-xs font-bold ${
                    st.color === 'emerald'
                      ? 'text-emerald-400'
                      : st.color === 'amber'
                      ? 'text-amber-400'
                      : st.color === 'rose'
                      ? 'text-rose-400'
                      : 'text-blue-400'
                  }`}
                >
                  {st.percentage}
                </span>
              </div>
              <div className="text-lg font-bold text-white">
                {st.count.toLocaleString()}
              </div>
              <p className="text-[11px] text-[#8b949e] font-sans">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Grid: Top Endpoints & Geographic Traffic */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Endpoints */}
        <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-4">
          <h2 className="text-sm font-bold text-white font-sans">
            Top Active Routes & Endpoints
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#21262d] text-[#8b949e] text-[11px]">
                  <th className="pb-2 px-2">METHOD</th>
                  <th className="pb-2 px-2">ENDPOINT</th>
                  <th className="pb-2 px-2">REQUESTS</th>
                  <th className="pb-2 px-2">LATENCY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#21262d]">
                {TOP_ENDPOINTS.map((ep, idx) => (
                  <tr key={idx} className="hover:bg-[#161b22]/60">
                    <td className="py-2.5 px-2 font-bold text-rose-400">{ep.method}</td>
                    <td className="py-2.5 px-2 text-[#c9d1d9]"><code>{ep.endpoint}</code></td>
                    <td className="py-2.5 px-2 text-white">{ep.hits.toLocaleString()}</td>
                    <td className="py-2.5 px-2 text-emerald-400">{ep.latency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Geographic Origin & Device Breakdown */}
        <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-5">
          <div>
            <h2 className="text-sm font-bold text-white font-sans">
              Geographic Traffic Origin
            </h2>
            <div className="space-y-3 mt-3">
              {GEO_DISTRIBUTION.map((geo) => (
                <div key={geo.country} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#c9d1d9]">{geo.country}</span>
                    <span className="text-white font-bold">{geo.percent}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#21262d] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-rose-500 to-[#E82C7C] rounded-full"
                      style={{ width: `${geo.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#21262d]">
            <h2 className="text-sm font-bold text-white font-sans mb-3">
              Device Category Distribution
            </h2>
            <div className="grid grid-cols-3 gap-3 text-center font-mono">
              <div className="p-3 rounded-xl bg-[#161b22] border border-[#30363d] space-y-1">
                <Smartphone className="w-4 h-4 text-rose-400 mx-auto" />
                <div className="text-sm font-bold text-white">62%</div>
                <div className="text-[10px] text-[#8b949e]">Mobile</div>
              </div>
              <div className="p-3 rounded-xl bg-[#161b22] border border-[#30363d] space-y-1">
                <Monitor className="w-4 h-4 text-blue-400 mx-auto" />
                <div className="text-sm font-bold text-white">34%</div>
                <div className="text-[10px] text-[#8b949e]">Desktop</div>
              </div>
              <div className="p-3 rounded-xl bg-[#161b22] border border-[#30363d] space-y-1">
                <Tablet className="w-4 h-4 text-emerald-400 mx-auto" />
                <div className="text-sm font-bold text-white">4%</div>
                <div className="text-[10px] text-[#8b949e]">Tablet</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
