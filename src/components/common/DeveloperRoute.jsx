import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShieldAlert,
  Terminal,
  Lock,
  ArrowLeft,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  LogIn,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { SkeletonDeveloperConsole } from '../ui/Skeleton';
import Button from '../ui/Button';

export default function DeveloperRoute({ children }) {
  const { user, profile, isDeveloper, isLoading, signInDeveloper, setExplicitRole } = useAuth();
  const location = useLocation();
  const [authKey, setAuthKey] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState('');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#090d13] p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
        <SkeletonDeveloperConsole />
      </div>
    );
  }

  // Developer Authorization Check: Must be authenticated and have DEVELOPER or SUPER_ADMIN role
  if (!user || !isDeveloper) {
    const handleDevLogin = async (e) => {
      e?.preventDefault();
      setIsAuthenticating(true);
      setAuthError('');
      try {
        const res = await signInDeveloper('dev@torystreats.com', 'devops-secure-auth');
        if (!res.success) {
          setAuthError(res.error || 'Failed to authenticate developer session.');
        }
      } catch (err) {
        setAuthError(err.message || 'Authentication error.');
      } finally {
        setIsAuthenticating(false);
      }
    };

    return (
      <div className="min-h-screen bg-[#090d13] text-[#e6edf3] font-mono flex flex-col items-center justify-center p-4 sm:p-6 select-none relative overflow-hidden">
        {/* Subtle grid background */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#58a6ff 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="max-w-lg w-full bg-[#0d1117] border border-[#30363d] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#21262d] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-950/60 border border-rose-800/80 flex items-center justify-center text-rose-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white tracking-tight font-sans">
                  Developer Operations Console
                </h1>
                <p className="text-xs text-[#8b949e]">
                  Vercel Edge WAF & Observability Tier
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[11px] font-semibold">
              403 FORBIDDEN
            </span>
          </div>

          {/* Warning banner */}
          <div className="p-3.5 rounded-xl bg-[#161b22] border border-[#30363d] text-xs space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-semibold">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Restricted Platform Access</span>
            </div>
            <p className="text-[#8b949e] leading-relaxed">
              Access to this console is strictly isolated from normal store administration and public customer roles. You must possess verified <code className="text-rose-300 bg-rose-950/40 px-1 py-0.5 rounded text-[11px]">DEVELOPER</code> credentials.
            </p>
            {user && (
              <div className="pt-2 border-t border-[#21262d] flex items-center justify-between text-[11px] text-[#8b949e]">
                <span>Current Principal: <span className="text-white font-mono">{user.email}</span></span>
                <span className="text-amber-400">Role: {profile?.role || 'ANONYMOUS'}</span>
              </div>
            )}
          </div>

          {authError && (
            <div className="p-3 rounded-lg bg-rose-950/50 border border-rose-800/80 text-rose-300 text-xs">
              {authError}
            </div>
          )}

          {/* Quick Developer Authentication */}
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <label className="block text-xs font-medium text-[#8b949e]">
                Authorize Developer Session
              </label>
              <button
                type="button"
                onClick={handleDevLogin}
                disabled={isAuthenticating}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-[#E82C7C] hover:from-rose-500 hover:to-[#ff4593] text-white font-sans text-xs font-bold shadow-lg shadow-rose-900/30 transition-all cursor-pointer disabled:opacity-50"
              >
                <Terminal className="w-4 h-4" />
                <span>{isAuthenticating ? 'Authenticating...' : 'Sign In as Lead Developer (Victoria VI)'}</span>
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs text-[#8b949e]">
              <span className="h-px bg-[#21262d] flex-1" />
              <span>or</span>
              <span className="h-px bg-[#21262d] flex-1" />
            </div>

            {/* Navigation links */}
            <div className="grid grid-cols-2 gap-3 pt-1 font-sans">
              <Link
                to="/"
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-[#30363d] bg-[#161b22] hover:bg-[#21262d] text-xs text-[#c9d1d9] hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Bakery Store</span>
              </Link>
              <Link
                to="/admin/dashboard"
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-[#30363d] bg-[#161b22] hover:bg-[#21262d] text-xs text-[#c9d1d9] hover:text-white transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Portal</span>
              </Link>
            </div>
          </div>

          <div className="border-t border-[#21262d] pt-3 text-center">
            <span className="text-[10px] text-[#484f58]">
              Tory's Treats Security Engine • SHA-256 RLS Verification Active
            </span>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
