import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomerNavbar from './CustomerNavbar';
import CustomerFooter from './CustomerFooter';
import WhatsAppFloatingButton from '../common/WhatsAppFloatingButton';

export default function CustomerLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-cream-base">
      <CustomerNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <CustomerFooter />
      <WhatsAppFloatingButton />
    </div>
  );
}
