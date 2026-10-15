import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageSquare, CheckCircle2 } from 'lucide-react';
import { OrderItem, FoodOrder } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  onUpdateQuantity: (menuItemId: string, delta: number) => void;
  onRemoveItem: (menuItemId: string) => void;
  onClearCart: () => void;
  onAddOrder: (order: Omit<FoodOrder, 'id' | 'createdAt' | 'status'>) => void;
  whatsappNumber: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onAddOrder,
  whatsappNumber
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orderType, setOrderType] = useState<'Dine-in' | 'Delivery' | 'Takeaway'>('Delivery');
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0 || !customerName || !phone) return;

    onAddOrder({
      customerName,
      phone,
      address: orderType === 'Delivery' ? address : 'Dine-in at Restaurant',
      items,
      totalAmount,
      orderType
    });

    setOrderPlaced(true);
  };

  const generateWhatsAppOrderLink = () => {
    const itemsList = items.map(i => `- ${i.name} x ${i.quantity} (₹${i.price * i.quantity})`).join('\n');
    const msg = `Hello 1Thar Restaurant,\nI would like to place a new ${orderType} order:\n\n${itemsList}\n\n*Total: ₹${totalAmount}*\n\nCustomer Name: ${customerName}\nPhone: ${phone}\nAddress: ${address || 'Dine-in'}`;
    return `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/80 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-stone-900 border-l border-stone-800 h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif text-stone-100">Your Order Cart</h3>
              <p className="text-xs text-stone-400">{items.reduce((s, i) => s + i.quantity, 0)} items selected</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-800 text-stone-400 hover:text-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {orderPlaced ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-bold font-serif text-stone-100">Order Placed Successfully!</h4>
                <p className="text-stone-300 text-sm">
                  Thank you, <span className="text-amber-400 font-bold">{customerName}</span>. Your {orderType} order of <span className="font-bold">₹{totalAmount}</span> has been saved and registered.
                </p>
              </div>

              <div className="pt-4 space-y-3">
                <a
                  href={generateWhatsAppOrderLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Order via WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    onClearCart();
                    setOrderPlaced(false);
                    onClose();
                  }}
                  className="w-full py-3 rounded-xl bg-stone-800 text-stone-300 hover:bg-stone-700 text-xs font-semibold"
                >
                  Close & Clear Cart
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-800 text-stone-600 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-stone-400 text-sm">Your cart is currently empty.</p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Items List */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.menuItemId}
                    className="flex items-center justify-between bg-stone-950 p-4 rounded-xl border border-stone-800"
                  >
                    <div className="space-y-1 flex-1 pr-3">
                      <h4 className="font-bold text-stone-100 text-sm">{item.name}</h4>
                      <div className="text-xs text-amber-400 font-semibold">₹{item.price} each</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-stone-900 border border-stone-800 rounded-lg">
                        <button
                          onClick={() => onUpdateQuantity(item.menuItemId, -1)}
                          className="p-1.5 text-stone-400 hover:text-stone-200"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-bold text-stone-200">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.menuItemId, 1)}
                          className="p-1.5 text-stone-400 hover:text-stone-200"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.menuItemId)}
                        className="p-2 text-red-400 hover:text-red-300 rounded-lg bg-stone-900 border border-stone-800"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checkout Form */}
              <form onSubmit={handleCheckout} className="space-y-4 pt-4 border-t border-stone-800">
                <h4 className="font-bold text-stone-200 text-sm">Order Details & Checkout</h4>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-stone-400 block mb-1">Order Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Delivery', 'Takeaway', 'Dine-in'] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setOrderType(type)}
                          className={`py-2 rounded-lg text-xs font-bold transition-colors ${
                            orderType === type
                              ? 'bg-amber-500 text-stone-950'
                              : 'bg-stone-950 text-stone-300 border border-stone-800'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-stone-400 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter full name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-stone-400 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {orderType === 'Delivery' && (
                    <div>
                      <label className="text-xs text-stone-400 block mb-1">Delivery Address (Mansarovar / Jaipur) *</label>
                      <textarea
                        rows={2}
                        required
                        placeholder="House / Flat no., Street, Colony..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-stone-100 text-xs focus:outline-none focus:border-amber-500 resize-none"
                      />
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <div className="flex justify-between text-sm font-bold text-stone-200 mb-4 bg-stone-950 p-3 rounded-xl border border-stone-800">
                    <span>Total Amount:</span>
                    <span className="text-amber-400">₹{totalAmount}</span>
                  </div>

                  <div className="space-y-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-lg transition-all"
                    >
                      Place Order (₹{totalAmount})
                    </button>

                    <a
                      href={generateWhatsAppOrderLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Order Directly via WhatsApp</span>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
