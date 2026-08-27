import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, ShoppingBag, Phone, MapPin, MessageCircle, Clock, CheckCircle2 } from 'lucide-react';
import { formatCurrency, createWhatsAppUrl } from '../../../lib/formatters';
import { useToast } from '../../../hooks/useToast';
import AdminBadge from '../../../components/admin/AdminBadge';

export default function OrderDetails() {
  const { orderNumber = 'TT-ORD-202608-1088' } = useParams();
  const toast = useToast();
  const [status, setStatus] = useState('PROCESSING');
  const [adminNotes, setAdminNotes] = useState('Client requested golden ribbon packaging. Dispatch scheduled for 2:00 PM.');

  const customerPhone = '08023456789';
  const whatsappUrl = createWhatsAppUrl(
    customerPhone,
    `Hello Adaobi! This is Victoria from Tory's Treats regarding your order request ${orderNumber}. We are pleased to confirm your treat delivery!`
  );

  const handleUpdate = (e) => {
    e.preventDefault();
    toast.success(`Order workflow updated to ${status}!`, 'Order Updated');
  };

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/orders"
            className="p-2.5 rounded-2xl bg-white border border-[#F7DCE5] text-[#2B2024] hover:text-[#E82C7C] hover:border-[#E82C7C] transition-all shadow-xs"
            aria-label="Back to orders"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-extrabold uppercase text-[#E82C7C]">
                {orderNumber}
              </span>
              <AdminBadge variant="pink" size="sm" dot>
                {status}
              </AdminBadge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#2B2024]">
              Adaobi Okafor's Order
            </h1>
          </div>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-xs transition-all active:scale-95"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>WhatsApp Client</span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Order Items */}
        <div className="md:col-span-2 p-6 sm:p-7 rounded-3xl bg-white border border-[#F7DCE5] shadow-[0_4px_20px_rgba(232,44,124,0.04)] space-y-4">
          <h3 className="font-display font-extrabold text-base text-[#2B2024] border-b border-[#F7DCE5] pb-3">
            Requested Treats
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between items-center py-2.5 border-b border-[#F7DCE5]/60">
              <div>
                <span className="font-bold text-[#2B2024] block">1x Signature Strawberry Cloud Cake</span>
                <span className="text-[11px] text-[#7A6B70]">Artisanal Cakes</span>
              </div>
              <span className="font-bold text-[#E82C7C]">{formatCurrency(18500)}</span>
            </div>

            <div className="flex justify-between items-center py-2.5 border-b border-[#F7DCE5]/60">
              <div>
                <span className="font-bold text-[#2B2024] block">1x Red Velvet Gold Cupcakes (Box of 6)</span>
                <span className="text-[11px] text-[#7A6B70]">Gourmet Cupcakes</span>
              </div>
              <span className="font-bold text-[#E82C7C]">{formatCurrency(9500)}</span>
            </div>
          </div>

          <div className="pt-2 text-xs space-y-1.5 text-[#7A6B70]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-[#2B2024]">{formatCurrency(28000)}</span>
            </div>
            <div className="flex justify-between">
              <span>Lagos Delivery Fee</span>
              <span className="font-bold text-[#2B2024]">{formatCurrency(2000)}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-[#2B2024] pt-2 border-t border-[#F7DCE5]">
              <span>Total Amount</span>
              <span className="text-[#E82C7C] font-display">{formatCurrency(30000)}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#F7DCE5]">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#2B2024] mb-2">
              Delivery Logistics
            </h4>
            <div className="text-xs text-[#2B2024] bg-[#FFF5F8] p-4 rounded-2xl border border-[#FCE4EC] space-y-1.5 leading-relaxed">
              <p><strong>Address:</strong> 14 Admiralty Way, Lekki Phase 1, Lagos</p>
              <p><strong>Preferred Timing:</strong> 22 Aug 2026 (Afternoon: 1:00 PM - 5:00 PM)</p>
              <p><strong>Notes:</strong> "Include birthday card for Funke; gate code is 204."</p>
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          <form
            onSubmit={handleUpdate}
            className="p-6 rounded-3xl bg-white border border-[#F7DCE5] shadow-[0_4px_20px_rgba(232,44,124,0.04)] space-y-4"
          >
            <h3 className="font-display font-extrabold text-base text-[#2B2024] border-b border-[#F7DCE5] pb-2">
              Fulfillment Stage
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#2B2024]">Order Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full h-11 px-3 bg-white border border-[#F7DCE5] rounded-2xl text-xs font-bold text-[#2B2024] focus:outline-none focus:border-[#E82C7C] focus:ring-2 focus:ring-[#FCE4EC]"
              >
                <option value="PENDING">1. Request Received</option>
                <option value="CONFIRMED">2. Confirmed by Bakery</option>
                <option value="PROCESSING">3. In the Oven (Preparation)</option>
                <option value="READY">4. Ready for Dispatch / Pickup</option>
                <option value="DELIVERED">5. Delivered / Picked Up</option>
                <option value="CANCELLED">6. Cancelled</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#2B2024]">Kitchen Notes</label>
              <textarea
                rows={2}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="w-full p-3 bg-white border border-[#F7DCE5] rounded-2xl text-xs text-[#2B2024] focus:outline-none focus:border-[#E82C7C] focus:ring-2 focus:ring-[#FCE4EC]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#E82C7C] hover:bg-[#D31665] text-white text-xs font-bold shadow-[0_4px_14px_rgba(232,44,124,0.3)] transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Update Order</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
