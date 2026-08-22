import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Sparkles } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

export default function Register() {
  const { signUp } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await signUp(email, password, fullName);
    setIsLoading(false);

    if (res.success) {
      toast.success('Welcome to Tory’s Treats! Your account is active.', 'Account Created');
      navigate('/shop');
    } else {
      toast.error(res.error || 'Failed to create account.');
    }
  };

  return (
    <Card className="p-8 shadow-tory-md border-cream-border">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-charcoal-900">
          Create an Account
        </h2>
        <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
          Join Tory's Treats for fast checkout and booking history.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          required
          placeholder="Adaobi Okafor"
          leadingIcon={User}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <Input
          label="Email Address"
          type="email"
          required
          placeholder="adaobi@example.com"
          leadingIcon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Create Password"
          type="password"
          required
          placeholder="At least 8 characters"
          leadingIcon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          icon={Sparkles}
          className="w-full justify-center mt-2"
        >
          Create Customer Account
        </Button>
      </form>

      <div className="text-center mt-6 text-xs text-charcoal-700">
        Already have an account?{' '}
        <Link to="/auth/login" className="font-bold text-tory-600 hover:underline">
          Sign In &rarr;
        </Link>
      </div>
    </Card>
  );
}
