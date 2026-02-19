import type { Category, Location } from '../types';

export const CATEGORIES: Record<Category, string> = {
  beautician: 'Beautician',
  writer: 'Writer & Content Creator',
  plumber: 'Plumber',
  electrician: 'Electrician',
  tailor: 'Tailor / Fashion Designer',
};

export const LOCATIONS: Record<Location, string> = {
  lekki: 'Lekki',
  yaba: 'Yaba',
  ikeja: 'Ikeja',
  surulere: 'Surulere',
  VI: 'Victoria Island',
  agege: 'Agege',
};

export const CATEGORY_LIST: Category[] = ['beautician', 'writer', 'plumber', 'electrician', 'tailor'];

export const LOCATION_LIST: Location[] = ['lekki', 'yaba', 'ikeja', 'surulere', 'VI', 'agege'];

export const COLORS = {
  charcoal: '#1E1E1E',
  electricBlue: '#6B9DFF',
  electricBlueHover: '#5A8EFF',
  white: '#FFFFFF',
  backgroundSecondary: '#F4F6F8',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
};

export const APP_NAME = 'Pro Pool';
export const APP_TAGLINE = 'Find Trusted Professionals Near You';

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
