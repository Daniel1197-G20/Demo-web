import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  Bell,
  User,
  LogOut,
  Plus,
  ExternalLink,
  Sparkles,
  Calendar,
  Cake,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Dropdown from '../ui/Dropdown';

export default function AdminHeader({ onOpenSidebar }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notifRef = useRef(null);

  // Time-aware greeting
  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  // Click outside to close notifications
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && notificationsOpen) {
        setNotificationsOpen(false);
      }
    };

    if (notificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [notificationsOpen]);

  const NOTIFICATIONS = [
    {
      id: '1',
      title: 'New Booking Inquiry',
      description: 'Dr. Bimbo Alabi requested a quote for 150 guests.',
      time: '10m ago',
      icon: Calendar,
      unread: true,
      href: '/admin/bookings',
    },
    {
      id: '2',
      title: 'Strawberry Cloud Cake Active',
      description: 'Availability status was updated to In Stock.',
      time: '1h ago',
      icon: Cake,
      unread: false,
      href: '/admin/products',
    },
  ];

  return (
    <header className="sticky top-0 z-30 h-16 sm:h-[72px] bg-white/95 backdrop-blur-md border-b border-[#F7DCE5] px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-[0_2px_12px_rgba(232,44,124,0.03)]">
      {/* Left: Mobile Toggle & Warm Greeting */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-2xl text-[#2B2024] hover:bg-[#FFF5F8] border border-[#F7DCE5] focus:outline-none transition-colors"
          aria-label="Open navigation sidebar"
        >
          <Menu className="w-5 h-5 text-[#E82C7C]" />
        </button>

        <div>
          <h2 className="text-sm sm:text-base font-display font-extrabold text-[#2B2024] flex items-center gap-1.5">
            <span>{timeGreeting}, Victoria</span>
            <span className="inline-block animate-wave origin-bottom-right">👋</span>
          </h2>
          <p className="text-[11px] text-[#7A6B70] hidden sm:block">
            Tory's Treats Victoria Island • Business Management
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Add Product Button */}
        <Link to="/admin/products/new" className="hidden sm:inline-flex">
          <button
            type="button"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#E82C7C] hover:bg-[#D31665] text-white text-xs font-bold shadow-[0_4px_12px_rgba(232,44,124,0.25)] transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5px]" />
            <span>Add Product</span>
          </button>
        </Link>

        {/* View Live Store */}
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#F7DCE5] bg-[#FFF5F8] text-[#E82C7C] hover:bg-[#FCE4EC] text-xs font-bold transition-colors"
          title="Open live website in new tab"
        >
          <span>View Live Store</span>
          <ExternalLink className="w-3 h-3" />
        </Link>

        {/* Notifications Dropdown Toggle */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-full text-[#7A6B70] hover:text-[#2B2024] hover:bg-[#FFF5F8] relative border border-[#F7DCE5] bg-white transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-[#E82C7C]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E82C7C] rounded-full animate-pulse" />
          </button>

          {/* Notifications Dropdown Popover */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-3xl bg-white border border-[#F7DCE5] shadow-[0_12px_40px_rgba(232,44,124,0.12)] p-4 z-50 animate-fadeIn space-y-3">
              <div className="flex items-center justify-between border-b border-[#F7DCE5] pb-2.5">
                <span className="font-display font-bold text-xs text-[#2B2024]">Notifications</span>
                <span className="text-[10px] font-bold text-[#E82C7C] bg-[#FFF5F8] px-2 py-0.5 rounded-full border border-[#FCE4EC]">
                  1 New
                </span>
              </div>

              <div className="space-y-2">
                {NOTIFICATIONS.map((n) => {
                  const Icon = n.icon;
                  return (
                    <Link
                      key={n.id}
                      to={n.href}
                      onClick={() => setNotificationsOpen(false)}
                      className={`block p-2.5 rounded-2xl transition-colors ${
                        n.unread ? 'bg-[#FFF5F8] border border-[#FCE4EC]' : 'hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-xl bg-white text-[#E82C7C] border border-[#FCE4EC] flex items-center justify-center shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-[#2B2024]">{n.title}</p>
                          <p className="text-[11px] text-[#7A6B70] leading-snug line-clamp-1">{n.description}</p>
                          <span className="text-[9px] text-[#7A6B70]/70 mt-1 block">{n.time}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Victoria Profile Dropdown */}
        <Dropdown
          align="right"
          menuClassName="border-[#F7DCE5] shadow-[0_12px_40px_rgba(232,44,124,0.12)] rounded-3xl p-1.5"
          trigger={
            <div className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full border border-[#F7DCE5] hover:border-[#E82C7C] bg-[#FFF5F8] transition-colors cursor-pointer">
              <div className="w-7 h-7 rounded-full bg-[#E82C7C] text-white font-black text-xs flex items-center justify-center shadow-xs">
                V
              </div>
              <span className="text-xs font-bold text-[#2B2024] hidden sm:inline">
                Victoria
              </span>
              <ChevronDown className="w-3 h-3 text-[#7A6B70]" />
            </div>
          }
          items={[
            { label: 'Store Settings', href: '/admin/settings', onClick: () => navigate('/admin/settings'), icon: User },
            { label: 'Developer Operations', href: '/developer', onClick: () => navigate('/developer'), icon: Sparkles },
            { label: 'View Live Bakery', href: '/', onClick: () => navigate('/'), icon: ExternalLink },
            { divider: true },
            {
              label: 'Sign Out',
              onClick: () => {
                signOut();
                navigate('/admin');
              },
              danger: true,
              icon: LogOut,
            },
          ]}
        />
      </div>
    </header>
  );
}
