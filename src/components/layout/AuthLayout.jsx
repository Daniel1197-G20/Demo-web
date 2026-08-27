import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Heart, Sparkles, Star } from 'lucide-react';
import { BRAND } from '../../lib/constants';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#FFF5F8] flex flex-col lg:flex-row">
      {/* Left Brand Showcase Section */}
      <div className="lg:w-1/2 bg-gradient-to-br from-[#E82C7C] via-[#D31665] to-[#7B0E3B] p-6 sm:p-10 lg:p-16 flex flex-col justify-between text-white relative overflow-hidden">
        {/* Ambient background blur circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-black/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Logo */}
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white text-[#E82C7C] flex items-center justify-center shadow-lg">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
            </div>
            <div>
              <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-white block">
                Tory's <span className="text-[#FCE4EC]">Treats</span>
              </span>
              <span className="text-[10px] sm:text-xs text-[#FFF5F8] uppercase tracking-widest font-bold">
                Artisanal Bakery &amp; Catering
              </span>
            </div>
          </Link>
        </div>

        {/* Center Hero Quote & Visual Presentation (Compact on mobile, full on sm+) */}
        <div className="my-6 lg:my-12 relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-4 lg:mb-6">
            <Sparkles className="w-4 h-4 text-[#FCE4EC]" />
            <span>Handcrafted in Lagos with Pure Passion</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold font-display leading-tight mb-3 lg:mb-6">
            Freshly baked happiness for every celebration.
          </h1>

          <p className="text-white/90 text-xs sm:text-base leading-relaxed hidden sm:block">
            Join thousands of treat lovers who order artisan cakes, custom event desserts, and gourmet platters prepared with premium ingredients.
          </p>

          {/* Testimonial Snippet (Hidden on mobile, visible on sm+) */}
          <div className="mt-6 sm:mt-8 p-4 sm:p-5 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 hidden sm:block">
            <div className="flex gap-1 text-[#FCE4EC] mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs sm:text-sm italic text-white/95">
              "Tory’s Treats catered our 200-guest wedding in Ikoyi. The dessert table was breathtaking and every single pastry melted in your mouth!"
            </p>
            <p className="text-xs font-bold text-[#FCE4EC] mt-2">
              — Funke &amp; Tunde Adeyemi, Lagos
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="relative z-10 text-xs text-[#FCE4EC] hidden lg:block">
          © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </div>
      </div>

      {/* Right Form Area */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-16">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
