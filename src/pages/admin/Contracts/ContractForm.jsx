import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Briefcase } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Textarea from '../../../components/ui/Textarea';
import Button from '../../../components/ui/Button';
import { useToast } from '../../../hooks/useToast';

export default function ContractForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    title: isEditing ? 'Weekend Event Pastry Chef' : '',
    department: 'Bakery Operations',
    roleType: 'Contract / Weekend Events',
    location: 'Victoria Island, Lagos',
    compensation: isEditing ? '₦45,000 / Event Shift' : '',
    openingsCount: isEditing ? '2' : '1',
    isPublished: isEditing ? true : false,
    isClosed: false,
    isPublicVisible: true,
    description: isEditing ? 'Support luxury catering operations on weekends preparing bespoke cakes and pastries.' : '',
    responsibilities: isEditing ? 'Assemble tiered celebration cakes.\nDecorate with gold leaf and florals.\nManage on-site dessert stations.' : '',
    requirements: isEditing ? '2+ years pastry experience.\nDemonstrated cake portfolio.\nBased in Lagos.' : '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success(
        isEditing ? 'Contract opportunity updated!' : 'New contract opportunity published!',
        'Contract Saved'
      );
      navigate('/admin/contracts');
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link
          to="/admin/contracts"
          className="p-2 rounded-xl bg-white border border-cream-border text-charcoal-700 hover:text-brand-600"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold font-display text-charcoal-900">
            {isEditing ? 'Edit Contract Opportunity' : 'Create Contract Role'}
          </h1>
          <p className="text-xs text-charcoal-500">
            Configure job specifications, pay rates, openings, and public visibility.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-bold font-display text-charcoal-900 border-b border-cream-border pb-2">
            Role Specifications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Job Title"
              required
              placeholder="e.g. Weekend Event Pastry Chef"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />

            <Select
              label="Department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              options={[
                { value: 'Bakery Operations', label: 'Bakery Operations' },
                { value: 'Event Catering Services', label: 'Event Catering Services' },
                { value: 'Logistics & Dispatch', label: 'Logistics & Dispatch' },
              ]}
            />

            <Input
              label="Compensation / Rate"
              required
              placeholder="e.g. ₦45,000 / Event Shift"
              value={formData.compensation}
              onChange={(e) => setFormData({ ...formData, compensation: e.target.value })}
            />

            <Input
              label="Number of Openings"
              type="number"
              min="1"
              required
              placeholder="2"
              value={formData.openingsCount}
              onChange={(e) => setFormData({ ...formData, openingsCount: e.target.value })}
            />
          </div>

          <Textarea
            label="Role Overview / Summary"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <Textarea
            label="Responsibilities (One per line)"
            rows={3}
            value={formData.responsibilities}
            onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
          />

          <Textarea
            label="Candidate Criteria / Requirements (One per line)"
            rows={3}
            value={formData.requirements}
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
          />
        </Card>

        {/* Lifecycle & Visibility Controls */}
        <Card className="p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-bold font-display text-charcoal-900 border-b border-cream-border pb-2">
            Lifecycle & Visibility
          </h3>

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-xs font-semibold text-charcoal-900 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="w-4 h-4 rounded text-brand-500 focus:ring-brand-400"
              />
              <span>Published (Accepting Applications)</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-charcoal-900 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPublicVisible}
                onChange={(e) => setFormData({ ...formData, isPublicVisible: e.target.checked })}
                className="w-4 h-4 rounded text-brand-500 focus:ring-brand-400"
              />
              <span>Visible in Public Careers Section</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-charcoal-900 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isClosed}
                onChange={(e) => setFormData({ ...formData, isClosed: e.target.checked })}
                className="w-4 h-4 rounded text-brand-500 focus:ring-brand-400"
              />
              <span>Mark as Closed</span>
            </label>
          </div>
        </Card>

        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
          <Link to="/admin/contracts" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto justify-center">
              Cancel
            </Button>
          </Link>
          <Button type="submit" variant="primary" size="lg" isLoading={isLoading} icon={Save} className="w-full sm:w-auto justify-center">
            {isEditing ? 'Save Changes' : 'Publish Opportunity'}
          </Button>
        </div>
      </form>
    </div>
  );
}
