import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, DollarSign, Clock, CheckCircle2, Briefcase } from 'lucide-react';
import PageContainer from '../../components/common/PageContainer';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';

export default function ContractDetails() {
  const { slug } = useParams();

  const contract = {
    title: 'Weekend Event Pastry Chef',
    slug: slug || 'event-pastry-chef-weekend-contract',
    department: 'Bakery Operations',
    role_type: 'Contract / Weekend Events',
    location: 'Victoria Island & Ikoyi, Lagos',
    compensation: '₦45,000 / Event Shift',
    openings_count: 2,
    description:
      'We are looking for seasoned, passion-driven Pastry Chefs to support our luxury event catering operations on weekends. You will work alongside our Executive Chef to prepare delicate tiered cakes, artisan macarons, and French dessert platters for high-profile banquets.',
    responsibilities: [
      'Bake and assemble multi-tiered celebration cakes to exacting aesthetic standards.',
      'Decorate wedding cakes with fresh floral accents, gold leaf, and piped buttercream.',
      'Prepare individual parfait cups and dessert station displays at luxury venues in Lagos.',
      'Maintain pristine food hygiene, sanitation, and temperature control throughout events.',
    ],
    requirements: [
      'Minimum of 2 years professional baking or pastry kitchen experience.',
      'Demonstrated portfolio of past cake designs, desserts, or pastry work.',
      'Punctual, energetic, and capable of working in fast-paced event kitchen environments.',
      'Based in Lagos with proximity to Victoria Island or Lekki.',
    ],
  };

  return (
    <PageContainer size="sm">
      <div className="mb-6">
        <Link
          to="/contracts"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal-500 hover:text-brand-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Open Opportunities</span>
        </Link>
      </div>

      <div className="space-y-8">
        {/* Header Block */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{contract.department}</Badge>
            <Badge variant="success" dot>
              {contract.openings_count} Openings Available
            </Badge>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-charcoal-900 font-display">
            {contract.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-charcoal-700 pt-1">
            <div className="flex items-center gap-1 font-bold text-brand-700">
              <DollarSign className="w-4 h-4 text-brand-700" />
              <span>{contract.compensation}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-charcoal-500" />
              <span>{contract.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-charcoal-500" />
              <span>{contract.role_type}</span>
            </div>
          </div>
        </div>

        {/* Overview */}
        <Card className="p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-lg font-bold font-display text-charcoal-900 mb-2">
              Role Overview
            </h3>
            <p className="text-sm text-charcoal-700 leading-relaxed">
              {contract.description}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold font-display text-charcoal-900 mb-3">
              Key Responsibilities
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-charcoal-700">
              {contract.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold font-display text-charcoal-900 mb-3">
              Candidate Requirements
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-charcoal-700">
              {contract.requirements.map((r, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Apply CTA Bar */}
        <div className="p-6 rounded-2xl bg-cream-surface border border-cream-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-charcoal-900 text-base font-display">
              Ready to create sweet magic with us?
            </h4>
            <p className="text-xs text-charcoal-500">
              Submit your CV, contact details, and baking portfolio online.
            </p>
          </div>

          <Link to={`/contracts/${contract.slug}/apply`} className="w-full sm:w-auto">
            <Button variant="primary" size="lg" icon={Briefcase} className="w-full sm:w-auto">
              Apply For This Contract
            </Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
