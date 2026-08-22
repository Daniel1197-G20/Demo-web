import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import PageContainer from '../../components/common/PageContainer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { BRAND } from '../../lib/constants';
import { createWhatsAppUrl } from '../../lib/formatters';

export default function CateringConfirmation() {
  const { bookingNumber = 'TT-BK-202608-2041' } = useParams();

  const whatsappUrl = createWhatsAppUrl(
    BRAND.whatsappNumber,
    `Hello Tory's Treats! I just submitted catering request ${bookingNumber}. I would like to discuss our event menu and dessert table styling.`
  );

  return (
    <PageContainer size="sm">
      <div className="text-center space-y-6 py-6">
        <div className="w-20 h-20 rounded-full bg-tory-100 text-tory-600 mx-auto flex items-center justify-center shadow-tory-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="px-3.5 py-1 rounded-full bg-tory-50 border border-tory-200 text-tory-700 text-xs font-bold uppercase tracking-wider">
            Inquiry Logged
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 font-display mt-3">
            Your Event Request is Received!
          </h1>
          <p className="text-sm text-charcoal-700 max-w-md mx-auto mt-2">
            Our event catering team is reviewing your requirements and preparing a customized menu & pricing proposal.
          </p>
        </div>

        <Card className="p-6 text-left space-y-3 bg-cream-surface/60 max-w-md mx-auto">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-charcoal-500">Booking Reference</span>
            <span className="font-bold text-charcoal-900">{bookingNumber}</span>
          </div>
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-charcoal-500">Proposal Response</span>
            <span className="font-bold text-tory-600">Within 24 Hours</span>
          </div>
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-charcoal-500">Direct Consultation</span>
            <span className="font-bold text-charcoal-900">WhatsApp / Phone</span>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button variant="secondary" icon={MessageCircle} className="w-full sm:w-auto">
              Discuss on WhatsApp
            </Button>
          </a>

          <Link to="/" className="w-full sm:w-auto">
            <Button variant="primary" icon={ArrowRight} iconPosition="right" className="w-full sm:w-auto">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
