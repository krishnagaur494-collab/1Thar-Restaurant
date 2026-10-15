import React from 'react';
import { MapPin, Phone, Clock, Compass, ExternalLink } from 'lucide-react';
import { RestaurantInfo } from '../types';

interface VisitSectionProps {
  info: RestaurantInfo;
}

export const VisitSection: React.FC<VisitSectionProps> = ({ info }) => {
  return (
    <section id="visit" className="py-24 bg-stone-900/40 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-amber-400 text-xs font-bold uppercase tracking-widest">Find Us & Directions</div>
          <h2 className="text-3xl sm:text-5xl font-black font-serif text-stone-100">
            Visit 1Thar Restaurant
          </h2>
          <p className="text-stone-400 text-sm sm:text-base">
            Easily locate us in Patrakar Colony near Veer Teja Circle, Mansarovar, Jaipur.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Contact Details */}
          <div className="bg-stone-900 border border-stone-800 p-8 sm:p-10 rounded-3xl space-y-8 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold font-serif text-stone-100">Contact & Location Info</h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-100 text-base">Address</h4>
                    <p className="text-stone-400 text-sm mt-1">{info.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-100 text-base">Phone & WhatsApp</h4>
                    <a href={`tel:${info.phone.replace(/[^0-9]/g, '')}`} className="text-amber-400 font-bold text-sm hover:underline block mt-1">
                      {info.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-100 text-base">Opening Hours</h4>
                    <p className="text-stone-400 text-sm mt-1">{info.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-800 flex flex-wrap gap-4">
              <a
                href={info.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm text-center shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <Compass className="w-4 h-4" />
                <span>Open Google Maps</span>
              </a>

              <a
                href={`tel:${info.phone.replace(/[^0-9]/g, '')}`}
                className="py-3.5 px-6 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-sm text-center border border-stone-700 transition-colors"
              >
                Call Restaurant
              </a>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="rounded-3xl overflow-hidden border border-stone-800 shadow-2xl min-h-[380px] lg:min-h-full">
            <iframe
              title="1Thar Restaurant Map location in Mansarovar Jaipur"
              src="https://maps.google.com/maps?q=1%20Thar%20Restaurant%20Veer%20Teja%20Circle%20Patrakar%20Colony%20Mansarovar%20Jaipur&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 filter contrast-125 invert-90"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
