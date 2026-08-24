import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Heart, Sparkles, Star } from 'lucide-react';
import { BRAND } from '../../lib/constants';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-cream-base flex flex-col lg:flex-row">
      {/* Left Brand Showcase Section */}
      <div className="lg:w-1/2 bg-gradient-to-br from-brand-800 via-brand-700 to-brand-900 p-8 sm:p-12 lg:p-16 flex flex-col justify-between text-white relative overflow-hidden">
        {/* Ambient background blur circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-900/30 rounded-full blur-3xl pointer-events-none" />

        {/* Top Logo */}
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white text-brand-700 flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-white block">
                Tory's <span className="text-rose-200">Treats</span>
              </span>
              <span className="text-xs text-brand-100 uppercase tracking-widest font-semibold">
                Artisanal Bakery & Catering
              </span>
            </div>
          </Link>
        </div>

        {/* Center Hero Quote & Visual Presentation */}
        <div className="my-12 relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-6">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>Handcrafted in Lagos with Pure Passion</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-tight mb-6">
            Freshly baked happiness for every celebration.
          </h1>

          <p className="text-brand-100 text-sm sm:text-base leading-relaxed">
            Join thousands of treat lovers who order artisan cakes, custom event desserts, and gourmet platters prepared with premium ingredients.
          </p>

          {/* Testimonial Snippet */}
          <div className="mt-8 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
            <div className="flex gap-1 text-gold-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs sm:text-sm italic text-white/90">
              "Tory’s Treats catered our 200-guest wedding in Ikoyi. The dessert table was breathtaking and every single pastry melted in your mouth!"
            </p>
            <p className="text-xs font-bold text-rose-200 mt-2">
              — Funke & Tunde Adeyemi, Lagos
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="relative z-10 text-xs text-brand-200">
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
