import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, CheckCircle2, Truck, ShoppingBag, Phone, MapPin, MessageCircle } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Select from '../../../components/ui/Select';
import Textarea from '../../../components/ui/Textarea';
import Button from '../../../components/ui/Button';
import { formatCurrency, createWhatsAppUrl } from '../../../lib/formatters';
import { BRAND } from '../../../lib/constants';
import { useToast } from '../../../hooks/useToast';

export default function OrderDetails() {
  const { orderNumber = 'TT-ORD-202608-1088' } = useParams();
  const toast = useToast();
  const [status, setStatus] = useState('PROCESSING');
  const [adminNotes, setAdminNotes] = useState('Client requested golden ribbon packaging. Dispatch scheduled for 2:00 PM.');

  const customerPhone = '08023456789';
  const whatsappUrl = createWhatsAppUrl(
    customerPhone,
    `Hello Adaobi! This is Tory's Treats regarding your order request ${orderNumber}. We are pleased to confirm your treat delivery!`
  );

  const handleUpdate = () => {
    toast.success(`Order workflow updated to ${status}!`);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link
          to="/admin/orders"
          className="p-2 rounded-xl bg-white border border-cream-border text-charcoal-700 hover:text-brand-700"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold font-display text-charcoal-900">
            Order Request {orderNumber}
          </h1>
          <p className="text-xs text-charcoal-500">
            Review request details, contact client, and advance fulfillment stages.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 p-6 space-y-4">
          <h3 className="text-base font-bold font-display text-charcoal-900 border-b border-cream-border pb-2">
            Requested Treats
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-cream-border/60">
              <div>
                <span className="font-bold text-charcoal-900 block">1x Signature Strawberry Cloud Cake</span>
                <span className="text-xs text-charcoal-500">Artisanal Cakes</span>
              </div>
              <span className="font-bold text-charcoal-900">{formatCurrency(18500)}</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-cream-border/60">
              <div>
                <span className="font-bold text-charcoal-900 block">1x Red Velvet Gold Cupcakes (Box of 6)</span>
                <span className="text-xs text-charcoal-500">Gourmet Cupcakes</span>
              </div>
              <span className="font-bold text-charcoal-900">{formatCurrency(9500)}</span>
            </div>
          </div>

          <div className="pt-2 text-xs sm:text-sm space-y-1 text-charcoal-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(28000)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>{formatCurrency(2000)}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-charcoal-900 pt-2 border-t border-cream-border">
              <span>Estimated Total</span>
              <span className="text-brand-700 font-display">{formatCurrency(30000)}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-cream-border">
            <h4 className="font-bold text-xs text-charcoal-900 uppercase tracking-wider mb-2">
              Delivery & Timing Details
            </h4>
            <div className="text-xs text-charcoal-700 bg-cream-surface/50 p-3.5 rounded-xl border border-cream-border space-y-1">
              <p><strong>Fulfillment Method:</strong> Doorstep Courier Delivery (Lagos)</p>
              <p><strong>Delivery Address:</strong> 14 Admiralty Way, Lekki Phase 1, Lagos</p>
              <p><strong>Preferred Timing:</strong> 22 Aug 2026 (Afternoon: 1:00 PM - 5:00 PM)</p>
              <p><strong>Special Instructions:</strong> "Include birthday card for Funke; gate code is 204."</p>
            </div>
          </div>
        </Card>

        {/* Workflow Action Sidebar */}
        <div className="space-y-4">
          <Card className="p-6 space-y-4">
            <h3 className="text-base font-bold font-display text-charcoal-900 border-b border-cream-border pb-2">
              Workflow Status
            </h3>

            <Select
              label="Fulfillment Stage"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              options={[
                { value: 'PENDING', label: '1. Request Received (Pending Review)' },
                { value: 'CONFIRMED', label: '2. Confirmed by Bakery' },
                { value: 'PROCESSING', label: '3. In the Oven (Preparation)' },
                { value: 'READY', label: '4. Ready for Dispatch / Pickup' },
                { value: 'DELIVERED', label: '5. Delivered / Picked Up' },
                { value: 'CANCELLED', label: '6. Cancelled' },
              ]}
            />

            <Textarea
              label="Internal Kitchen Notes"
              rows={2}
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
            />

            <Button variant="primary" className="w-full justify-center" onClick={handleUpdate} icon={Save}>
              Save Status
            </Button>
          </Card>

          <Card className="p-6 space-y-3 text-xs text-charcoal-700">
            <h4 className="font-bold text-charcoal-900 uppercase tracking-wider text-[11px]">
              Customer Contact
            </h4>
            <p className="font-bold text-charcoal-900">Adaobi Okafor</p>
            <p className="text-charcoal-500">Phone: {customerPhone}</p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block pt-1">
              <Button variant="secondary" size="sm" icon={MessageCircle} className="w-full justify-center">
                WhatsApp Customer
              </Button>
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
}
