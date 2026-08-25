import React from 'react';
import { Sparkles, Award, Truck } from 'lucide-react';

export default function BakeryHeroCollage({ className = '' }) {
  const circles = [
    {
      sizeClass: 'w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36',
      posClass: 'top-[2%] right-[8%] sm:right-[6%]',
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&auto=format&fit=crop&q=80',
      label: 'Artisanal Cakes',
      alt: 'Signature Strawberry Cake',
    },
    {
      sizeClass: 'w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44',
      posClass: 'top-[22%] right-[36%] sm:right-[28%] md:right-[24%]',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80',
      label: 'French Pastries',
      alt: 'Flaky Butter Croissants',
    },
    {
      sizeClass: 'w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36',
      posClass: 'top-[22%] right-[2%] sm:right-[0%]',
      image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=600&auto=format&fit=crop&q=80',
      label: 'Gourmet Cupcakes',
      alt: 'Red Velvet Gold Cupcakes',
    },
    {
      sizeClass: 'w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64',
      posClass: 'top-[50%] right-[14%] sm:right-[10%] md:right-[8%]',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80',
      label: 'Bespoke Catering',
      alt: 'Luxury Celebration Cake Display',
    },
  ];

  return (
    <div
      className={`relative mx-auto h-[350px] sm:h-[450px] md:h-[530px] w-full max-w-[360px] sm:max-w-[480px] md:max-w-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Decorative Warm Flourish Arcs */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none"
        viewBox="0 0 400 520"
        fill="none"
      >
        <path
          d="M 300 90 Q 240 180 250 240"
          stroke="#6B3A32"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.3"
        />
        <path
          d="M 250 260 Q 280 340 310 400"
          stroke="#E9A83A"
          strokeWidth="1.5"
          opacity="0.5"
        />
      </svg>

      {/* Bakery Visual Elements */}
      {circles.map((c, i) => (
        <div
          key={i}
          className={`group absolute rounded-full shadow-brand-lg ring-3 sm:ring-4 ring-white/90 flex items-end justify-center overflow-hidden transition-transform duration-500 hover:scale-105 ${c.sizeClass} ${c.posClass}`}
        >
          <img
            src={c.image}
            alt={c.alt}
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
          <span className="relative z-10 mb-2 sm:mb-3 font-display text-[9px] sm:text-xs tracking-wider sm:tracking-widest text-white font-bold uppercase drop-shadow-md text-center px-1">
            {c.label}
          </span>
        </div>
      ))}

      {/* Floating Micro Badge - Left Top */}
      <div className="absolute left-0 top-6 sm:top-10 bg-white/95 backdrop-blur-md py-1.5 px-3 rounded-full shadow-brand-md border border-cream-border flex items-center gap-2 z-20 transition-transform hover:scale-105">
        <span className="w-2 h-2 rounded-full bg-brand-700 animate-pulse" />
        <span className="text-[10px] sm:text-[11px] font-bold text-charcoal-900">
          Oven Fresh Today
        </span>
      </div>

      {/* Floating Micro Badge - Bottom Left */}
      <div className="absolute left-1 bottom-4 sm:bottom-8 bg-white/95 backdrop-blur-md p-2 sm:p-2.5 rounded-2xl shadow-brand-md border border-cream-border flex items-center gap-2.5 z-20 transition-transform hover:scale-105">
        <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs shrink-0">
          <Truck className="w-4 h-4" />
        </div>
        <div className="text-left pr-1">
          <span className="text-[11px] font-bold text-charcoal-900 block leading-tight">
            Chilled Delivery
          </span>
          <span className="text-[9px] text-charcoal-500 leading-tight">
            Pristine across Lagos
          </span>
        </div>
      </div>
    </div>
  );
}
