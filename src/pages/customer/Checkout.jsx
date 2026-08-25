import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Store, Calendar, Clock, Send, Info, CheckCircle2 } from 'lucide-react';
import PageContainer from '../../components/common/PageContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Textarea from '../../components/ui/Textarea';
import Card from '../../components/ui/Card';
import { formatCurrency } from '../../lib/formatters';
import { useCart } from '../../hooks/useCart';
import { useToast } from '../../hooks/useToast';

export default function Checkout() {
  const { items, subtotal, deliveryFee, total, clearCart } = useCart();
  const toast = useToast();
  const navigate = useNavigate();

  const [fulfillmentType, setFulfillmentType] = useState('DELIVERY'); // 'DELIVERY' or 'PICKUP'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    preferredDate: '',
    preferredTime: 'Afternoon (1:00 PM - 5:00 PM)',
    specialInstructions: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const effectiveDeliveryFee = fulfillmentType === 'DELIVERY' ? deliveryFee : 0;
  const effectiveTotal = subtotal + effectiveDeliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      const mockOrderNumber = 'TT-ORD-202608-1088';
      toast.success('Order request submitted successfully!', 'Order Request Received');
      navigate(`/checkout/confirmation/${mockOrderNumber}`);
    }, 1200);
  };

  return (
    <PageContainer size="sm">
      <SectionHeading
        tag="Order Request"
        title="Fulfillment & Contact Details"
        subtitle="Submit your treat request. Our team will verify kitchen availability and contact you directly to confirm arrangements."
      />

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        {/* 1. Fulfillment Method */}
        <Card className="p-5 sm:p-7 space-y-4">
          <h3 className="text-base font-bold font-display text-charcoal-900 border-b border-cream-border pb-2.5">
            1. Fulfillment Method
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            <button
              type="button"
              onClick={() => setFulfillmentType('DELIVERY')}
              className={`p-4 rounded-xl border-2 text-left flex items-start gap-3 transition-all min-h-[72px] focus-ring ${
                fulfillmentType === 'DELIVERY'
                  ? 'border-brand-700 bg-brand-50/60 shadow-sm'
                  : 'border-cream-border hover:border-charcoal-300 bg-white'
              }`}
            >
              <div className={`p-2.5 rounded-lg shrink-0 ${fulfillmentType === 'DELIVERY' ? 'bg-brand-700 text-white' : 'bg-cream-surface text-charcoal-700'}`}>
                <Truck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="font-bold text-sm text-charcoal-900 block">Lagos Doorstep Delivery</span>
                <span className="text-xs text-charcoal-500 block mt-0.5">Chilled courier to your door (+₦2,000)</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFulfillmentType('PICKUP')}
              className={`p-4 rounded-xl border-2 text-left flex items-start gap-3 transition-all min-h-[72px] focus-ring ${
                fulfillmentType === 'PICKUP'
                  ? 'border-brand-700 bg-brand-50/60 shadow-sm'
                  : 'border-cream-border hover:border-charcoal-300 bg-white'
              }`}
            >
              <div className={`p-2.5 rounded-lg shrink-0 ${fulfillmentType === 'PICKUP' ? 'bg-brand-700 text-white' : 'bg-cream-surface text-charcoal-700'}`}>
                <Store className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="font-bold text-sm text-charcoal-900 block">Kitchen Pickup (Free)</span>
                <span className="text-xs text-charcoal-500 block mt-0.5">Victoria Island Bakery Kitchen</span>
              </div>
            </button>
          </div>
        </Card>

        {/* 2. Preferred Schedule */}
        <Card className="p-5 sm:p-7 space-y-4">
          <h3 className="text-base font-bold font-display text-charcoal-900 border-b border-cream-border pb-2.5">
            2. Preferred Schedule
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            <Input
              label="Preferred Date"
              type="date"
              required
              value={formData.preferredDate}
              onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
            />

            <Select
              label="Preferred Time Window"
              value={formData.preferredTime}
              onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
              options={[
                { value: 'Morning (9:00 AM - 12:00 PM)', label: 'Morning (9:00 AM - 12:00 PM)' },
                { value: 'Afternoon (1:00 PM - 5:00 PM)', label: 'Afternoon (1:00 PM - 5:00 PM)' },
                { value: 'Evening (5:00 PM - 7:00 PM)', label: 'Evening (5:00 PM - 7:00 PM)' },
              ]}
            />
          </div>
        </Card>

        {/* 3. Recipient Information */}
        <Card className="p-5 sm:p-7 space-y-4">
          <h3 className="text-base font-bold font-display text-charcoal-900 border-b border-cream-border pb-2.5">
            3. Recipient Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            <Input
              label="Full Name"
              required
              placeholder="e.g. Chioma Balogun"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />

            <Input
              label="Phone Number / WhatsApp"
              type="tel"
              required
              placeholder="e.g. 08012345678"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />

            <div className="sm:col-span-2">
              <Input
                label="Email Address"
                type="email"
                required
                placeholder="chioma@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {fulfillmentType === 'DELIVERY' && (
              <div className="sm:col-span-2">
                <Input
                  label="Delivery Address (Lagos)"
                  required
                  placeholder="e.g. 14 Admiralty Way, Lekki Phase 1, Lagos"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
            )}
          </div>
        </Card>

        {/* 4. Special Instructions */}
        <Card className="p-5 sm:p-7 space-y-4">
          <h3 className="text-base font-bold font-display text-charcoal-900 border-b border-cream-border pb-2.5">
            4. Special Instructions
          </h3>

          <Textarea
            label="Cake Inscriptions & Fulfillment Notes"
            placeholder="e.g. Inscription on cake: 'Happy 30th Birthday Funke!', call gate upon arrival..."
            rows={3}
            value={formData.specialInstructions}
            onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
          />
        </Card>

        {/* 5. Order Summary & Offline Submission Notice */}
        <Card className="p-5 sm:p-7 space-y-4 bg-cream-surface/60">
          <div className="space-y-2 text-xs sm:text-sm text-charcoal-700">
            <div className="flex justify-between">
              <span>Treats Subtotal</span>
              <span className="font-semibold text-charcoal-900">{formatCurrency(subtotal || 28000)}</span>
            </div>
            <div className="flex justify-between">
              <span>{fulfillmentType === 'DELIVERY' ? 'Estimated Delivery Fee' : 'Kitchen Pickup'}</span>
              <span className="font-semibold text-charcoal-900">
                {fulfillmentType === 'DELIVERY' ? formatCurrency(effectiveDeliveryFee) : 'Free'}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm sm:text-base font-extrabold text-charcoal-900 pt-2 border-t border-cream-border">
              <span>Estimated Total</span>
              <span className="text-lg sm:text-xl text-brand-700 font-display">{formatCurrency(effectiveTotal || 30000)}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-xs text-charcoal-700 bg-white p-3.5 rounded-xl border border-cream-border">
            <Info className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
            <span>
              <strong>Direct Order Verification:</strong> No online payment is processed at this stage. Our team will review treat availability, contact you via WhatsApp or phone to confirm your schedule, and provide settlement arrangements.
            </span>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isProcessing}
            icon={Send}
            className="w-full justify-center text-sm sm:text-base font-semibold min-h-[48px]"
          >
            Submit Order Request
          </Button>
        </Card>
      </form>
    </PageContainer>
  );
}
