export type BookCategory = 
  | 'Self Development'
  | 'Business'
  | 'Psychology'
  | 'Finance'
  | 'Entrepreneurship';

export type BookFormat = 'PDF';

export interface Chapter {
  number: number;
  title: string;
  pages: string;
  excerpt: string;
}

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  authorBio: string;
  authorRole: string;
  priceUSD: number;
  originalPriceUSD: number;
  rating: number;
  reviewsCount: number;
  category: BookCategory;
  formats: BookFormat[];
  pages: number;
  readingTime: string;
  publicationYear: number;
  language: string;
  isbn: string;
  fileSizeBytes: string;
  badge?: 'BESTSELLER' | 'NEW ARRIVAL' | 'TRENDING' | 'STAFF PICK' | 'TOP RATED';
  hasFreeSample: boolean;
  coverGradient: {
    from: string;
    via?: string;
    to: string;
    accent: string;
  };
  coverPattern: string;
  description: string;
  keyTakeaways: string[];
  tableOfContents: Chapter[];
  audioExcerptDuration?: string;
  audioSampleText?: string;
  sampleSnippet: string;
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
  selectedFormat: BookFormat;
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
  purchasedBookIds: string[];
  wishlistIds: string[];
}

export type Currency = 'USD' | 'KES' | 'EUR' | 'GBP';
