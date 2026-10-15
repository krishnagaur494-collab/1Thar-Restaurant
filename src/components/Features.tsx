import React from 'react';
import { Flame, Sparkles, Users, Coffee } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: <Flame className="w-6 h-6 text-amber-400" />,
      title: "Authentic North Indian",
      description: "From rich Kadhai Paneer and velvety Dal Makhani to tandoori breads baked fresh in traditional clay ovens."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      title: "Rooftop Vibe & Ambiance",
      description: "Soothing rooftop seating near Veer Teja Circle offering a relaxed atmosphere for evenings with friends and family."
    },
    {
      icon: <Users className="w-6 h-6 text-amber-400" />,
      title: "Family & Party Dining",
      description: "Spacious seating arrangements ideal for family get-togethers, birthday celebrations, and casual parties."
    },
    {
      icon: <Coffee className="w-6 h-6 text-amber-400" />,
      title: "Snacks, Pizza & Beverages",
      description: "Exciting variety spanning Chinese starters, loaded pizzas, burgers, mojitos, and comforting cold coffees."
    }
  ];

  return (
    <section id="features" className="py-20 bg-stone-900/60 border-y border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-amber-400 text-xs font-bold uppercase tracking-widest">Why Dine With Us</div>
          <h2 className="text-3xl sm:text-4xl font-black font-serif text-stone-100">
            Flavours that Bring People Together
          </h2>
          <p className="text-stone-400 text-sm sm:text-base">
            Experience top-tier hospitality, hygienic preparation, and unforgettable food in the heart of Mansarovar, Jaipur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-stone-900 border border-stone-800 p-6 rounded-2xl hover:border-amber-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5 group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors">
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold text-stone-100 mb-2 font-serif">{feat.title}</h3>
              <p className="text-stone-400 text-sm leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
