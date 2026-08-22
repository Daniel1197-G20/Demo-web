import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, ArrowRight, Sparkles, Clock } from 'lucide-react';
import PageContainer from '../../components/common/PageContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import Card, { CardContent } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export default function Contracts() {
  // Database-driven contract opportunities (prepared for Supabase in Phase 2)
  const MOCK_CONTRACTS = [
    {
      id: 'contract-1',
      slug: 'event-pastry-chef-weekend-contract',
      title: 'Weekend Event Pastry Chef',
      department: 'Bakery Operations',
      role_type: 'Contract / Weekend Events',
      location: 'Victoria Island, Lagos',
      compensation: '₦45,000 / Event Shift',
      openings_count: 2,
      description: 'Join our high-octane weekend catering team preparing custom cakes and dessert platters for high-profile Lagos celebrations.',
      is_published: true,
      is_closed: false,
    },
    {
      id: 'contract-2',
      slug: 'lead-catering-service-specialist',
      title: 'Lead Catering Service Specialist',
      department: 'Event Catering Services',
      role_type: 'Seasonal Event Contract',
      location: 'Ikoyi & Lekki, Lagos',
      compensation: '₦35,000 / Event Shift',
      openings_count: 4,
      description: 'Manage on-site dessert display styling, guest treat service, and live dessert flambé stations at luxury wedding receptions.',
      is_published: true,
      is_closed: false,
    },
    {
      id: 'contract-3',
      slug: 'chilled-treats-delivery-courier',
      title: 'Chilled Treats Delivery Specialist',
      department: 'Logistics & Dispatch',
      role_type: 'Part-Time Contract',
      location: 'Lagos Mainland & Island',
      compensation: '₦120,000 / Month + Fuel Allowance',
      openings_count: 2,
      description: 'Ensure safe, temperature-controlled delivery of delicate multi-tiered cakes and pastries to venues and private residences.',
      is_published: true,
      is_closed: false,
    },
  ];

  return (
    <PageContainer>
      <SectionHeading
        tag="Join Our Creative Team"
        title="Contract Staff & Culinary Opportunities"
        subtitle="Work with Lagos' premier luxury bakery. We offer flexible event-based contracts, competitive compensation, and world-class culinary experience."
      />

      <div className="space-y-4 max-w-4xl mx-auto">
        {MOCK_CONTRACTS.map((contract) => (
          <Card key={contract.id} hover className="p-6 sm:p-7 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{contract.department}</Badge>
                <Badge variant="success" dot>
                  {contract.openings_count} Openings
                </Badge>
              </div>

              <h3 className="text-xl font-bold text-charcoal-900 font-display">
                {contract.title}
              </h3>

              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                {contract.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal-500 pt-2">
                <div className="flex items-center gap-1.5 font-medium text-tory-600">
                  <DollarSign className="w-4 h-4 text-tory-500" />
                  <span>{contract.compensation}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-charcoal-500" />
                  <span>{contract.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-charcoal-500" />
                  <span>{contract.role_type}</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 pt-2 sm:pt-0">
              <Link to={`/contracts/${contract.slug}`}>
                <Button variant="primary" icon={ArrowRight} iconPosition="right" className="w-full sm:w-auto">
                  View Role & Apply
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
