import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Briefcase } from 'lucide-react';
import PageContainer from '../../components/common/PageContainer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

export default function ApplicationConfirmation() {
  return (
    <PageContainer size="sm">
      <div className="text-center space-y-6 py-8">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-brand-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            Application Received
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 font-display mt-3">
            Thank you for applying!
          </h1>
          <p className="text-sm text-charcoal-700 max-w-md mx-auto mt-2">
            Your application and CV have been securely logged in our candidate database. Our kitchen leadership reviews all submissions.
          </p>
        </div>

        <Card className="p-5 sm:p-6 text-left space-y-3 bg-cream-surface/60 max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-xs sm:text-sm border-b sm:border-b-0 border-cream-border/60 pb-2 sm:pb-0">
            <span className="text-charcoal-500">Review Status</span>
            <span className="font-bold text-warning-500">Under Review</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-xs sm:text-sm">
            <span className="text-charcoal-500">Contact Method</span>
            <span className="font-bold text-charcoal-900">Email & Phone</span>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-4 max-w-md mx-auto">
          <Link to="/account/applications" className="w-full sm:w-auto flex-1">
            <Button variant="secondary" icon={Briefcase} className="w-full justify-center">
              View My Applications
            </Button>
          </Link>

          <Link to="/" className="w-full sm:w-auto">
            <Button variant="primary" icon={ArrowRight} iconPosition="right" className="w-full justify-center">
              Return to Bakery
            </Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
