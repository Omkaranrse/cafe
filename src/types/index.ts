export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category_id: string;
  category_name: string;
  image_url: string;
  is_available: boolean;
  is_featured: boolean;
  dietary_tags: string[];
  allergen_information: string[];
  sort_order: number;
  is_verified: boolean;
  prep_note?: string;
  calories_approx?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  sort_order: number;
}

export interface InstagramPost {
  id: string;
  image_url: string;
  caption: string;
  likes: number;
  comments: number;
  url: string;
  date: string;
}

export interface OpeningHourDay {
  day: string;
  hours: string;
  isToday?: boolean;
}

