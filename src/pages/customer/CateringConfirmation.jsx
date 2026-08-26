import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Calendar,
  Clock,
  Heart,
  Phone,
  FileText,
} from 'lucide-react';
import PageContainer from '../../components/common/PageContainer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { BRAND } from '../../lib/constants';
import { createWhatsAppUrl } from '../../lib/formatters';

export default function CateringConfirmation() {
  const { bookingNumber = 'TT-BK-202608-2041' } = useParams();

  const whatsappUrl = createWhatsAppUrl(
    BRAND.whatsappNumber,
    `Hello Tory's Treats! I just submitted event catering request ${bookingNumber}. I would like to discuss our event menu and dessert table styling.`
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50/50 via-cream-surface/70 to-cream-base py-10 sm:py-16">
      <PageContainer size="sm">
        <div className="text-center space-y-6 max-w-xl mx-auto">
          {/* Celebratory Icon with Glow */}
          <div className="relative inline-block">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-brand-700 text-white mx-auto flex items-center justify-center shadow-brand-lg transform hover:scale-105 transition-transform">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.2px]" />
            </div>
            <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gold-400 text-charcoal-900 flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-brand-200 text-brand-800 text-xs font-bold uppercase tracking-wider shadow-xs mb-3">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>Inquiry Received</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 font-display tracking-tight leading-tight">
              Let's make your celebration{' '}
              <span className="font-serif italic font-normal text-brand-700">unforgettable.</span>
            </h1>

            <p className="text-sm sm:text-base text-charcoal-700 max-w-md mx-auto mt-2.5 leading-relaxed">
              Thank you for trusting Tory’s Treats with your celebration. Our event catering team is reviewing your specifications to formulate a bespoke dessert proposal.
            </p>
          </div>

          {/* Booking Reference Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-cream-border shadow-brand-sm text-left space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-cream-border gap-2">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-charcoal-500 block">
                  Booking Reference Number
                </span>
                <span className="font-mono font-bold text-brand-700 text-lg sm:text-xl">
                  {bookingNumber}
                </span>
              </div>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold w-fit">
                <Clock className="w-3.5 h-3.5 text-brand-700" />
                <span>Quote in 24 Hours</span>
              </span>
            </div>

            {/* Next Steps List */}
            <div className="space-y-3 pt-1 text-xs sm:text-sm text-charcoal-700">
              <h4 className="font-bold text-charcoal-900 text-xs uppercase tracking-wider">
                What happens next?
              </h4>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <strong className="text-charcoal-900 font-semibold">Kitchen Review:</strong> Our head pastry chef reviews your date, guest count, and flavor preferences.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <strong className="text-charcoal-900 font-semibold">Custom Proposal:</strong> You will receive a detailed PDF breakdown with flavor options and event setup tiers.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <strong className="text-charcoal-900 font-semibold">Tasting &amp; Confirmation:</strong> Option to schedule a private tasting box before locking your date.
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1"
            >
              <Button
                variant="secondary"
                icon={MessageCircle}
                className="w-full justify-center bg-[#25D366] hover:bg-[#20bd5a] text-white border-transparent shadow-sm font-bold min-h-[48px]"
              >
                Discuss on WhatsApp
              </Button>
            </a>

            <Link to="/" className="w-full sm:w-auto">
              <Button
                variant="primary"
                icon={ArrowRight}
                iconPosition="right"
                className="w-full justify-center bg-brand-700 hover:bg-brand-800 font-bold min-h-[48px]"
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
