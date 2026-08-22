import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react';
import PageContainer from '../../components/common/PageContainer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { BRAND } from '../../lib/constants';
import { createWhatsAppUrl } from '../../lib/formatters';

export default function OrderConfirmation() {
  const { orderNumber = 'TT-ORD-202608-1088' } = useParams();
  const whatsappUrl = createWhatsAppUrl(
    BRAND.whatsappNumber,
    `Hello Tory's Treats! I just submitted order request ${orderNumber}. I would like to confirm my order schedule.`
  );

  return (
    <PageContainer size="sm">
      <div className="text-center space-y-6 py-6">
        <div className="w-20 h-20 rounded-full bg-tory-100 text-tory-600 mx-auto flex items-center justify-center shadow-tory-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="px-3.5 py-1 rounded-full bg-tory-50 border border-tory-200 text-tory-700 text-xs font-bold uppercase tracking-wider">
            Order Request Received
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 font-display mt-3">
            Thank you for choosing Tory's Treats!
          </h1>
          <p className="text-sm text-charcoal-700 max-w-md mx-auto mt-2">
            Your order request has been received. Our kitchen team will review ingredient availability and contact you shortly to confirm arrangements.
          </p>
        </div>

        <Card className="p-6 text-left space-y-3 bg-cream-surface/60 max-w-md mx-auto">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-charcoal-500">Order Reference</span>
            <span className="font-bold text-charcoal-900">{orderNumber}</span>
          </div>
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-charcoal-500">Next Step</span>
            <span className="font-bold text-tory-600">Bakery Verification & Direct Contact</span>
          </div>
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-charcoal-500">Fulfillment</span>
            <span className="font-bold text-charcoal-900">Doorstep Delivery / Pickup</span>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button variant="secondary" icon={MessageCircle} className="w-full sm:w-auto">
              Confirm on WhatsApp
            </Button>
          </a>

          <Link to="/account/orders" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">
              View My Orders
            </Button>
          </Link>

          <Link to="/shop" className="w-full sm:w-auto">
            <Button variant="primary" icon={ShoppingBag} className="w-full sm:w-auto">
              Continue Browsing
            </Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
