import React from 'react';
import { Star, MapPin, Compass, ArrowRight } from 'lucide-react';
import { RestaurantInfo } from '../types';

interface HeroProps {
  info: RestaurantInfo;
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ info, onOpenReservation }) => {
  return (
    <section id="home" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-stone-950 py-20">
      {/* Background Image with Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={info.heroImage}
          alt="1Thar Restaurant Ambiance"
          className="w-full h-full object-cover object-center scale-105 filter brightness-50 contrast-115 animate-subtle-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="max-w-3xl space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-bold backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>North Indian Restaurant · Patrakar Colony, Mansarovar</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-stone-100 font-serif leading-[1.08]">
            Taste the Magic of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 italic">1Thar</span> & Heritage Flavours.
          </h1>

          {/* Description */}
          <p className="text-stone-300 text-base sm:text-xl font-normal leading-relaxed max-w-2xl">
            {info.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#menu"
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/20 flex items-center gap-2 transition-all hover:scale-105"
            >
              <span>Explore Full Menu</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenReservation}
              className="px-6 py-3.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-200 border border-stone-700 font-bold text-sm sm:text-base backdrop-blur-md transition-all hover:border-amber-500/50"
            >
              Reserve a Table
            </button>

            <a
              href={info.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-xl bg-stone-900/60 hover:bg-stone-900 text-stone-300 border border-stone-800 font-semibold text-sm flex items-center gap-2 transition-colors"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Get Directions</span>
            </a>
          </div>

          {/* Key Metrics / Highlights Footer in Hero */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-stone-800/80 text-stone-300 text-xs sm:text-sm">
            <div className="flex items-center gap-3 bg-stone-900/40 p-3 rounded-lg border border-stone-800/50 backdrop-blur">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Star className="w-5 h-5 fill-amber-400" />
              </div>
              <div>
                <div className="font-bold text-stone-100 flex items-center gap-1">
                  <span>{info.rating}</span>
                  <span className="text-stone-400 text-xs font-normal">({info.reviewCount} reviews)</span>
                </div>
                <div className="text-stone-400 text-xs">Top Rated in Mansarovar</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-stone-900/40 p-3 rounded-lg border border-stone-800/50 backdrop-blur">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-stone-100">Veer Teja Circle</div>
                <div className="text-stone-400 text-xs">Patrakar Colony, Jaipur</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-stone-900/40 p-3 rounded-lg border border-stone-800/50 backdrop-blur">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <span className="font-bold text-base">₹</span>
              </div>
              <div>
                <div className="font-bold text-stone-100">{info.priceRange}</div>
                <div className="text-stone-400 text-xs">Affordable Dine-in & Party</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
