import React from 'react';
import { RestaurantInfo } from '../types';

interface FooterProps {
  info: RestaurantInfo;
}

export const Footer: React.FC<FooterProps> = ({ info }) => {
  return (
    <footer className="bg-stone-950 border-t border-stone-800 text-stone-400 py-16 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 font-black text-lg flex items-center justify-center">
                1T
              </div>
              <div>
                <div className="font-bold text-stone-100 text-base font-serif">{info.name}</div>
                <div className="text-amber-400 text-xs">{info.hindiName} · Mansarovar, Jaipur</div>
              </div>
            </div>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-md">
              {info.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-stone-200 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#menu" className="hover:text-amber-400 transition-colors">Menu Highlights</a></li>
              <li><a href="#about" className="hover:text-amber-400 transition-colors">Our Story & Location</a></li>
              <li><a href="#gallery" className="hover:text-amber-400 transition-colors">Photo Gallery</a></li>
              <li><a href="#reservation" className="hover:text-amber-400 transition-colors">Reserve a Table</a></li>
              <li><a href="#reviews" className="hover:text-amber-400 transition-colors">Customer Reviews</a></li>
            </ul>
          </div>

          {/* External Platforms */}
          <div className="space-y-3">
            <h4 className="font-bold text-stone-200 text-sm uppercase tracking-wider">Order & Explore</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href={info.zomatoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                  Zomato Listing ↗
                </a>
              </li>
              <li>
                <a href={info.swiggyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                  Swiggy Delivery ↗
                </a>
              </li>
              <li>
                <a href={info.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                  Google Maps Directions ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} {info.name} ({info.hindiName}). All rights reserved.
          </div>
          <div>
            Built for Patrakar Colony, Mansarovar, Jaipur.
          </div>
        </div>
      </div>
    </footer>
  );
};
