import { MenuItem, ReviewItem, RestaurantInfo, SectionConfig, Reservation, FoodOrder } from '../types';

export const initialRestaurantInfo: RestaurantInfo = {
  name: "1Thar Restaurant",
  hindiName: "1थर रेस्टोरेंट",
  tagline: "Authentic North Indian Flavours & Rooftop Vibe in Mansarovar",
  description: "Located on the 2nd floor near Veer Teja Circle, Patrakar Colony, Mansarovar, Jaipur. Offering comforting North Indian curries, tandoori breads, chinese specials, pizzas and refreshing beverages in a family-friendly atmosphere.",
  address: "2nd Floor, Veer Teja Circle, Patrakar Colony, Mansarovar, Jaipur, Rajasthan 302020",
  phone: "063671 03964",
  whatsapp: "+916367103964",
  email: "contact@1tharrestaurant.com",
  rating: 4.6,
  reviewCount: 398,
  priceRange: "₹200–₹400 per person",
  hours: "11:00 AM – 11:30 PM (Open Daily)",
  zomatoUrl: "https://www.zomato.com/jaipur/1-thar-restaurant-mansarovar",
  swiggyUrl: "https://www.swiggy.com/city/jaipur/1-thar-restaurant-mansarovar-extension-rest1056151",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=1+Thar+Restaurant+Veer+Teja+Circle+Patrakar+Colony+Mansarovar+Jaipur",
  heroImage: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=2000&q=85",
  seoTitle: "1Thar Restaurant | North Indian Dining in Mansarovar Jaipur",
  seoDescription: "Discover 1Thar Restaurant in Patrakar Colony, Mansarovar, Jaipur. Enjoy North Indian food, snacks, pizza, online ordering and table reservations."
};

export const initialSections: SectionConfig[] = [
  { id: 'hero', title: 'Hero Banner', enabled: true, order: 1 },
  { id: 'features', title: 'Why Choose Us', enabled: true, order: 2 },
  { id: 'menu', title: 'Menu & Specialities', enabled: true, order: 3 },
  { id: 'about', title: 'About & Location Story', enabled: true, order: 4 },
  { id: 'gallery', title: 'Photo Gallery', enabled: false, order: 5 },
  { id: 'reservation', title: 'Table Reservation', enabled: true, order: 6 },
  { id: 'reviews', title: 'Customer Reviews', enabled: true, order: 7 },
  { id: 'visit', title: 'Find Us & Directions', enabled: true, order: 8 },
];

