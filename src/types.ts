export type ProductCategory = 
  | 'Headphones' 
  | 'Earbuds' 
  | 'Speakers' 
  | 'Power Banks' 
  | 'Charging Cables';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  colors: ProductColor[];
  description: string;
  specs: { [key: string]: string };
  features: string[];
  isBestSeller?: boolean;
  isNew?: boolean;
  model3DType: 'headphones' | 'earbuds' | 'speaker' | 'powerbank' | 'cable';
}

export interface CategoryInfo {
  id: ProductCategory;
  title: string;
  description: string;
  itemCount: number;
  image: string;
  accentColor: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  productName: string;
  verified: boolean;
}

export interface WhyUsFeature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Products' | 'Shipping' | 'Warranty';
}

export interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  tag: string;
}
