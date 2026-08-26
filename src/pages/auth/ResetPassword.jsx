import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Check } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import { useToast } from '../../hooks/useToast';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    toast.success('Your password has been successfully updated.');
    navigate('/auth/login');
  };

  return (
    <Card className="p-6 sm:p-8 shadow-brand-md border-cream-border">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-charcoal-900">
          Set New Password
        </h2>
        <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
          Create a secure new password for your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="New Password"
          type="password"
          required
          placeholder="••••••••"
          leadingIcon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input
          label="Confirm New Password"
          type="password"
          required
          placeholder="••••••••"
          leadingIcon={Lock}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button type="submit" variant="primary" size="lg" icon={Check} className="w-full justify-center min-h-[48px]">
          Update Password
        </Button>
      </form>
    </Card>
  );
}
