import React, { useState } from 'react';
import { X, Settings, Layout, Utensils, Calendar, ShoppingBag, Globe, ArrowUp, ArrowDown, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { RestaurantInfo, SectionConfig, MenuItem, Reservation, FoodOrder } from '../types';

interface AdminCMSModalProps {
  isOpen: boolean;
  onClose: () => void;
  info: RestaurantInfo;
  onUpdateInfo: (newInfo: RestaurantInfo) => void;
  sections: SectionConfig[];
  onUpdateSections: (newSections: SectionConfig[]) => void;
  menuItems: MenuItem[];
  onAddMenuItem: (item: MenuItem) => void;
  onDeleteMenuItem: (id: string) => void;
  reservations: Reservation[];
  onUpdateReservationStatus: (id: string, status: Reservation['status']) => void;
  orders: FoodOrder[];
  onUpdateOrderStatus: (id: string, status: FoodOrder['status']) => void;
}

export const AdminCMSModal: React.FC<AdminCMSModalProps> = ({
  isOpen,
  onClose,
  info,
  onUpdateInfo,
  sections,
  onUpdateSections,
  menuItems,
  onAddMenuItem,
  onDeleteMenuItem,
  reservations,
  onUpdateReservationStatus,
  orders,
  onUpdateOrderStatus
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'sections' | 'menu' | 'reservations' | 'orders' | 'seo'>('info');

  // Info state
  const [formData, setFormData] = useState<RestaurantInfo>(info);

  // New menu item state
  const [newItemName, setNewItemName] = useState('');
  const [newItemCat, setNewItemCat] = useState<MenuItem['category']>('Mains');
  const [newItemPrice, setNewItemPrice] = useState(250);
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemImg, setNewItemImg] = useState('https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=85');
  const [newItemVeg, setNewItemVeg] = useState(true);
  const [newItemPopular, setNewItemPopular] = useState(false);

  if (!isOpen) return null;

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateInfo(formData);
    alert('Restaurant details updated successfully!');
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;

    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    // reassign order numbers
    newSections.forEach((sec, idx) => { sec.order = idx + 1; });
    onUpdateSections(newSections);
  };

  const handleToggleSection = (id: string) => {
    const newSections = sections.map(sec => sec.id === id ? { ...sec, enabled: !sec.enabled } : sec);
    onUpdateSections(newSections);
  };

  const handleCreateMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName) return;

    const item: MenuItem = {
      id: 'menu-' + Date.now(),
      name: newItemName,
      category: newItemCat,
      price: newItemPrice,
      description: newItemDesc,
      image: newItemImg,
      isVegetarian: newItemVeg,
      isPopular: newItemPopular
    };

    onAddMenuItem(item);
    setNewItemName('');
    setNewItemDesc('');
    alert('New dish added to the menu successfully!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-fadeIn">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-5xl w-full h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-800 flex items-center justify-between bg-stone-950">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Settings className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif text-stone-100">Drag-and-Drop CMS & Admin Dashboard</h2>
              <p className="text-xs text-stone-400">Manage 1Thar Restaurant content, layout, orders & reservations</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-stone-800 text-stone-400 hover:text-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 px-6 pt-4 bg-stone-950 border-b border-stone-800 overflow-x-auto no-scrollbar">
          {[
            { id: 'info', label: 'Restaurant Info', icon: <Settings className="w-4 h-4" /> },
            { id: 'sections', label: 'Layout & Sections', icon: <Layout className="w-4 h-4" /> },
            { id: 'menu', label: 'Menu Items', icon: <Utensils className="w-4 h-4" /> },
            { id: 'reservations', label: `Table Bookings (${reservations.length})`, icon: <Calendar className="w-4 h-4" /> },
            { id: 'orders', label: `Food Orders (${orders.length})`, icon: <ShoppingBag className="w-4 h-4" /> },
            { id: 'seo', label: 'SEO Optimizer', icon: <Globe className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-amber-500 text-amber-400 bg-stone-900/50'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-stone-900">
          
          {/* TAB 1: INFO */}
          {activeTab === 'info' && (
            <form onSubmit={handleInfoSubmit} className="space-y-6 max-w-3xl mx-auto">
              <div className="space-y-2">
                <h3 className="text-lg font-bold font-serif text-stone-100">Restaurant Details & Branding</h3>
                <p className="text-xs text-stone-400">Update restaurant name, phone, WhatsApp number, and address.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-stone-400 font-semibold">Restaurant Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-stone-400 font-semibold">Hindi Name</label>
                  <input
                    type="text"
                    value={formData.hindiName}
                    onChange={(e) => setFormData({ ...formData, hindiName: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs text-stone-400 font-semibold">Tagline</label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-stone-400 font-semibold">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-stone-400 font-semibold">WhatsApp Number (with country code)</label>
                  <input
                    type="text"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs text-stone-400 font-semibold">Full Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs text-stone-400 font-semibold">Hero Banner Image URL</label>
                  <input
                    type="text"
                    value={formData.heroImage}
                    onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs text-stone-400 font-semibold">Restaurant Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-lg transition-all"
              >
                Save Restaurant Changes
              </button>
            </form>
          )}

          {/* TAB 2: SECTIONS (Drag and drop / reorder) */}
          {activeTab === 'sections' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="space-y-2">
                <h3 className="text-lg font-bold font-serif text-stone-100">Layout & Section Management</h3>
                <p className="text-xs text-stone-400">Reorder website sections or toggle them on/off instantly.</p>
              </div>

              <div className="space-y-3">
                {sections.map((sec, idx) => (
                  <div
                    key={sec.id}
                    className="flex items-center justify-between bg-stone-950 p-4 rounded-xl border border-stone-800"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-stone-900 border border-stone-800 text-stone-400 flex items-center justify-center text-xs font-bold">
                        {sec.order}
                      </span>
                      <span className="font-bold text-stone-200 text-sm">{sec.title}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleMoveSection(idx, 'up')}
                        disabled={idx === 0}
                        className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 disabled:opacity-30"
                        title="Move Up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleMoveSection(idx, 'down')}
                        disabled={idx === sections.length - 1}
                        className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 disabled:opacity-30"
                        title="Move Down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleToggleSection(sec.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          sec.enabled
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-stone-800 text-stone-500'
                        }`}
                      >
                        {sec.enabled ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MENU */}
          {activeTab === 'menu' && (
            <div className="space-y-8">
              <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800 space-y-4">
                <h3 className="font-bold font-serif text-stone-100 text-base">Add New Menu Item</h3>
                <form onSubmit={handleCreateMenuItem} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Dish Name (e.g., Paneer Tikka)"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="bg-stone-900 border border-stone-800 rounded-xl px-3 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                  />

                  <select
                    value={newItemCat}
                    onChange={(e) => setNewItemCat(e.target.value as any)}
                    className="bg-stone-900 border border-stone-800 rounded-xl px-3 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Mains">Mains</option>
                    <option value="Breads">Breads</option>
                    <option value="Starters">Starters</option>
                    <option value="Fast Food">Fast Food</option>
                    <option value="Beverages">Beverages</option>
                  </select>

                  <input
                    type="number"
                    required
                    placeholder="Price in ₹ (e.g., 250)"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(Number(e.target.value))}
                    className="bg-stone-900 border border-stone-800 rounded-xl px-3 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                  />

                  <input
                    type="text"
                    placeholder="Image URL"
                    value={newItemImg}
                    onChange={(e) => setNewItemImg(e.target.value)}
                    className="bg-stone-900 border border-stone-800 rounded-xl px-3 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500 sm:col-span-2"
                  />

                  <input
                    type="text"
                    placeholder="Short description"
                    value={newItemDesc}
                    onChange={(e) => setNewItemDesc(e.target.value)}
                    className="bg-stone-900 border border-stone-800 rounded-xl px-3 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500 sm:col-span-3"
                  />

                  <div className="sm:col-span-3 flex items-center justify-between pt-2">
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 text-xs text-stone-300">
                        <input
                          type="checkbox"
                          checked={newItemVeg}
                          onChange={(e) => setNewItemVeg(e.target.checked)}
                          className="rounded bg-stone-900 border-stone-800"
                        /> Pure Vegetarian
                      </label>
                      <label className="flex items-center gap-2 text-xs text-stone-300">
                        <input
                          type="checkbox"
                          checked={newItemPopular}
                          onChange={(e) => setNewItemPopular(e.target.checked)}
                          className="rounded bg-stone-900 border-stone-800"
                        /> Mark as Bestseller
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow"
                    >
                      Add Dish to Menu
                    </button>
                  </div>
                </form>
              </div>

              {/* Menu items list */}
              <div className="space-y-3">
                <h4 className="font-bold text-stone-200 text-sm">Existing Menu ({menuItems.length} items)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                  {menuItems.map((item) => (
                    <div key={item.id} className="bg-stone-950 p-4 rounded-xl border border-stone-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <div className="font-bold text-stone-100 text-sm">{item.name}</div>
                          <div className="text-xs text-amber-400 font-semibold">{item.category} · ₹{item.price}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => onDeleteMenuItem(item.id)}
                        className="p-2 text-red-400 hover:text-red-300 rounded-lg bg-stone-900 border border-stone-800"
                        title="Delete Dish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: RESERVATIONS */}
          {activeTab === 'reservations' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold font-serif text-stone-100">Table Bookings & Reservations</h3>
              {reservations.length === 0 ? (
                <p className="text-stone-400 text-sm py-12 text-center">No table reservations recorded yet.</p>
              ) : (
                <div className="space-y-4">
                  {reservations.map((res) => (
                    <div key={res.id} className="bg-stone-950 p-6 rounded-2xl border border-stone-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-stone-100 text-base">{res.name} ({res.phone})</div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          res.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {res.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-stone-400">
                        <div>Guests: <strong className="text-stone-200">{res.guests}</strong></div>
                        <div>Date: <strong className="text-stone-200">{res.date}</strong></div>
                        <div>Time: <strong className="text-stone-200">{res.time}</strong></div>
                        <div>Booked on: <strong className="text-stone-200">{res.createdAt}</strong></div>
                      </div>
                      {res.specialRequests && (
                        <p className="text-xs text-stone-300 italic bg-stone-900 p-3 rounded-xl border border-stone-800">
                          Note: {res.specialRequests}
                        </p>
                      )}
                      <div className="pt-2 flex gap-2">
                        {(['Confirmed', 'Completed', 'Cancelled'] as const).map((st) => (
                          <button
                            key={st}
                            onClick={() => onUpdateReservationStatus(res.id, st)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold ${
                              res.status === st ? 'bg-amber-500 text-stone-950' : 'bg-stone-900 text-stone-300 border border-stone-800'
                            }`}
                          >
                            Mark {st}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold font-serif text-stone-100">Customer Food Orders</h3>
              {orders.length === 0 ? (
                <p className="text-stone-400 text-sm py-12 text-center">No food orders placed yet.</p>
              ) : (
                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div key={ord.id} className="bg-stone-950 p-6 rounded-2xl border border-stone-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-stone-100 text-base">{ord.customerName} ({ord.phone})</div>
                          <div className="text-xs text-amber-400">{ord.orderType} · ₹{ord.totalAmount}</div>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400">
                          {ord.status}
                        </span>
                      </div>

                      <div className="bg-stone-900 p-3 rounded-xl border border-stone-800 space-y-1">
                        <div className="text-xs font-bold text-stone-300 mb-1">Ordered Items:</div>
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="text-xs text-stone-400 flex justify-between">
                            <span>{it.name} x {it.quantity}</span>
                            <span>₹{it.price * it.quantity}</span>
                          </div>
                        ))}
                      </div>

                      <div className="text-xs text-stone-400">Address: <span className="text-stone-200">{ord.address}</span></div>

                      <div className="pt-2 flex gap-2">
                        {(['New', 'Preparing', 'Out for Delivery', 'Completed'] as const).map((st) => (
                          <button
                            key={st}
                            onClick={() => onUpdateOrderStatus(ord.id, st)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold ${
                              ord.status === st ? 'bg-amber-500 text-stone-950' : 'bg-stone-900 text-stone-300 border border-stone-800'
                            }`}
                          >
                            Mark {st}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: SEO */}
          {activeTab === 'seo' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="space-y-2">
                <h3 className="text-lg font-bold font-serif text-stone-100">Built-in SEO & Search Preview</h3>
                <p className="text-xs text-stone-400">Optimize search engine snippet, title tags, and description for Google ranking in Mansarovar Jaipur.</p>
              </div>

              <div className="space-y-4 bg-stone-950 p-6 rounded-2xl border border-stone-800">
                <div className="space-y-1">
                  <label className="text-xs text-stone-400 font-semibold">SEO Title</label>
                  <input
                    type="text"
                    value={formData.seoTitle}
                    onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-stone-400 font-semibold">Meta Description</label>
                  <textarea
                    rows={3}
                    value={formData.seoDescription}
                    onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-stone-900 space-y-2">
                  <div className="text-xs font-bold text-stone-300 uppercase tracking-wider">Google Search Preview</div>
                  <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 space-y-1">
                    <div className="text-blue-400 text-sm font-medium hover:underline cursor-pointer">{formData.seoTitle}</div>
                    <div className="text-emerald-500 text-xs">https://ais-dev-ju3ohjksusnfwqtwjzv5qe-240197168898.asia-southeast1.run.app</div>
                    <div className="text-stone-400 text-xs leading-relaxed">{formData.seoDescription}</div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onUpdateInfo(formData);
                    alert('SEO settings saved successfully!');
                  }}
                  className="py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow"
                >
                  Save SEO Settings
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
