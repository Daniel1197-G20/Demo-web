import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn, Sparkles, ShieldCheck, User } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

export default function Login() {
  const { signIn } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await signIn(email, password);
    setIsLoading(false);

    if (res.success) {
      toast.success(`Welcome back, ${res.profile.full_name}!`, 'Signed In');
      if (res.profile.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate(from);
      }
    } else {
      toast.error(res.error || 'Failed to sign in.');
    }
  };

  const handleQuickLogin = async (role) => {
    setIsLoading(true);
    const mockEmail = role === 'ADMIN' ? 'admin@torystreats.com' : 'adaobi@gmail.com';
    const res = await signIn(mockEmail, 'password123');
    setIsLoading(false);

    if (res.success) {
      toast.success(`Signed in as ${res.profile.full_name} (${res.profile.role})`, 'Quick Sign In');
      if (role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate(from === '/auth/login' ? '/' : from);
      }
    }
  };

  return (
    <Card className="p-8 shadow-[0_10px_30px_rgba(232,44,124,0.08)] border-[#F0D9E1] bg-white rounded-3xl">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#2B2024]">
          Sign In to Your Account
        </h2>
        <p className="text-xs sm:text-sm text-[#7A6B70] mt-1">
          Access your treat orders, catering bookings, and job applications.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          required
          placeholder="your.email@example.com"
          leadingIcon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          required
          placeholder="••••••••"
          leadingIcon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-1.5 text-[#2B2024] cursor-pointer">
            <input type="checkbox" className="rounded-md border-[#F0D9E1] text-[#E82C7C] focus:ring-[#FCE4EC]" />
            <span>Remember me</span>
          </label>
          <Link to="/auth/forgot-password" className="font-bold text-[#E82C7C] hover:underline">
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          icon={LogIn}
          className="w-full justify-center mt-2"
        >
          Sign In
        </Button>
      </form>

      {/* Quick Demo Login Preset Buttons for Testing */}
      <div className="mt-6 pt-6 border-t border-[#F0D9E1] space-y-2.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A6B70] block text-center">
          Quick Test Authentication
        </span>
        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            icon={User}
            onClick={() => handleQuickLogin('CUSTOMER')}
          >
            Customer Demo
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            icon={ShieldCheck}
            onClick={() => handleQuickLogin('ADMIN')}
          >
            Admin Portal
          </Button>
        </div>
      </div>

      <div className="text-center mt-6 text-xs text-[#7A6B70]">
        Don't have an account yet?{' '}
        <Link to="/auth/register" className="font-bold text-[#E82C7C] hover:underline">
          Create Account &rarr;
        </Link>
      </div>
    </Card>
  );
}
