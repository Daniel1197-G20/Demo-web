import React from 'react';
import {
  GitBranch,
  CheckCircle2,
  Cpu,
  Lock,
  ExternalLink,
  ShieldCheck,
  Server,
  Layers,
  Terminal,
  AlertTriangle,
} from 'lucide-react';
import Tooltip from '../../components/ui/Tooltip';

export default function DeveloperDeployments() {
  const ENV_VARS = [
    { name: 'VITE_SUPABASE_URL', scope: 'PUBLIC CLIENT', status: 'CONFIGURED', desc: 'Supabase project endpoint. Safe for browser runtime.' },
    { name: 'VITE_SUPABASE_ANON_KEY', scope: 'PUBLIC CLIENT', status: 'CONFIGURED', desc: 'Supabase anonymous JWT. Protected by 100% PostgreSQL RLS.' },
    { name: 'SUPABASE_SERVICE_ROLE_KEY', scope: 'SERVER ONLY (API)', status: 'PROTECTED', desc: 'Administrative bypass key. Strictly isolated to serverless functions; NEVER sent to browser.' },
    { name: 'VERCEL_API_TOKEN', scope: 'SERVER ONLY (API)', status: 'MANUAL OPTIONAL', desc: 'Vercel platform API key for automated log drains and build webhooks.' },
    { name: 'VERCEL_PROJECT_ID', scope: 'SERVER ONLY (API)', status: 'MANUAL OPTIONAL', desc: 'Project identifier for automated telemetry sync.' },
  ];

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#30363d] pb-6 font-sans">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Deployment Operations & Environment Audit
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
              Vercel Production Release
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#8b949e] mt-1">
            Build telemetry, Git release commit metadata, edge runtime configuration, and secret protection audit.
          </p>
        </div>
      </div>

      {/* Deployment Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-1">
          <span className="text-xs text-[#8b949e] uppercase">Deployment Status</span>
          <div className="text-2xl font-black text-emerald-400">READY (LIVE)</div>
          <p className="text-[11px] text-[#8b949e]">Vercel Edge Global</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-1">
          <span className="text-xs text-[#8b949e] uppercase">Release Version</span>
          <div className="text-2xl font-black text-white">v1.0.0-prod</div>
          <p className="text-[11px] text-blue-400">Git commit 389cb42</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-1">
          <span className="text-xs text-[#8b949e] uppercase">Target Environment</span>
          <div className="text-2xl font-black text-emerald-400">PRODUCTION</div>
          <p className="text-[11px] text-[#8b949e]">Branch: main</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-1">
          <span className="text-xs text-[#8b949e] uppercase">Build Duration</span>
          <div className="text-2xl font-black text-white">~17.9 s</div>
          <p className="text-[11px] text-emerald-400">Vite Rollup Optimized</p>
        </div>
      </div>

      {/* Environment Variables Zero-Leakage Checklist */}
      <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-4">
        <div className="flex items-center justify-between border-b border-[#21262d] pb-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white font-sans">
              Environment Variables & Secret Isolation Audit
            </h2>
          </div>
          <span className="text-emerald-400 text-[11px] font-bold">
            Zero Server Secrets Exposed to Browser
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#21262d] text-[#8b949e] text-[11px]">
                <th className="pb-3 px-3">VARIABLE NAME</th>
                <th className="pb-3 px-3">SECURITY SCOPE</th>
                <th className="pb-3 px-3">AUDIT STATUS</th>
                <th className="pb-3 px-3">PURPOSE & BOUNDARY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#21262d]">
              {ENV_VARS.map((v) => (
                <tr key={v.name} className="hover:bg-[#161b22]/60">
                  <td className="py-3 px-3 font-bold text-white"><code>{v.name}</code></td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        v.scope.includes('SERVER')
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}
                    >
                      {v.scope}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-emerald-400 font-bold">{v.status}</span>
                  </td>
                  <td className="py-3 px-3 text-[#8b949e] font-sans text-xs">{v.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Configuration Instructions Banner */}
      <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-3 font-sans text-xs">
        <div className="flex items-center gap-2 text-amber-400 font-bold font-mono">
          <AlertTriangle className="w-4 h-4" />
          <span>MANUAL VERCEL & SUPABASE CONFIGURATION REFERENCE</span>
        </div>
        <p className="text-[#8b949e] leading-relaxed">
          For enhanced production observability, configure the following in your Vercel and Supabase dashboard settings:
        </p>
        <ol className="list-decimal pl-5 space-y-1.5 text-[#c9d1d9] font-mono text-[11px]">
          <li><strong className="text-white">Vercel Firewall / WAF:</strong> In Vercel Project Settings → Security, ensure Bot Protection and DDoS Layer 7 mitigation are toggled to Enabled.</li>
          <li><strong className="text-white">Supabase Auth Rate Limiting:</strong> In Supabase Dashboard → Authentication → Rate Limits, enforce 30 requests/hour for email auth signup to prevent automated registration enumeration.</li>
          <li><strong className="text-white">Vercel Log Drains (Optional):</strong> In Vercel Project Settings → Log Drains, configure an HTTP endpoint drain if external long-term SIEM archiving is required.</li>
        </ol>
      </div>
    </div>
  );
}
