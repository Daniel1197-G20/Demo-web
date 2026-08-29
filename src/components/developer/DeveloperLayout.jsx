import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DeveloperSidebar from './DeveloperSidebar';
import DeveloperHeader from './DeveloperHeader';

export default function DeveloperLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090d13] text-[#e6edf3] flex flex-col font-sans relative antialiased selection:bg-rose-500/30 selection:text-rose-200">
      {/* Subtle developer grid pattern */}
      <div 
        className="fixed inset-0 opacity-[0.02] pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(#58a6ff 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Developer Sidebar */}
      <DeveloperSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Viewport Content */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0 z-10">
        <DeveloperHeader onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto space-y-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
