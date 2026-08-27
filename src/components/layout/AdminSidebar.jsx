import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Cake,
  PlusCircle,
  Calendar,
  Layers,
  Settings,
  Heart,
  ArrowLeft,
  X,
  LogOut,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useAdminStore } from '../../lib/adminStore';

export default function AdminSidebar({ isOpen, onClose }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const store = useAdminStore();
  const stats = store.getStats();

  const NAV_ITEMS = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
      end: true,
    },
    {
      name: 'Products',
      href: '/admin/products',
      icon: Cake,
      badge: stats.totalProducts,
    },
    {
      name: 'Add Product',
      href: '/admin/products/new',
      icon: PlusCircle,
      highlight: true,
    },
    {
      name: 'Bookings',
      href: '/admin/bookings',
      icon: Calendar,
      badge: stats.pendingBookings > 0 ? `${stats.pendingBookings} New` : null,
      badgeType: stats.pendingBookings > 0 ? 'attention' : 'neutral',
    },
    {
      name: 'Categories',
      href: '/admin/categories',
      icon: Layers,
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: Settings,
    },
  ];

  // Close on escape key and lock body scroll
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSignOut = () => {
    signOut();
    if (onClose) onClose();
    navigate('/admin');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#2B2024]/60 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-[#F7DCE5] flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 shadow-[4px_0_24px_rgba(232,44,124,0.04)] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Branding Section */}
        <div>
          <div className="h-16 sm:h-[72px] px-5 border-b border-[#F7DCE5] flex items-center justify-between bg-[#FFF5F8]/50">
            <Link to="/admin/dashboard" onClick={() => onClose && onClose()} className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#E82C7C] flex items-center justify-center text-white shadow-[0_4px_12px_rgba(232,44,124,0.3)]">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="font-display font-black text-lg text-[#2B2024] block leading-tight">
                  Tory's <span className="text-[#E82C7C]">Treats</span>
                </span>
                <span className="text-[10px] text-[#7A6B70] font-bold uppercase tracking-wider block">
                  Admin Dashboard
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-1.5 text-[#7A6B70] hover:text-[#2B2024] rounded-xl hover:bg-[#FFF5F8] transition-colors"
              aria-label="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Victoria Profile Badge in Sidebar */}
          <div className="p-4 mx-3 my-3 rounded-2xl bg-[#FFF5F8] border border-[#FCE4EC] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E82C7C] text-white font-black text-sm flex items-center justify-center shadow-xs shrink-0">
              V
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-[#2B2024] truncate">Victoria Elijah</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" title="Online" />
              </div>
              <span className="text-[10px] text-[#E82C7C] font-semibold block truncate">
                Business Owner
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="px-3 space-y-1 mt-2">
            <div className="px-3 pb-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#7A6B70]/70">
              Management Menu
            </div>

            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.end}
                  onClick={() => onClose && onClose()}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                      isActive
                        ? 'bg-[#E82C7C] text-white shadow-[0_4px_14px_rgba(232,44,124,0.3)] translate-x-1'
                        : item.highlight
                        ? 'text-[#E82C7C] bg-[#FFF5F8] hover:bg-[#FCE4EC]'
                        : 'text-[#2B2024] hover:bg-[#FFF5F8] hover:text-[#E82C7C]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : item.highlight ? 'text-[#E82C7C]' : 'text-[#7A6B70]'}`} />
                        <span>{item.name}</span>
                      </div>

                      {item.badge !== null && item.badge !== undefined && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : item.badgeType === 'attention'
                              ? 'bg-[#E82C7C] text-white animate-pulse'
                              : 'bg-[#FFF5F8] text-[#7A6B70] border border-[#F7DCE5]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="p-4 border-t border-[#F7DCE5] bg-[#FFF5F8]/40 space-y-2">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-2xl border border-[#F7DCE5] bg-white text-xs font-bold text-[#2B2024] hover:border-[#E82C7C] hover:text-[#E82C7C] transition-all shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Store</span>
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-2xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
