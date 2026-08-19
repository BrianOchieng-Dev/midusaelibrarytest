export type BookCategory = 
  | 'Self Development'
  | 'Business'
  | 'Psychology'
  | 'Finance'
  | 'Entrepreneurship';

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  priceKES: number; // Flat 100 KSh
  originalPriceKES: number;
  rating: number;
  reviewsCount: number;
  category: BookCategory;
  pages: number;
  fileSize: string;
  coverGradient: {
    from: string;
    via?: string;
    to: string;
    accent: string;
  };
  coverPattern: string;
  description: string;
  keyTakeaways: string[];
}

export interface CategoryInfo {
  id: string;
  name: BookCategory;
  slug: string;
  iconName: string;
  count: number;
  description: string;
  accentColor: string;
  gradient: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
  bookTitle: string;
  date: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: 'google' | 'facebook' | 'email';
}