export const initialMenuItems: MenuItem[] = [
  {
    id: 'm1',
    name: 'Kadhai Paneer',
    category: 'Mains',
    price: 260,
    description: 'Succulent cottage cheese cubes tossed with freshly ground spices, bell peppers and rich tomato gravy.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=85',
    isPopular: true,
    isVegetarian: true,
    spicyLevel: 2
  },
  {
    id: 'm2',
    name: 'Paneer Butter Masala',
    category: 'Mains',
    price: 280,
    description: 'Soft paneer cubes simmered in a velvety, buttery tomato-cashew gravy with a touch of cream and fenugreek.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=900&q=85',
    isPopular: true,
    isVegetarian: true,
    spicyLevel: 1
  },
  {
    id: 'm3',
    name: 'Dal Makhani',
    category: 'Mains',
    price: 220,
    description: 'Whole black lentils and kidney beans simmered overnight on a slow charcoal fire with butter and cream.',
    image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c4?auto=format&fit=crop&w=900&q=85',
    isPopular: true,
    isVegetarian: true,
    spicyLevel: 1
  },
  {
    id: 'm4',
    name: 'Butter Naan & Garlic Naan',
    category: 'Breads',
    price: 50,
    description: 'Fresh tandoor-baked leavened bread brushed with melting butter or minced garlic and coriander.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=900&q=85',
    isVegetarian: true
  },
  {
    id: 'm5',
    name: 'Tandoori Roti',
    category: 'Breads',
    price: 20,
    description: 'Traditional whole wheat bread baked to perfection in a clay tandoor oven.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=85',
    isVegetarian: true
  },
  {
    id: 'm6',
    name: 'Pav Bhaji',
    category: 'Starters',
    price: 140,
    description: 'Spiced mashed vegetable curry served with butter-toasted soft bread rolls, chopped onions and lemon.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85',
    isPopular: true,
    isVegetarian: true,
    spicyLevel: 2
  },
  {
    id: 'm7',
    name: 'Veg Spring Roll',
    category: 'Starters',
    price: 160,
    description: 'Crispy golden fried rolls stuffed with seasoned julienned vegetables, served with tangy schezwan dip.',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=900&q=85',
    isVegetarian: true
  },
  {
    id: 'm8',
    name: 'Chilli Paneer Dry',
    category: 'Starters',
    price: 240,
    description: 'Batter-fried paneer cubes tossed with bell peppers, spring onions, soy sauce and green chilli paste.',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=900&q=85',
    isPopular: true,
    isVegetarian: true,
    spicyLevel: 3
  },
  {
    id: 'm9',
    name: 'Veg Loaded Supreme Pizza',
    category: 'Fast Food',
    price: 250,
    description: 'Hand-tossed crust topped with gooey mozzarella cheese, sweet corn, bell peppers, olives and jalapenos.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85',
    isVegetarian: true
  },
  {
    id: 'm10',
    name: 'Virgin Mojito',
    category: 'Beverages',
    price: 130,
    description: 'Refreshing cooling cooler made with fresh mint leaves, lime juice, sugar syrup and sparkling soda.',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85',
    isPopular: true,
    isVegetarian: true
  },
  {
    id: 'm11',
    name: 'Cold Coffee with Ice Cream',
    category: 'Beverages',
    price: 140,
    description: 'Blended creamy cold coffee topped with a rich scoop of vanilla ice cream and chocolate drizzle.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=900&q=85',
    isVegetarian: true
  }
];

export const initialReviews: ReviewItem[] = [
  {
    id: 'r1',
    author: 'Kapil Kulhar',
    rating: 5,
    date: '3 months ago',
    comment: 'Great staff and owner very humble and helpful, lovely food at great prices. Wonderful ambiance in Mansarovar!',
    tag: 'Local Guide',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'r2',
    author: 'Manish Nirmal',
    rating: 5,
    date: '5 months ago',
    comment: 'Best place for family dinner or parties and very soothing rooftop atmosphere! Loved the Paneer Butter Masala.',
    tag: 'Local Guide',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'r3',
    author: 'Priya Sharma',
    rating: 4.5,
    date: '1 month ago',
    comment: 'Serving staff behaviour and service is also good. Very convenient location near Veer Teja Circle.',
    tag: 'Dine-in Customer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
  }
];

export const initialReservations: Reservation[] = [
  {
    id: 'res-1',
    name: 'Rahul Verma',
    phone: '+91 98765 43210',
    guests: 4,
    date: '2026-10-20',
    time: '20:00',
    specialRequests: 'Rooftop table preferred for family birthday dinner.',
    status: 'Confirmed',
    createdAt: '2026-10-14'
  }
];

export const initialOrders: FoodOrder[] = [
  {
    id: 'ord-1',
    customerName: 'Amit Joshi',
    phone: '+91 91234 56789',
    address: 'Patrakar Colony, Mansarovar, Jaipur',
    items: [
      { menuItemId: 'm1', name: 'Kadhai Paneer', price: 260, quantity: 1 },
      { menuItemId: 'm4', name: 'Butter Naan & Garlic Naan', price: 50, quantity: 3 }
    ],
    totalAmount: 410,
    orderType: 'Delivery',
    status: 'Completed',
    createdAt: '2026-10-14'
  }
];
