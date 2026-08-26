import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Calendar, Users, MapPin, DollarSign, MessageCircle } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Textarea from '../../../components/ui/Textarea';
import Button from '../../../components/ui/Button';
import { createWhatsAppUrl } from '../../../lib/formatters';
import { useToast } from '../../../hooks/useToast';

export default function BookingDetails() {
  const { bookingNumber = 'TT-BK-202608-2041' } = useParams();
  const toast = useToast();

  const [quoteAmount, setQuoteAmount] = useState('450000');
  const [status, setStatus] = useState('QUOTED');
  const [adminNotes, setAdminNotes] = useState('Includes 3-tier custom centerpiece cake, 120 dessert cups, and live chef flambé station.');

  const clientPhone = '08023456789';
  const whatsappUrl = createWhatsAppUrl(
    clientPhone,
    `Hello Dr. Bimbo! This is Tory's Treats regarding your event catering inquiry ${bookingNumber}. We have prepared your custom dessert proposal!`
  );

  const handleSave = () => {
    toast.success('Catering quote & booking stage updated successfully!');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link
          to="/admin/bookings"
          className="p-2 rounded-xl bg-white border border-cream-border text-charcoal-700 hover:text-brand-700"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold font-display text-charcoal-900">
            Catering Inquiry {bookingNumber}
          </h1>
          <p className="text-xs text-charcoal-500">
            Event specifications, menu proposal, and client communication.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 p-6 space-y-4">
          <h3 className="text-base font-bold font-display text-charcoal-900 border-b border-cream-border pb-2">
            Client & Event Specifications
          </h3>

          <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <span className="text-charcoal-500 block text-xs">Client Name</span>
              <span className="font-bold text-charcoal-900">Dr. Bimbo Alabi</span>
            </div>
            <div>
              <span className="text-charcoal-500 block text-xs">Phone / WhatsApp</span>
              <span className="font-bold text-charcoal-900">{clientPhone}</span>
            </div>
            <div>
              <span className="text-charcoal-500 block text-xs">Event Type</span>
              <span className="font-bold text-charcoal-900">Wedding Reception</span>
            </div>
            <div>
              <span className="text-charcoal-500 block text-xs">Event Date & Guests</span>
              <span className="font-bold text-charcoal-900">12 Sep 2026 • 150 Guests</span>
            </div>
            <div className="col-span-2">
              <span className="text-charcoal-500 block text-xs">Venue Location</span>
              <span className="font-bold text-charcoal-900">Civic Centre, Victoria Island, Lagos</span>
            </div>
          </div>

          <div className="pt-2">
            <span className="text-charcoal-500 block text-xs mb-1">Treat & Dessert Requirements:</span>
            <p className="text-xs sm:text-sm text-charcoal-700 bg-cream-surface/60 p-3.5 rounded-xl border border-cream-border">
              3-tier red velvet celebration cake, 100 dessert parfait cups, assorted croissant platters, treat table setup with gold theme.
            </p>
          </div>
        </Card>

        {/* Quote & Stage Controls */}
        <div className="space-y-4">
          <Card className="p-6 space-y-4">
            <h3 className="text-base font-bold font-display text-charcoal-900 border-b border-cream-border pb-2">
              Informational Quote & Stage
            </h3>

            <Input
              label="Estimated Quote (NGN ₦)"
              type="number"
              value={quoteAmount}
              onChange={(e) => setQuoteAmount(e.target.value)}
              helperText="Informational estimate shared with client."
            />

            <Select
              label="Booking Stage"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              options={[
                { value: 'PENDING', label: '1. Inquiry Received (Pending)' },
                { value: 'REVIEWING', label: '2. Under Kitchen Review' },
                { value: 'QUOTED', label: '3. Quote Formulated & Sent' },
                { value: 'CONFIRMED', label: '4. Event Confirmed' },
                { value: 'IN_PROGRESS', label: '5. In Preparation' },
                { value: 'COMPLETED', label: '6. Event Completed' },
                { value: 'REJECTED', label: '7. Declined / Cancelled' },
              ]}
            />

            <Textarea
              label="Admin Quote Breakdown Notes"
              rows={3}
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
            />

            <Button variant="primary" className="w-full justify-center" onClick={handleSave} icon={Save}>
              Save Proposal & Stage
            </Button>
          </Card>

          <Card className="p-6 space-y-2 text-xs text-charcoal-700">
            <h4 className="font-bold text-charcoal-900 uppercase tracking-wider text-[11px]">
              Client Consultation
            </h4>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block pt-1">
              <Button variant="secondary" size="sm" icon={MessageCircle} className="w-full justify-center">
                WhatsApp Client
              </Button>
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
}
