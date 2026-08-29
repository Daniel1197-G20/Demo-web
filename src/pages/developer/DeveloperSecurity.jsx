import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Filter,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  Terminal,
  Zap,
  Lock,
  Sparkles,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { useDeveloperTelemetry } from '../../hooks/useDeveloperTelemetry';
import { useToast } from '../../hooks/useToast';
import Tooltip from '../../components/ui/Tooltip';

export default function DeveloperSecurity() {
  const { securityEvents, resolveSecurityEvent, store } = useDeveloperTelemetry();
  const toast = useToast();

  const [selectedSeverity, setSelectedSeverity] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Filtered Events
  const filteredEvents = securityEvents.filter((evt) => {
    if (selectedSeverity !== 'ALL' && evt.severity !== selectedSeverity) return false;
    if (selectedType !== 'ALL' && evt.event_type !== selectedType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchIp = evt.ip_address.toLowerCase().includes(q);
      const matchEndpoint = evt.endpoint.toLowerCase().includes(q);
      const matchType = evt.event_type.toLowerCase().includes(q);
      if (!matchIp && !matchEndpoint && !matchType) return false;
    }
    return true;
  });

  const handleSimulateWaf = () => {
    const simulated = store.addSecurityEvent({
      event_type: 'WAF_EVENT',
      severity: 'HIGH',
      ip_address: '194.26.29.' + Math.floor(Math.random() * 200 + 1),
      ip_country: 'FR',
      endpoint: '/api/admin/bulk-orders',
      http_method: 'POST',
      http_status: 403,
      risk_score: 75,
      metadata: { rule: 'SQLI_SIGNATURE_PROBE', trigger: "UNION SELECT * FROM profiles" },
    });
    toast.warning(`Simulated WAF Event generated from IP: ${simulated.ip_address}`, 'Threat Telemetry Simulated');
  };

  const handleResolve = (id) => {
    resolveSecurityEvent(id);
    toast.success('Security event marked as resolved.', 'Resolved');
    if (selectedEvent?.id === id) {
      setSelectedEvent((prev) => (prev ? { ...prev, resolved: true } : null));
    }
  };

  const totalThreats = securityEvents.length;
  const criticalCount = securityEvents.filter((e) => e.severity === 'CRITICAL' || e.severity === 'HIGH').length;
  const resolvedCount = securityEvents.filter((e) => e.resolved).length;
  const activeCount = totalThreats - resolvedCount;

  return (
    <div className="space-y-6">
      {/* Header & Quick Simulation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#30363d] pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight font-sans">
              Security Center & Edge WAF Telemetry
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono font-medium">
              Zero-Trust Monitor
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#8b949e] mt-1">
            Real-time inspection of Edge Firewall events, malicious probes, rate-limit triggers, and failed authentications.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSimulateWaf}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-[#E82C7C] hover:from-rose-500 hover:to-[#ff4593] text-white text-xs font-mono font-bold transition-all shadow-md cursor-pointer self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Simulate Threat Probe</span>
        </button>
      </div>

      {/* Vercel WAF Edge Configuration Notice */}
      <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold font-sans">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Vercel Edge Security Architecture (Layer 1)</span>
          </div>
          <span className="text-emerald-400 text-[11px] font-semibold">Active & Enforcing</span>
        </div>
        <p className="text-[#8b949e] font-sans text-xs leading-relaxed">
          WAF rules execute at Vercel Anycast edge locations prior to compute invocation. Managed rules inspect for SQLi, XSS, Path Traversal, and volumetric floods. Custom security headers (<code className="text-rose-300">CSP, X-Frame-Options, HSTS</code>) are enforced in <code className="text-rose-300">vercel.json</code>.
        </p>
        <div className="pt-2 border-t border-[#21262d] flex flex-wrap gap-2 text-[11px]">
          <span className="px-2 py-0.5 rounded bg-[#161b22] border border-[#30363d] text-[#c9d1d9]">
            ✓ Managed Bot Protection
          </span>
          <span className="px-2 py-0.5 rounded bg-[#161b22] border border-[#30363d] text-[#c9d1d9]">
            ✓ Layer 7 DDoS Mitigation
          </span>
          <span className="px-2 py-0.5 rounded bg-[#161b22] border border-[#30363d] text-[#c9d1d9]">
            ✓ Anycast Rate Limiting
          </span>
        </div>
      </div>

      {/* Threat Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono">
        <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-1">
          <span className="text-xs text-[#8b949e] uppercase">Total Threat Events</span>
          <div className="text-2xl font-black text-white">{totalThreats}</div>
          <p className="text-[11px] text-[#8b949e]">Ingested by Edge logger</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-1">
          <span className="text-xs text-[#8b949e] uppercase">High / Critical</span>
          <div className="text-2xl font-black text-rose-400">{criticalCount}</div>
          <p className="text-[11px] text-rose-400/80">Requires review or blocking</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-1">
          <span className="text-xs text-[#8b949e] uppercase">Active Alerts</span>
          <div className="text-2xl font-black text-amber-400">{activeCount}</div>
          <p className="text-[11px] text-[#8b949e]">Pending resolution</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-1">
          <span className="text-xs text-[#8b949e] uppercase">Resolved Events</span>
          <div className="text-2xl font-black text-emerald-400">{resolvedCount}</div>
          <p className="text-[11px] text-[#8b949e]">Mitigated or acknowledged</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] flex flex-col md:flex-row gap-3 items-center justify-between text-xs font-mono">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 text-[#8b949e] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search IP, endpoint, or type..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#161b22] border border-[#30363d] text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-rose-500 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
          {/* Severity filter */}
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#161b22] border border-[#30363d] text-[#e6edf3] focus:outline-none focus:border-rose-500"
          >
            <option value="ALL">Severity: All</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>

          {/* Type filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#161b22] border border-[#30363d] text-[#e6edf3] focus:outline-none focus:border-rose-500"
          >
            <option value="ALL">Event Type: All</option>
            <option value="WAF_EVENT">WAF Event</option>
            <option value="ENDPOINT_SCANNING">Endpoint Scanning</option>
            <option value="FAILED_LOGIN">Failed Login</option>
            <option value="SUSPICIOUS_REQUEST">Suspicious Request</option>
            <option value="UNAUTHORIZED_ACCESS">Unauthorized Access</option>
          </select>
        </div>
      </div>

      {/* Security Events Table */}
      <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-4">
        <div className="flex items-center justify-between border-b border-[#21262d] pb-3">
          <h2 className="text-sm font-bold text-white font-sans">
            Security Event Feed ({filteredEvents.length})
          </h2>
          <span className="text-xs font-mono text-[#8b949e]">
            Real-Time Stream
          </span>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="p-8 text-center text-xs font-mono text-[#8b949e]">
            No security events matching current filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#21262d] text-[#8b949e] text-[11px]">
                  <th className="pb-3 px-3">TIMESTAMP</th>
                  <th className="pb-3 px-3">SEVERITY</th>
                  <th className="pb-3 px-3">EVENT TYPE</th>
                  <th className="pb-3 px-3">IP ORIGIN</th>
                  <th className="pb-3 px-3">TARGET ENDPOINT</th>
                  <th className="pb-3 px-3">RISK</th>
                  <th className="pb-3 px-3">STATUS</th>
                  <th className="pb-3 px-3 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#21262d]">
                {filteredEvents.map((evt) => (
                  <tr key={evt.id} className="hover:bg-[#161b22]/60 transition-colors">
                    <td className="py-3 px-3 text-[#8b949e]">
                      {new Date(evt.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          evt.severity === 'CRITICAL'
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : evt.severity === 'HIGH'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}
                      >
                        {evt.severity}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-white">
                      {evt.event_type}
                    </td>
                    <td className="py-3 px-3 text-[#c9d1d9]">
                      <code>{evt.ip_address}</code> <span className="text-[#8b949e]">({evt.ip_country})</span>
                    </td>
                    <td className="py-3 px-3 text-rose-300">
                      <code>{evt.http_method} {evt.endpoint}</code>
                    </td>
                    <td className="py-3 px-3 font-bold">
                      <span className={evt.risk_score > 70 ? 'text-rose-400' : 'text-amber-400'}>
                        {evt.risk_score}/100
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      {evt.resolved ? (
                        <span className="text-emerald-400 text-[10px]">Resolved</span>
                      ) : (
                        <span className="text-amber-400 text-[10px]">Active</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => setSelectedEvent(evt)}
                        className="px-2 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-white text-[11px] cursor-pointer"
                      >
                        Details
                      </button>
                      {!evt.resolved && (
                        <button
                          type="button"
                          onClick={() => handleResolve(evt.id)}
                          className="px-2 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[11px] cursor-pointer"
                        >
                          Resolve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal: Event Metadata Inspector */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-[#0d1117] border border-[#30363d] rounded-2xl p-6 shadow-2xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#21262d] pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span className="font-bold text-white text-sm font-sans">
                  Event Inspector: {selectedEvent.id}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="text-[#8b949e] hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div><span className="text-[#8b949e]">Event Type:</span> <span className="text-white font-bold">{selectedEvent.event_type}</span></div>
                <div><span className="text-[#8b949e]">Severity:</span> <span className="text-rose-400 font-bold">{selectedEvent.severity}</span></div>
                <div><span className="text-[#8b949e]">IP Origin:</span> <span className="text-white">{selectedEvent.ip_address} ({selectedEvent.ip_country})</span></div>
                <div><span className="text-[#8b949e]">Risk Score:</span> <span className="text-amber-400">{selectedEvent.risk_score}/100</span></div>
                <div><span className="text-[#8b949e]">Request ID:</span> <span className="text-[#c9d1d9]">{selectedEvent.request_id}</span></div>
                <div><span className="text-[#8b949e]">Status:</span> <span className={selectedEvent.resolved ? 'text-emerald-400' : 'text-amber-400'}>{selectedEvent.resolved ? 'Resolved' : 'Active Alert'}</span></div>
              </div>

              <div className="pt-2">
                <span className="text-[#8b949e] block mb-1 text-[11px]">Sanitized Request Metadata:</span>
                <pre className="p-3 rounded-xl bg-[#161b22] border border-[#30363d] text-emerald-400 overflow-x-auto text-[11px]">
                  {JSON.stringify(selectedEvent.metadata || {}, null, 2)}
                </pre>
              </div>

              <div className="pt-1 text-[11px]">
                <span className="text-[#8b949e]">User Agent:</span>
                <p className="text-[#c9d1d9] truncate">{selectedEvent.user_agent}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#21262d] flex justify-between items-center">
              {!selectedEvent.resolved ? (
                <button
                  type="button"
                  onClick={() => handleResolve(selectedEvent.id)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer font-sans"
                >
                  Mark as Resolved
                </button>
              ) : (
                <span className="text-emerald-400">✓ Resolved</span>
              )}

              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="px-3 py-1.5 rounded-xl bg-[#21262d] hover:bg-[#30363d] text-white text-xs cursor-pointer font-sans"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
