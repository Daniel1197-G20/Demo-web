import React, { useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Activity,
  Globe,
  ShieldAlert,
  Fingerprint,
  AlertOctagon,
  Network,
  Database,
  GitBranch,
  ScrollText,
  HeartPulse,
  LogOut,
  ArrowLeft,
  X,
  Terminal,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useDeveloperTelemetry } from '../../hooks/useDeveloperTelemetry';

export default function DeveloperSidebar({ isOpen, onClose }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { summary } = useDeveloperTelemetry();

  // Navigation structure organized by operational domain
  const NAV_SECTIONS = [
    {
      title: 'OBSERVABILITY',
      items: [
        { name: 'Overview', href: '/developer', icon: LayoutDashboard, end: true },
        { name: 'Performance', href: '/developer/performance', icon: Activity },
        { name: 'Traffic Analytics', href: '/developer/traffic', icon: Globe },
        {
          name: 'Error Traces',
          href: '/developer/errors',
          icon: AlertOctagon,
          badge: summary.unresolvedErrors > 0 ? summary.unresolvedErrors : null,
          badgeVariant: 'error',
        },
        { name: 'API Monitoring', href: '/developer/api', icon: Network },
      ],
    },
    {
      title: 'EDGE & SECURITY',
      items: [
        {
          name: 'Security Center',
          href: '/developer/security',
          icon: ShieldAlert,
          badge: summary.activeThreats > 0 ? summary.activeThreats : null,
          badgeVariant: 'warning',
        },
        {
          name: 'IP Anomalies',
          href: '/developer/ip-anomaly',
          icon: Fingerprint,
          badge: summary.blockedIps > 0 ? `${summary.blockedIps} Blocked` : null,
          badgeVariant: 'critical',
        },
      ],
    },
    {
      title: 'INFRASTRUCTURE',
      items: [
        { name: 'Database & RLS', href: '/developer/database', icon: Database },
        { name: 'Deployments', href: '/developer/deployments', icon: GitBranch },
        { name: 'System Health', href: '/developer/system-health', icon: HeartPulse },
        { name: 'Audit Logs', href: '/developer/audit-logs', icon: ScrollText },
      ],
    },
  ];

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSignOut = () => {
    signOut();
    if (onClose) onClose();
    navigate('/');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0d1117] border-r border-[#30363d] flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 shadow-2xl font-sans ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div>
          <div className="h-16 px-4 border-b border-[#30363d] flex items-center justify-between bg-[#161b22]/50">
            <Link
              to="/developer"
              onClick={() => onClose && onClose()}
              className="flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <span className="font-display font-black text-sm text-white block leading-tight">
                  Tory's <span className="text-[#E82C7C]">Treats</span>
                </span>
                <span className="text-[10px] font-mono text-[#8b949e] font-semibold tracking-wider uppercase block">
                  Dev Console
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-1.5 text-[#8b949e] hover:text-white rounded-lg hover:bg-[#21262d] transition-colors"
              aria-label="Close navigation sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-3 space-y-5 overflow-y-auto max-h-[calc(100vh-140px)]">
            {NAV_SECTIONS.map((section) => (
              <div key={section.title} className="space-y-1">
                <div className="px-3 pb-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[#484f58]">
                  {section.title}
                </div>

                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      end={item.end}
                      onClick={() => onClose && onClose()}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-rose-500/10 text-white border border-rose-500/30 font-semibold shadow-xs'
                            : 'text-[#8b949e] hover:text-white hover:bg-[#161b22] border border-transparent'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div className="flex items-center gap-2.5">
                            <Icon
                              className={`w-4 h-4 shrink-0 ${
                                isActive ? 'text-rose-400' : 'text-[#8b949e]'
                              }`}
                            />
                            <span>{item.name}</span>
                          </div>

                          {item.badge && (
                            <span
                              className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono font-semibold ${
                                item.badgeVariant === 'critical'
                                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                  : item.badgeVariant === 'warning'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  : 'bg-rose-500/20 text-rose-300'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-[#30363d] bg-[#161b22]/40 space-y-1.5">
          <Link
            to="/admin/dashboard"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl border border-[#30363d] bg-[#0d1117] text-xs text-[#8b949e] hover:text-white hover:border-[#8b949e] transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#E82C7C]" />
            <span>Admin Backoffice</span>
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center justify-center gap-2 w-full py-1.5 px-3 rounded-xl text-xs text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>End Dev Session</span>
          </button>
        </div>
      </aside>
    </>
  );
}
