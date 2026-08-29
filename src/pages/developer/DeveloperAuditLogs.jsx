import React, { useState } from 'react';
import {
  ScrollText,
  Search,
  Download,
  CheckCircle2,
  Filter,
  User,
  Shield,
  Clock,
} from 'lucide-react';
import { useDeveloperTelemetry } from '../../hooks/useDeveloperTelemetry';
import { useToast } from '../../hooks/useToast';

export default function DeveloperAuditLogs() {
  const { auditLogs } = useDeveloperTelemetry();
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('ALL');

  const filteredLogs = auditLogs.filter((log) => {
    if (selectedRole !== 'ALL' && log.actor_role !== selectedRole) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchActor = log.actor_email.toLowerCase().includes(q);
      const matchAction = log.action.toLowerCase().includes(q);
      const matchResource = log.resource_type.toLowerCase().includes(q);
      if (!matchActor && !matchAction && !matchResource) return false;
    }
    return true;
  });

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `torys_audit_trail_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success('Audit trail exported successfully to JSON.', 'Exported');
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#30363d] pb-6 font-sans">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Administrative & Developer Audit Trail
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-medium">
              Zero-Trust Provenance
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#8b949e] mt-1">
            Immutable log of all administrative actions, developer security interventions, and settings mutations.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExport}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] text-[#c9d1d9] hover:text-white text-xs font-mono font-bold transition-all shadow-md cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export JSON Audit Log</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-[#8b949e] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search actor, action, or resource..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#161b22] border border-[#30363d] text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-rose-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#161b22] border border-[#30363d] text-[#e6edf3] focus:outline-none focus:border-rose-500"
          >
            <option value="ALL">Role: All</option>
            <option value="DEVELOPER">Developer Only</option>
            <option value="ADMIN">Admin Only</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-4">
        <div className="flex items-center justify-between border-b border-[#21262d] pb-3">
          <h2 className="text-sm font-bold text-white font-sans">
            Audit Activity Log ({filteredLogs.length})
          </h2>
          <span className="text-[#8b949e] text-[11px]">
            Indexed by Timestamp
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#21262d] text-[#8b949e] text-[11px]">
                <th className="pb-3 px-3">TIMESTAMP</th>
                <th className="pb-3 px-3">ACTOR & ROLE</th>
                <th className="pb-3 px-3">ACTION EVENT</th>
                <th className="pb-3 px-3">TARGET RESOURCE</th>
                <th className="pb-3 px-3">ORIGIN IP</th>
                <th className="pb-3 px-3">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#21262d]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#161b22]/60 transition-colors">
                  <td className="py-3 px-3 text-[#8b949e]">
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-bold text-white">{log.actor_email}</div>
                    <span
                      className={`px-1.5 py-0.2 rounded text-[10px] ${
                        log.actor_role === 'DEVELOPER' ? 'text-rose-400 bg-rose-950/40' : 'text-blue-400 bg-blue-950/40'
                      }`}
                    >
                      {log.actor_role}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-emerald-400">
                    <code>{log.action}</code>
                  </td>
                  <td className="py-3 px-3 text-[#c9d1d9]">
                    <span className="text-[#8b949e]">{log.resource_type}:</span> {log.resource_id}
                  </td>
                  <td className="py-3 px-3 text-[#8b949e]">
                    <code>{log.ip_address}</code>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-emerald-400 font-bold">✓ {log.status}</span>
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
