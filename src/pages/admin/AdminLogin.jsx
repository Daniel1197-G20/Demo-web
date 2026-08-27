import React, { useState } from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import {
  Heart,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  LogIn,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import Button from '../../components/ui/Button';

export default function AdminLogin() {
  const { user, isAdmin, isLoading: isAuthLoading, signIn } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('admin@torystreats.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Target destination after successful login
  const from = location.state?.from?.pathname || '/admin/dashboard';

  // If already authenticated as admin, redirect directly to admin dashboard
  if (!isAuthLoading && user && isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const res = await signIn(email, password);
    setIsSubmitting(false);

    if (res.success && (res.profile?.role === 'ADMIN' || res.profile?.role === 'SUPER_ADMIN')) {
      toast.success(`Welcome to Admin Portal, ${res.profile.full_name}!`, 'Signed In');
      navigate(from, { replace: true });
    } else if (res.success) {
      setErrorMessage('Access denied. This account does not have administrator privileges.');
      toast.error('Access denied. Administrator privileges required.');
    } else {
      setErrorMessage(res.error || 'Failed to sign in. Please verify your credentials.');
      toast.error(res.error || 'Failed to sign in.');
    }
  };

  const handleQuickDemoLogin = async () => {
    setErrorMessage('');
    setIsSubmitting(true);
    const res = await signIn('admin@torystreats.com', 'admin123');
    setIsSubmitting(false);

    if (res.success) {
      toast.success('Signed in with Admin Demo credentials!', 'Admin Access Granted');
      navigate(from, { replace: true });
    } else {
      toast.error('Failed to log in with demo credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-[#FFF5F8] to-[#FCE4EC] flex flex-col items-center justify-center p-4 sm:p-6 text-[#2B2024]">
      {/* Brand Login Card */}
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#F7DCE5] shadow-[0_16px_48px_rgba(232,44,124,0.08)] p-6 sm:p-8 space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#E82C7C] flex items-center justify-center text-white shadow-[0_6px_20px_rgba(232,44,124,0.28)] mx-auto">
            <Heart className="w-6 h-6 fill-current" />
          </div>

          <div className="space-y-1">
            <h1 className="font-display font-black text-2xl sm:text-3xl text-[#2B2024] tracking-tight">
              Tory's <span className="text-[#E82C7C]">Treats</span>
            </h1>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFF5F8] border border-[#FCE4EC] text-[#E82C7C] text-[11px] font-black uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </div>
          </div>

          <div className="pt-2">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#2B2024] font-display">
              Welcome back 👋
            </h2>
            <p className="text-xs sm:text-sm text-[#7A6B70] mt-0.5">
              Sign in to manage your store.
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {errorMessage}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#2B2024]">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7A6B70]">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@torystreats.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#F7DCE5] bg-white text-xs sm:text-sm text-[#2B2024] placeholder-[#7A6B70]/60 focus:outline-none focus:ring-2 focus:ring-[#FCE4EC] focus:border-[#E82C7C] transition-all"
              />
            </div>
          </div>

          {/* Password Input with Eye Toggle */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#2B2024]">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7A6B70]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-11 py-2.5 rounded-2xl border border-[#F7DCE5] bg-white text-xs sm:text-sm text-[#2B2024] placeholder-[#7A6B70]/60 focus:outline-none focus:ring-2 focus:ring-[#FCE4EC] focus:border-[#E82C7C] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#7A6B70] hover:text-[#2B2024] focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-xs pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer text-[#7A6B70] hover:text-[#2B2024]">
              <input
                type="checkbox"
                defaultChecked
                className="rounded-md border-[#F7DCE5] text-[#E82C7C] focus:ring-[#FCE4EC]"
              />
              <span>Remember me</span>
            </label>
            <span
              onClick={() => toast.info('Contact system administrator or use the demo login button.')}
              className="font-bold text-[#E82C7C] hover:underline cursor-pointer"
            >
              Forgot password?
            </span>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            icon={LogIn}
            className="w-full justify-center h-11 text-sm font-bold shadow-[0_4px_16px_rgba(232,44,124,0.25)] mt-2"
          >
            Sign In
          </Button>
        </form>

        {/* Development Demo Quick Sign-In */}
        <div className="pt-4 border-t border-[#F7DCE5] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#7A6B70]">
              Development Prototype
            </span>
            <span className="text-[10px] text-[#E82C7C] font-bold bg-[#FFF5F8] px-2 py-0.5 rounded-full border border-[#FCE4EC]">
              Demo Auth
            </span>
          </div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleQuickDemoLogin}
            icon={Sparkles}
            className="w-full justify-center text-xs h-9 bg-[#FFF5F8] hover:bg-[#FCE4EC] text-[#E82C7C] border border-[#FCE4EC]"
          >
            Quick 1-Click Admin Sign-In (Victoria)
          </Button>
        </div>
      </div>

      {/* Footer Back Link */}
      <div className="mt-6 text-center text-xs text-[#7A6B70] flex items-center gap-1.5 hover:text-[#E82C7C] transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        <Link to="/" className="font-semibold">
          Return to live bakery store
        </Link>
      </div>
    </div>
  );
}
