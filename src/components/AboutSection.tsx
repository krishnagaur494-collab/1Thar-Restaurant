import React from 'react';
import { MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';
import { RestaurantInfo } from '../types';

interface AboutSectionProps {
  info: RestaurantInfo;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ info }) => {
  return (
    <section id="about" className="py-24 bg-stone-900/40 border-y border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Images Grid */}
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden border border-stone-800 shadow-2xl h-[420px]">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85"
                alt="1Thar Restaurant Dining Hall"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 z-20 w-3/5 rounded-2xl overflow-hidden border-4 border-stone-950 shadow-2xl hidden sm:block h-[240px]">
              <img
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=85"
                alt="Restaurant Ambiance Mansarovar"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative background glow */}
            <div className="absolute -inset-4 bg-amber-500/5 rounded-3xl blur-2xl -z-10" />
          </div>

          {/* Copy */}
          <div className="space-y-6">
            <div className="text-amber-400 text-xs font-bold uppercase tracking-widest">Our Story & Location</div>
            <h2 className="text-3xl sm:text-5xl font-black font-serif text-stone-100 leading-tight">
              A Warm Table in Patrakar Colony, Mansarovar
            </h2>
            <p className="text-stone-300 text-base leading-relaxed">
              {info.description}
            </p>
            <p className="text-stone-400 text-sm leading-relaxed">
              Known for our welcoming owner and humble staff, 1Thar Restaurant offers a soothing environment where families and friends gather to enjoy delicious Indian meals, parties, and evening dinners without breaking the bank.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 bg-stone-900/60 p-4 rounded-xl border border-stone-800">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-100 text-sm">Location</div>
                  <div className="text-stone-400 text-xs mt-1">{info.address}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-stone-900/60 p-4 rounded-xl border border-stone-800">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-100 text-sm">Opening Hours</div>
                  <div className="text-stone-400 text-xs mt-1">{info.hours}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-stone-900/60 p-4 rounded-xl border border-stone-800">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-100 text-sm">Quality & Hygiene</div>
                  <div className="text-stone-400 text-xs mt-1">Hygienic kitchen & fresh ingredients daily</div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-stone-900/60 p-4 rounded-xl border border-stone-800">
                <Heart className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-100 text-sm">Family Friendly</div>
                  <div className="text-stone-400 text-xs mt-1">Warm staff, party bookings & group seating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
