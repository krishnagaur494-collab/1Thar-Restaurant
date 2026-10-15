import React, { useState } from 'react';
import { Calendar, Clock, Users, User, Phone, CheckCircle2, Sparkles } from 'lucide-react';
import { Reservation } from '../types';

interface ReservationSectionProps {
  onAddReservation: (res: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => void;
  whatsappNumber: string;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  onAddReservation,
  whatsappNumber
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('20:00');
  const [specialRequests, setSpecialRequests] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !date) return;

    onAddReservation({
      name,
      phone,
      guests,
      date,
      time,
      specialRequests
    });

    setSubmitted(true);
  };

  return (
    <section id="reservation" className="py-24 bg-stone-900/60 border-y border-stone-800 relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-3 mb-12">
          <div className="text-amber-400 text-xs font-bold uppercase tracking-widest">Book Your Experience</div>
          <h2 className="text-3xl sm:text-5xl font-black font-serif text-stone-100">
            Reserve a Table
          </h2>
          <p className="text-stone-400 text-sm sm:text-base max-w-lg mx-auto">
            Planning a family dinner, anniversary celebration or party in Mansarovar? Book your table in advance for a seamless dining experience.
          </p>
        </div>

        {submitted ? (
          <div className="bg-stone-900 border border-amber-500/50 p-10 rounded-3xl text-center space-y-6 shadow-2xl animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-serif text-stone-100">Table Reservation Received!</h3>
              <p className="text-stone-300 text-sm max-w-md mx-auto">
                Thank you, <span className="text-amber-400 font-bold">{name}</span>. We have reserved a table for <span className="font-bold">{guests} guests</span> on <span className="font-bold">{date}</span> at <span className="font-bold">{time}</span>.
              </p>
            </div>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi%201Thar%20Restaurant,%20I%20have%20submitted%20a%20table%20reservation%20for%20${guests}%20guests%20on%20${date}%20at%20${time}.%20Name:%20${encodeURIComponent(name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-colors flex items-center gap-2"
              >
                <span>Confirm via WhatsApp</span>
              </a>
              <button
                onClick={() => { setSubmitted(false); setName(''); setPhone(''); setSpecialRequests(''); }}
                className="px-6 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-sm transition-colors"
              >
                Book Another Table
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-stone-900 border border-stone-800 p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-2">
                  <User className="w-4 h-4 text-amber-400" /> Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400" /> Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>

              {/* Guests */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" /> Number of Guests *
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-150 focus:outline-none focus:border-amber-500 text-sm text-stone-100"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 15, 20].map((num) => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" /> Reservation Date *
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>

              {/* Time */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" /> Time Slot *
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 focus:outline-none focus:border-amber-500 text-sm"
                >
                  <option value="12:00">12:00 PM (Lunch)</option>
                  <option value="13:00">01:00 PM (Lunch)</option>
                  <option value="14:00">02:00 PM (Lunch)</option>
                  <option value="19:00">07:00 PM (Dinner)</option>
                  <option value="20:00">08:00 PM (Dinner)</option>
                  <option value="21:00">09:00 PM (Dinner)</option>
                  <option value="22:00">10:00 PM (Late Dinner)</option>
                </select>
              </div>

              {/* Special Requests */}
              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" /> Special Requests (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="E.g., Rooftop table, birthday celebration, high chair needed..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 text-sm resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-base shadow-xl shadow-amber-500/10 transition-all hover:scale-[1.01]"
            >
              Confirm Table Reservation
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
