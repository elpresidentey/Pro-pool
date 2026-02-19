export type UserRole = 'professional' | 'client';

export interface User {
  id: string;
  email?: string;
  role?: UserRole;
  created_at?: string;
}

export interface Professional {
  id: string;
  user_id: string;
  name: string;
  category: Category;
  location: Location;
  phone: string;
  whatsapp: string;
  bio: string;
  profile_image_url: string;
  instagram_link?: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface PortfolioImage {
  id: string;
  professional_id: string;
  image_url: string;
  created_at: string;
}

export interface Review {
  id: string;
  professional_id: string;
  user_id: string;
  rating: number;
  comment?: string;
  created_at: string;
}

export type Category = 'beautician' | 'writer' | 'plumber' | 'electrician' | 'tailor';

export type Location = 'lekki' | 'yaba' | 'ikeja' | 'surulere' | 'VI' | 'agege';

export interface ProfessionalCard {
  id: string;
  name: string;
  category: Category;
  location: Location;
  profile_image_url: string;
  rating: number;
  review_count: number;
}
