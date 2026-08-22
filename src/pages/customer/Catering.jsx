import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, MapPin, Cake, CheckCircle2, Sparkles } from 'lucide-react';
import PageContainer from '../../components/common/PageContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Textarea from '../../components/ui/Textarea';
import Card from '../../components/ui/Card';
import { useToast } from '../../hooks/useToast';

export default function Catering() {
  const toast = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventType: 'Wedding Reception',
    eventDate: '',
    guestCount: '100',
    venueLocation: 'Ikoyi, Lagos',
    foodRequirements: '',
    specialRequests: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const mockBookingNumber = 'TT-BK-202608-2041';
      toast.success('Catering inquiry submitted!', 'Inquiry Received');
      navigate(`/catering/confirmation/${mockBookingNumber}`);
    }, 1200);
  };

  return (
    <PageContainer size="sm">
      <SectionHeading
        tag="Bespoke Experiences"
        title="Event & Catering Inquiry"
        subtitle="Tell us about your upcoming celebration. We will formulate a tailored dessert quote and menu proposal."
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Info */}
        <Card className="p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold font-display text-charcoal-900 border-b border-cream-border pb-3">
            1. Contact Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              required
              placeholder="e.g. Dr. Bimbo Alabi"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
            <Input
              label="Phone / WhatsApp"
              type="tel"
              required
              placeholder="08023456789"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <div className="sm:col-span-2">
              <Input
                label="Email Address"
                type="email"
                required
                placeholder="bimbo@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>
        </Card>

        {/* Event Info */}
        <Card className="p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold font-display text-charcoal-900 border-b border-cream-border pb-3">
            2. Event Specifications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Event Type"
              required
              value={formData.eventType}
              onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
              options={[
                { value: 'Wedding Reception', label: 'Wedding Reception' },
                { value: 'Milestone Birthday Party', label: 'Milestone Birthday Party' },
                { value: 'Corporate Gala / Product Launch', label: 'Corporate Gala / Product Launch' },
                { value: 'Bridal / Baby Shower', label: 'Bridal / Baby Shower' },
                { value: 'Private Dinner / Tasting', label: 'Private Dinner / Tasting' },
              ]}
            />

            <Input
              label="Event Date"
              type="date"
              required
              value={formData.eventDate}
              onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
            />

            <Input
              label="Estimated Guest Count"
              type="number"
              min="10"
              required
              placeholder="e.g. 150"
              value={formData.guestCount}
              onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
            />

            <Input
              label="Venue & City"
              required
              placeholder="e.g. Civic Centre, Victoria Island"
              value={formData.venueLocation}
              onChange={(e) => setFormData({ ...formData, venueLocation: e.target.value })}
            />
          </div>

          <Textarea
            label="Desired Treats & Desserts"
            required
            placeholder="e.g. 3-tier red velvet cake, 100 dessert parfait cups, mini croissant platters, treat table setup..."
            rows={3}
            value={formData.foodRequirements}
            onChange={(e) => setFormData({ ...formData, foodRequirements: e.target.value })}
          />

          <Textarea
            label="Special Dietary or Theme Notes"
            placeholder="e.g. Color palette is Rose Gold & Emerald; 15 nut-free dessert portions required."
            rows={2}
            value={formData.specialRequests}
            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
          />
        </Card>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          icon={Calendar}
          className="w-full justify-center"
        >
          Submit Catering Inquiry
        </Button>
      </form>
    </PageContainer>
  );
}
