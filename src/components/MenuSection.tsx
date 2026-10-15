import React, { useState } from 'react';
import { Search, Plus, Check, MessageSquare, Flame } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuSectionProps {
  menuItems: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
  whatsappNumber: string;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  menuItems,
  onAddToCart,
  whatsappNumber
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = ['All', 'Mains', 'Breads', 'Starters', 'Fast Food', 'Beverages'];

  const filteredItems = menuItems.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleAddWithFeedback = (item: MenuItem) => {
    onAddToCart(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section id="menu" className="py-24 bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="text-amber-400 text-xs font-bold uppercase tracking-widest">Our Delicious Offerings</div>
            <h2 className="text-3xl sm:text-5xl font-black font-serif text-stone-100">
              Explore the Menu
            </h2>
            <p className="text-stone-400 text-sm sm:text-base max-w-xl">
              Freshly prepared North Indian delicacies, tandoori items, Chinese starters, and refreshing beverages crafted with love.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
            <input
              type="text"
              placeholder="Search dishes (e.g. Paneer)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-10 pr-4 py-3 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/20'
                  : 'bg-stone-900 text-stone-300 border border-stone-800 hover:border-stone-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-stone-900/40 rounded-2xl border border-stone-800">
            <p className="text-stone-400 text-base">No matching menu items found.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-3 text-amber-400 text-xs font-bold underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-stone-900 rounded-2xl p-6 border border-stone-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">{item.category}</span>
                    <div className="flex items-center gap-2">
                      {item.isPopular && (
                        <span className="inline-flex items-center gap-1 text-xs font-black bg-amber-500/20 text-amber-400 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                          <Flame className="w-3.5 h-3.5 fill-amber-400" /> Bestseller
                        </span>
                      )}
                      {item.isVegetarian && (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                          🟢 Pure Veg
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-xl font-bold font-serif text-stone-100 group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </h3>
                    <div className="text-amber-400 font-black text-lg">
                      ₹{item.price}
                    </div>
                  </div>

                  <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-3 border-t border-stone-800/80">
                  <button
                    onClick={() => handleAddWithFeedback(item)}
                    className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                      addedId === item.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-lg shadow-amber-500/10'
                    }`}
                  >
                    {addedId === item.id ? (
                      <>
                        <Check className="w-4 h-4" /> Added to Cart
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" /> Add to Order
                      </>
                    )}
                  </button>

                  <a
                    href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi,%20I%20would%20like%20to%20order%20*${encodeURIComponent(item.name)}*%20(₹${item.price})%20from%201Thar%20Restaurant.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-emerald-400 border border-stone-700 transition-colors"
                    title="Order via WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center bg-stone-900/40 p-8 rounded-2xl border border-stone-800 max-w-3xl mx-auto">
          <p className="text-stone-400 text-xs sm:text-sm mb-4">
            Looking for Zomato or Swiggy online food delivery? You can order directly on delivery platforms as well.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.zomato.com/jaipur/1-thar-restaurant-mansarovar/menu"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm transition-colors"
            >
              Order on Zomato ↗
            </a>
            <a
              href="https://www.swiggy.com/city/jaipur/1-thar-restaurant-mansarovar-extension-rest1056151"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm transition-colors"
            >
              Order on Swiggy ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
