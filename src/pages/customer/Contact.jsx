import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react';
import PageContainer from '../../components/common/PageContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Card from '../../components/ui/Card';
import { BRAND } from '../../lib/constants';
import { createWhatsAppUrl } from '../../lib/formatters';

export default function Contact() {
  const whatsappUrl = createWhatsAppUrl(
    BRAND.whatsappNumber,
    "Hello Tory's Treats! I would like to get in touch regarding a bakery inquiry."
  );

  return (
    <PageContainer>
      <SectionHeading
        tag="Reach Out"
        title="We’d Love to Hear From You"
        subtitle="Have a question about custom cakes, corporate dessert platters, or dietary preferences? Let’s chat!"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-5xl mx-auto">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-bold font-display text-charcoal-900 border-b border-cream-border pb-3">
              Bakery Information
            </h3>

            <div className="space-y-3.5 text-xs sm:text-sm text-charcoal-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-charcoal-900 block">Kitchen Location</span>
                  <span>{BRAND.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-charcoal-900 block">Phone Line</span>
                  <a href={`tel:${BRAND.rawPhone}`} className="hover:text-brand-700 transition-colors">
                    {BRAND.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-charcoal-900 block">Email Inquiries</span>
                  <a href={`mailto:${BRAND.email}`} className="hover:text-brand-700 transition-colors">
                    {BRAND.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-charcoal-900 block">Baking &amp; Delivery Hours</span>
                  <span>{BRAND.openingHours}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Instant WhatsApp Card */}
          <Card className="p-6 bg-gradient-to-br from-[#25D366]/10 to-transparent border-[#25D366]/30 space-y-3">
            <div className="flex items-center gap-2 text-[#25D366] font-bold text-sm">
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Instant WhatsApp Concierge</span>
            </div>
            <p className="text-xs text-charcoal-700 leading-relaxed">
              Need an immediate response for a same-day cake delivery or custom wedding cake consultation?
            </p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block pt-1">
              <Button variant="primary" size="sm" className="w-full justify-center bg-[#25D366] hover:bg-[#1EBE5D] text-white">
                Start WhatsApp Chat &rarr;
              </Button>
            </a>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <Card className="p-6 sm:p-8">
            <h3 className="text-lg font-bold font-display text-charcoal-900 mb-4">
              Send an Online Note
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for contacting Tory’s Treats! We will respond shortly.');
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Your Name" required placeholder="Amina Bello" />
                <Input label="Phone Number" required placeholder="09038358985" />
              </div>
              <Input label="Email Address" type="email" required placeholder="amina@example.com" />
              <Textarea label="Your Message or Special Request" required placeholder="Tell us how we can assist you..." rows={4} />
              <Button type="submit" variant="primary" icon={Send} className="w-full sm:w-auto">
                Send Note
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
