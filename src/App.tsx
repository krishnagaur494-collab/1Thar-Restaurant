/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  initialRestaurantInfo,
  initialSections,
  initialMenuItems,
  initialReviews,
  initialReservations,
  initialOrders
} from './data/initialData';
import { RestaurantInfo, SectionConfig, MenuItem, ReviewItem, Reservation, FoodOrder, OrderItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { MenuSection } from './components/MenuSection';
import { AboutSection } from './components/AboutSection';
import { ReservationSection } from './components/ReservationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { VisitSection } from './components/VisitSection';
import { CartDrawer } from './components/CartDrawer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { AdminCMSModal } from './components/AdminCMSModal';
import { Footer } from './components/Footer';

export default function App() {
  const [info, setInfo] = useState<RestaurantInfo>(() => {
    const saved = localStorage.getItem('1thar_info');
    return saved ? JSON.parse(saved) : initialRestaurantInfo;
  });

  const [sections, setSections] = useState<SectionConfig[]>(() => {
    const saved = localStorage.getItem('1thar_sections');
    return saved ? JSON.parse(saved) : initialSections;
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('1thar_menu');
    return saved ? JSON.parse(saved) : initialMenuItems;
  });

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    const saved = localStorage.getItem('1thar_reviews');
    return saved ? JSON.parse(saved) : initialReviews;
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('1thar_reservations');
    return saved ? JSON.parse(saved) : initialReservations;
  });

  const [orders, setOrders] = useState<FoodOrder[]>(() => {
    const saved = localStorage.getItem('1thar_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('1thar_info', JSON.stringify(info));
  }, [info]);

  useEffect(() => {
    localStorage.setItem('1thar_sections', JSON.stringify(sections));
  }, [sections]);

  useEffect(() => {
    localStorage.setItem('1thar_menu', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('1thar_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('1thar_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('1thar_orders', JSON.stringify(orders));
  }, [orders]);

  // Cart Handlers
  const handleAddToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.menuItemId === item.id);
      if (existing) {
        return prev.map(i => i.menuItemId === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { menuItemId: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (menuItemId: string, delta: number) => {
    setCartItems(prev => prev.map(i => {
      if (i.menuItemId === menuItemId) {
        const newQty = i.quantity + delta;
        return newQty > 0 ? { ...i, quantity: newQty } : null;
      }
      return i;
    }).filter(Boolean) as OrderItem[]);
  };

  const handleRemoveItem = (menuItemId: string) => {
    setCartItems(prev => prev.filter(i => i.menuItemId !== menuItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Reservation & Order Handlers
  const handleAddReservation = (res: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => {
    const newRes: Reservation = {
      ...res,
      id: 'res-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Confirmed'
    };
    setReservations(prev => [newRes, ...prev]);
  };

  const handleAddOrder = (ord: Omit<FoodOrder, 'id' | 'createdAt' | 'status'>) => {
    const newOrd: FoodOrder = {
      ...ord,
      id: 'ord-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      status: 'New'
    };
    setOrders(prev => [newOrd, ...prev]);
  };

  const handleAddReview = (rev: Omit<ReviewItem, 'id' | 'date'>) => {
    const newRev: ReviewItem = {
      ...rev,
      id: 'rev-' + Date.now(),
      date: 'Just now'
    };
    setReviews(prev => [newRev, ...prev]);
  };

  const scrollToReservation = () => {
    const el = document.getElementById('reservation');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Sort sections by order and filter enabled ones
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  const renderSection = (id: string) => {
    switch (id) {
      case 'hero':
        return <Hero key={id} info={info} onOpenReservation={scrollToReservation} />;
      case 'features':
        return <Features key={id} />;
      case 'menu':
        return <MenuSection key={id} menuItems={menuItems} onAddToCart={handleAddToCart} whatsappNumber={info.whatsapp} />;
      case 'about':
        return <AboutSection key={id} info={info} />;
      case 'reservation':
        return <ReservationSection key={id} onAddReservation={handleAddReservation} whatsappNumber={info.whatsapp} />;
      case 'reviews':
        return <ReviewsSection key={id} reviews={reviews} onAddReview={handleAddReview} reviewCount={info.reviewCount + reviews.length - initialReviews.length} averageRating={info.rating} />;
      case 'visit':
        return <VisitSection key={id} info={info} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col selection:bg-amber-500 selection:text-stone-950 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Navbar */}
      <Navbar
        info={info}
        cartCount={cartItems.reduce((s, i) => s + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={scrollToReservation}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Sections ordered dynamically by CMS */}
      <main className="flex-1">
        {sortedSections.filter(sec => sec.enabled).map(sec => renderSection(sec.id))}
      </main>

      {/* Footer */}
      <Footer info={info} />

      {/* Floating WhatsApp Widget */}
      <WhatsAppWidget whatsappNumber={info.whatsapp} />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onAddOrder={handleAddOrder}
        whatsappNumber={info.whatsapp}
      />

      {/* Admin CMS & Drag-and-Drop Modal */}
      <AdminCMSModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        info={info}
        onUpdateInfo={setInfo}
        sections={sections}
        onUpdateSections={setSections}
        menuItems={menuItems}
        onAddMenuItem={(item) => setMenuItems(prev => [item, ...prev])}
        onDeleteMenuItem={(id) => setMenuItems(prev => prev.filter(i => i.id !== id))}
        reservations={reservations}
        onUpdateReservationStatus={(id, st) => setReservations(prev => prev.map(r => r.id === id ? { ...r, status: st } : r))}
        orders={orders}
        onUpdateOrderStatus={(id, st) => setOrders(prev => prev.map(o => o.id === id ? { ...o, status: st } : o))}
      />
    </div>
  );
}
