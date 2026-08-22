import React from 'react';
import { Menu, Bell, User, LogOut, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Dropdown from '../ui/Dropdown';
import Badge from '../ui/Badge';

export default function AdminHeader({ onOpenSidebar }) {
  const { user, profile, signOut, toggleRole } = useAuth();

  return (
    <header className="sticky top-0 z-30 h-18 bg-white border-b border-cream-border px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl text-charcoal-700 hover:bg-cream-surface"
          aria-label="Open navigation sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <Badge variant="gold" size="sm">
            Admin Mode
          </Badge>
          <span className="text-xs text-charcoal-500">
            Victoria Island Branch
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Toggle role tester */}
        <button
          type="button"
          onClick={toggleRole}
          className="text-xs font-semibold px-2.5 py-1 bg-cream-surface border border-cream-border rounded-full text-charcoal-700 hover:border-tory-300"
          title="Toggle role"
        >
          Role: {profile?.role || 'ADMIN'}
        </button>

        {/* Notifications Mock */}
        <button
          type="button"
          className="p-2 rounded-full text-charcoal-700 hover:bg-cream-surface relative"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-tory-500 rounded-full" />
        </button>

        {/* Admin Profile Dropdown */}
        <Dropdown
          align="right"
          trigger={
            <div className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-cream-border hover:border-tory-300 bg-cream-surface/40 transition-colors">
              <div className="w-7 h-7 rounded-full bg-tory-500 text-white font-bold text-xs flex items-center justify-center">
                {profile?.full_name?.charAt(0) || 'A'}
              </div>
              <span className="text-xs font-bold text-charcoal-900 hidden md:inline">
                {profile?.full_name || 'Admin'}
              </span>
            </div>
          }
          items={[
            { label: 'Admin Settings', href: '/admin/settings', icon: User },
            { divider: true },
            { label: 'Sign Out', onClick: signOut, danger: true, icon: LogOut },
          ]}
        />
      </div>
    </header>
  );
}
