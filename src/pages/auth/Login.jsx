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
        navigate('/admin');
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
        navigate('/admin');
      } else {
        navigate(from === '/auth/login' ? '/' : from);
      }
    }
  };

  return (
    <Card className="p-8 shadow-brand-md border-cream-border">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-charcoal-900">
          Sign In to Your Account
        </h2>
        <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
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
          <label className="flex items-center gap-1.5 text-charcoal-700 cursor-pointer">
            <input type="checkbox" className="rounded border-cream-border text-brand-700 focus:ring-brand-500" />
            <span>Remember me</span>
          </label>
          <Link to="/auth/forgot-password" className="font-semibold text-brand-700 hover:underline">
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
      <div className="mt-6 pt-6 border-t border-cream-border space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block text-center">
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

      <div className="text-center mt-6 text-xs text-charcoal-700">
        Don't have an account yet?{' '}
        <Link to="/auth/register" className="font-bold text-brand-700 hover:underline">
          Create Account &rarr;
        </Link>
      </div>
    </Card>
  );
}
