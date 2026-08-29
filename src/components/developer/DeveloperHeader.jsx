import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Activity,
  Menu,
  Sparkles,
  ExternalLink,
  Terminal,
  Server,
  RefreshCw,
  Cpu,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useDeveloperTelemetry } from '../../hooks/useDeveloperTelemetry';
import Tooltip from '../ui/Tooltip';

export default function DeveloperHeader({ onOpenSidebar }) {
  const { user, profile, toggleRole, setExplicitRole } = useAuth();
  const { summary } = useDeveloperTelemetry();

  return (
    <header className="h-16 border-b border-[#30363d] bg-[#0d1117]/95 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between font-sans">
      {/* Left: Mobile Toggle & Context */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-lg text-[#8b949e] hover:text-white hover:bg-[#21262d] transition-colors"
          aria-label="Open navigation sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white tracking-tight">
                DevOps Console
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                EDGE WAF LIVE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Telemetry Chips, Switchers, Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Vercel Status Badge */}
        <Tooltip content="Vercel Edge Network: Global Anycast Routing Active" position="bottom">
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#161b22] border border-[#30363d] text-[#8b949e] text-xs font-mono">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-white text-[11px]">Vercel Edge</span>
            <span className="text-emerald-400 text-[10px]">• 100%</span>
          </div>
        </Tooltip>

        {/* Database Health Pill */}
        <Tooltip content="Supabase PostgreSQL 15+ & RLS Zero-Trust Engine" position="bottom">
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#161b22] border border-[#30363d] text-[#8b949e] text-xs font-mono">
            <Server className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-white text-[11px]">DB: Supabase</span>
          </div>
        </Tooltip>

        {/* Quick Role Switcher for local verification */}
        <Tooltip content="Simulate Role Transition for Testing Access Control" position="bottom">
          <button
            type="button"
            onClick={toggleRole}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] text-xs font-mono text-[#c9d1d9] hover:text-white transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline text-[11px] text-[#8b949e]">Role:</span>
            <span className="text-[11px] font-bold text-rose-400">{profile?.role || 'DEVELOPER'}</span>
          </button>
        </Tooltip>

        {/* Links to Bakery & Admin */}
        <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-[#30363d]">
          <Link
            to="/admin/dashboard"
            className="p-1.5 text-xs text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded-lg transition-colors"
            title="Open Admin Backoffice"
          >
            Admin
          </Link>
          <Link
            to="/"
            className="p-1.5 text-xs text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded-lg transition-colors flex items-center gap-1"
            title="Open Bakery Storefront"
          >
            <span>Store</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </header>
  );
}
