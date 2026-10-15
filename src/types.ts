export interface MenuItem {
  id: string;
  name: string;
  category: 'Mains' | 'Breads' | 'Starters' | 'Fast Food' | 'Beverages';
  price: number;
  description: string;
  image: string;
  isPopular?: boolean;
  isVegetarian?: boolean;
  spicyLevel?: 1 | 2 | 3;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  tag?: string;
  avatar?: string;
}

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  specialRequests?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface FoodOrder {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: OrderItem[];
  totalAmount: number;
  orderType: 'Dine-in' | 'Delivery' | 'Takeaway';
  status: 'New' | 'Preparing' | 'Out for Delivery' | 'Completed';
  createdAt: string;
}

export interface SectionConfig {
  id: string;
  title: string;
  enabled: boolean;
  order: number;
}

export interface RestaurantInfo {
  name: string;
  hindiName: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  hours: string;
  zomatoUrl: string;
  swiggyUrl: string;
  mapsUrl: string;
  heroImage: string;
  seoTitle: string;
  seoDescription: string;
}
