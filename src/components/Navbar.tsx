import React, { useState } from 'react';
import { UtensilsCrossed, ShoppingBag, Calendar, Settings, MessageSquare, Menu as MenuIcon, X } from 'lucide-react';
import { RestaurantInfo } from '../types';

interface NavbarProps {
  info: RestaurantInfo;
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  info,
  cartCount,
  onOpenCart,
  onOpenReservation,
  onOpenAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-black text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            1T
          </div>
          <div>
            <div className="font-extrabold text-lg sm:text-xl tracking-tight text-stone-100 font-serif">
              {info.name}
            </div>
            <div className="text-xs text-amber-400 font-medium tracking-wider uppercase">
              {info.hindiName} · Mansarovar, Jaipur
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-300">
          <a href="#menu" className="hover:text-amber-400 transition-colors">Menu</a>
          <a href="#about" className="hover:text-amber-400 transition-colors">Our Story</a>
          <a href="#gallery" className="hover:text-amber-400 transition-colors">Gallery</a>
          <a href="#reservation" className="hover:text-amber-400 transition-colors">Reserve Table</a>
          <a href="#reviews" className="hover:text-amber-400 transition-colors">Reviews</a>
          <a href="#visit" className="hover:text-amber-400 transition-colors">Find Us</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* WhatsApp Direct Chat */}
          <a
            href={`https://wa.me/${info.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%201Thar%20Restaurant,%20I%20would%20like%20to%20inquire%20about...`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-colors"
            title="Chat on WhatsApp"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>

          {/* Table Reservation Button */}
          <button
            onClick={onOpenReservation}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold shadow-lg shadow-amber-500/10 transition-transform active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Table</span>
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-lg bg-stone-900 border border-stone-800 hover:border-amber-500/50 text-stone-200 transition-colors"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-500 text-stone-950 text-xs font-black rounded-full flex items-center justify-center shadow">
                {cartCount}
              </span>
            )}
          </button>

          {/* Admin CMS Mode Toggle */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-900 border border-stone-800 hover:border-stone-700 text-amber-400 text-xs font-semibold transition-colors"
            title="Open Drag-and-Drop CMS & Admin Dashboard"
          >
            <Settings className="w-4 h-4 animate-spin-slow" />
            <span className="hidden md:inline">Admin CMS</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-300"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-900 border-b border-stone-800 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <a
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-300 hover:text-amber-400 font-medium border-b border-stone-800/60"
          >
            Menu & Specialities
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-300 hover:text-amber-400 font-medium border-b border-stone-800/60"
          >
            Our Story & Location
          </a>
          <a
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-300 hover:text-amber-400 font-medium border-b border-stone-800/60"
          >
            Photo Gallery
          </a>
          <a
            href="#reservation"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-300 hover:text-amber-400 font-medium border-b border-stone-800/60"
          >
            Reserve Table
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-300 hover:text-amber-400 font-medium border-b border-stone-800/60"
          >
            Customer Reviews ({info.reviewCount})
          </a>
          <a
            href="#visit"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-300 hover:text-amber-400 font-medium"
          >
            Find Us & Directions
          </a>

          <div className="pt-2 flex gap-3">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenReservation(); }}
              className="flex-1 py-2.5 rounded-lg bg-amber-500 text-stone-950 font-bold text-center text-sm"
            >
              Book Table
            </button>
            <a
              href={`https://wa.me/${info.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 rounded-lg bg-emerald-600 text-white font-bold text-center text-sm flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
