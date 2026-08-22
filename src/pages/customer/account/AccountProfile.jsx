import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { useAuth } from '../../../hooks/useAuth';
import { useToast } from '../../../hooks/useToast';

export default function AccountProfile() {
  const { profile } = useAuth();
  const toast = useToast();

  const [formData, setFormData] = useState({
    fullName: profile?.full_name || 'Adaobi Okafor',
    email: profile?.email || 'adaobi@example.com',
    phone: profile?.phone || '+234 802 345 6789',
    address: '14 Admiralty Way, Lekki Phase 1',
    city: 'Lagos',
  });

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Profile details updated successfully!');
  };

  return (
    <Card className="p-6 sm:p-8 space-y-6">
      <h2 className="text-xl font-bold font-display text-charcoal-900 border-b border-cream-border pb-3">
        Personal Profile & Delivery Address
      </h2>

      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
          <Input
            label="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <div className="sm:col-span-2">
            <Input
              label="Email Address"
              disabled
              value={formData.email}
              helperText="Email is managed via your secure account authentication."
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              label="Default Delivery Address (Lagos)"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>
        </div>

        <Button type="submit" variant="primary" className="mt-2">
          Save Profile Changes
        </Button>
      </form>
    </Card>
  );
}
