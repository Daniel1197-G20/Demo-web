import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import { useToast } from '../../hooks/useToast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
    toast.success('Password reset link sent to your email.');
  };

  return (
    <Card className="p-8 shadow-tory-md border-cream-border">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-charcoal-900">
          Reset Password
        </h2>
        <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
          Enter your registered email and we'll send you recovery instructions.
        </p>
      </div>

      {isSent ? (
        <div className="text-center space-y-4">
          <p className="text-sm text-charcoal-700">
            A reset link has been dispatched to <strong>{email}</strong>. Please check your inbox and spam folder.
          </p>
          <Link to="/auth/login">
            <Button variant="primary" className="w-full justify-center">
              Return to Sign In
            </Button>
          </Link>
        </div>
      ) : (
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

          <Button type="submit" variant="primary" size="lg" icon={Send} className="w-full justify-center">
            Send Reset Instructions
          </Button>

          <div className="text-center pt-2">
            <Link to="/auth/login" className="text-xs font-semibold text-charcoal-700 hover:text-tory-600 inline-flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </form>
      )}
    </Card>
  );
}
