import React, { useState } from 'react';
import { Save, ShieldCheck } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { BRAND } from '../../../lib/constants';
import { useToast } from '../../../hooks/useToast';

export default function StoreSettings() {
  const toast = useToast();
  const [storeData, setStoreData] = useState({
    storeName: BRAND.name,
    phone: BRAND.phone,
    whatsappNumber: BRAND.whatsappNumber,
    email: BRAND.email,
    deliveryFee: '2000',
    address: BRAND.address,
  });

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Store parameters saved successfully!');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-charcoal-900">
          Store & Business Configuration
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
          Configure contact numbers, default Lagos delivery fees, and operating hours.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-bold font-display text-charcoal-900 border-b border-cream-border pb-2">
            Operations & Rates
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Store Brand Name"
              value={storeData.storeName}
              onChange={(e) => setStoreData({ ...storeData, storeName: e.target.value })}
            />

            <Input
              label="Standard Lagos Delivery Fee (NGN ₦)"
              type="number"
              value={storeData.deliveryFee}
              onChange={(e) => setStoreData({ ...storeData, deliveryFee: e.target.value })}
            />

            <Input
              label="WhatsApp Concierge Number (Digits only)"
              value={storeData.whatsappNumber}
              onChange={(e) => setStoreData({ ...storeData, whatsappNumber: e.target.value })}
            />

            <Input
              label="Customer Support Phone"
              value={storeData.phone}
              onChange={(e) => setStoreData({ ...storeData, phone: e.target.value })}
            />

            <div className="sm:col-span-2">
              <Input
                label="Kitchen & Pickup Address"
                value={storeData.address}
                onChange={(e) => setStoreData({ ...storeData, address: e.target.value })}
              />
            </div>
          </div>

          <Button type="submit" variant="primary" icon={Save} className="mt-2">
            Save Store Settings
          </Button>
        </Card>
      </form>
    </div>
  );
}
