import React, { useState } from 'react';
import {
  Fingerprint,
  ShieldAlert,
  ShieldCheck,
  Ban,
  Unlock,
  AlertTriangle,
  Activity,
  Play,
  RotateCcw,
  Sparkles,
  Info,
} from 'lucide-react';
import { useDeveloperTelemetry } from '../../hooks/useDeveloperTelemetry';
import { useToast } from '../../hooks/useToast';
import Tooltip from '../../components/ui/Tooltip';

export default function DeveloperIpAnomaly() {
  const { ipReputation, unblockIp, blockIpManual, store } = useDeveloperTelemetry();
  const toast = useToast();

  const [simIp, setSimIp] = useState('197.210.88.42');
  const [simSignal, setSimSignal] = useState('ENDPOINT_SCANNING');
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const updated = store.updateIpAnomaly(simIp, {
        event_type: simSignal,
        ip_country: 'NG',
      });
      setIsSimulating(false);
      toast.warning(
        `Signal '${simSignal}' processed for IP ${simIp}. New Risk Score: ${updated.risk_score}/100 (${updated.status})`,
        'Behavioral Risk Updated'
      );
    }, 350);
  };

  const handleUnblock = (ip) => {
    unblockIp(ip);
    toast.success(`IP ${ip} unblocked and reset to MONITOR status.`, 'IP Restored');
  };

  const handleManualBlock = (ip) => {
    blockIpManual(ip, 'Developer manual administrative block');
    toast.error(`IP ${ip} manually escalated to BLOCKED status.`, 'IP Blocked');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#30363d] pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight font-sans">
              Behavioral IP Anomaly & Reputation Engine
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-medium">
              Dynamic Risk Model
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#8b949e] mt-1">
            Application-level risk scoring analyzing request bursts, 401 login failures, and 404 endpoint enumeration.
          </p>
        </div>
      </div>

      {/* Risk Scoring Model Architecture Banner */}
      <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-4">
        <div className="flex items-center justify-between border-b border-[#21262d] pb-3">
          <div className="flex items-center gap-2 font-bold text-white text-sm font-sans">
            <Fingerprint className="w-4 h-4 text-blue-400" />
            <span>Behavioral Risk Matrix & Conservative Escalation Model</span>
          </div>
          <span className="text-[11px] font-mono text-[#8b949e]">
            Zero Permanent Auto-Bans • Dynamic Cooldown
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div className="p-3 rounded-xl bg-[#161b22] border border-emerald-500/30 space-y-1">
            <div className="flex items-center justify-between text-emerald-400 font-bold">
              <span>0–20 LOW</span>
              <span className="text-[10px]">MONITOR</span>
            </div>
            <p className="text-[11px] text-[#8b949e] font-sans">
              Normal browsing behavior across customer catalog & checkout.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#161b22] border border-blue-500/30 space-y-1">
            <div className="flex items-center justify-between text-blue-400 font-bold">
              <span>21–50 MEDIUM</span>
              <span className="text-[10px]">ELEVATED</span>
            </div>
            <p className="text-[11px] text-[#8b949e] font-sans">
              Moderate burst or single failed auth attempt. Increased logging.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#161b22] border border-amber-500/30 space-y-1">
            <div className="flex items-center justify-between text-amber-400 font-bold">
              <span>51–80 HIGH</span>
              <span className="text-[10px]">CHALLENGE</span>
            </div>
            <p className="text-[11px] text-[#8b949e] font-sans">
              Multiple 401s or rapid 404 path enumeration. Escalates rate limiting.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#161b22] border border-rose-500/30 space-y-1">
            <div className="flex items-center justify-between text-rose-400 font-bold">
              <span>81–100 CRITICAL</span>
              <span className="text-[10px]">BLOCKED</span>
            </div>
            <p className="text-[11px] text-[#8b949e] font-sans">
              Vulnerability scanning (e.g. .env, wp-admin). Temporary block window.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Behavioral Simulator Box */}
      <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-[#21262d] pb-3">
          <div className="flex items-center gap-2 font-sans font-bold text-white text-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Interactive Behavioral Anomaly Simulator</span>
          </div>
          <span className="text-[11px] text-[#8b949e]">
            Live Algorithmic Evaluation
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
          <div className="space-y-1">
            <label className="text-[#8b949e] text-[11px]">TARGET IP ADDRESS</label>
            <input
              type="text"
              value={simIp}
              onChange={(e) => setSimIp(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#161b22] border border-[#30363d] text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[#8b949e] text-[11px]">BEHAVIORAL SIGNAL</label>
            <select
              value={simSignal}
              onChange={(e) => setSimSignal(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#161b22] border border-[#30363d] text-white focus:outline-none focus:border-blue-500"
            >
              <option value="ENDPOINT_SCANNING">404 Vulnerability Scanning (.env / admin)</option>
              <option value="FAILED_LOGIN">Failed Admin Password Attempt (401)</option>
              <option value="WAF_EVENT">WAF Rule Trigger (SQLi / XSS probe)</option>
              <option value="UNAUTHORIZED_ACCESS">403 Forbidden Resource Probing</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleSimulate}
            disabled={isSimulating}
            className="w-full py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold font-sans transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 h-9"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isSimulating ? 'Evaluating...' : 'Inject Signal into Engine'}</span>
          </button>
        </div>
      </div>

      {/* IP Reputation Table */}
      <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-[#21262d] pb-3">
          <h2 className="text-sm font-bold text-white font-sans">
            Observed IP Reputation Registry ({ipReputation.length})
          </h2>
          <span className="text-[#8b949e] text-xs">
            Dynamic Scoring Engine
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#21262d] text-[#8b949e] text-[11px]">
                <th className="pb-3 px-3">IP ADDRESS</th>
                <th className="pb-3 px-3">COUNTRY</th>
                <th className="pb-3 px-3">RISK SCORE</th>
                <th className="pb-3 px-3">CURRENT STATUS</th>
                <th className="pb-3 px-3">SIGNALS (SCAN/401/TOTAL)</th>
                <th className="pb-3 px-3">LAST SIGNAL</th>
                <th className="pb-3 px-3 text-right">MITIGATION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#21262d]">
              {ipReputation.map((ip) => (
                <tr key={ip.ip_address} className="hover:bg-[#161b22]/60 transition-colors">
                  <td className="py-3 px-3 text-white font-bold">
                    <code>{ip.ip_address}</code>
                  </td>
                  <td className="py-3 px-3 text-[#c9d1d9]">{ip.ip_country}</td>
                  <td className="py-3 px-3 font-bold">
                    <span
                      className={`text-sm ${
                        ip.risk_score > 80 ? 'text-rose-400' : ip.risk_score > 50 ? 'text-amber-400' : ip.risk_score > 20 ? 'text-blue-400' : 'text-emerald-400'
                      }`}
                    >
                      {ip.risk_score}/100
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ip.status === 'BLOCKED'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : ip.status === 'CHALLENGED'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : ip.status === 'ELEVATED'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {ip.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#8b949e]">
                    <span>{ip.scanning_count} scans / {ip.failed_login_count} auth / {ip.total_requests} reqs</span>
                  </td>
                  <td className="py-3 px-3 text-[#8b949e]">
                    {ip.last_event_type || 'NORMAL_TRAFFIC'}
                  </td>
                  <td className="py-3 px-3 text-right space-x-2">
                    {ip.status === 'BLOCKED' ? (
                      <button
                        type="button"
                        onClick={() => handleUnblock(ip.ip_address)}
                        className="px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[11px] font-bold cursor-pointer font-sans"
                      >
                        Unblock IP
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleManualBlock(ip.ip_address)}
                        className="px-2.5 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-[11px] font-bold cursor-pointer font-sans"
                      >
                        Block IP
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
