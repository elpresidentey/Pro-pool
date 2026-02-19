import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../constants';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables. Check your .env.local file.');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Professional-related queries
export const professionals = {
  getAll: () =>
    supabase
      .from('professionals')
      .select('*, portfolio:portfolio(image_url), reviews:reviews(rating, comment)')
      .eq('is_approved', true),

  getById: (id: string) =>
    supabase
      .from('professionals')
      .select('*, portfolio:portfolio(image_url), reviews:reviews(rating, comment)')
      .eq('id', id)
      .single(),

  search: (query: string, category?: string, location?: string) => {
    let search = supabase
      .from('professionals')
      .select('*')
      .eq('is_approved', true);

    if (category) search = search.eq('category', category);
    if (location) search = search.eq('location', location);

    return search.ilike('name', `%${query}%`);
  },

  create: (data: any) =>
    supabase.from('professionals').insert(data),

  update: (id: string, data: any) =>
    supabase.from('professionals').update(data).eq('id', id),

  delete: (id: string) =>
    supabase.from('professionals').delete().eq('id', id),
};

// Review-related queries
export const reviews = {
  getByProfessional: (professionalId: string) =>
    supabase
      .from('reviews')
      .select('*')
      .eq('professional_id', professionalId),

  create: (data: any) =>
    supabase.from('reviews').insert(data),

  update: (id: string, data: any) =>
    supabase.from('reviews').update(data).eq('id', id),

  delete: (id: string) =>
    supabase.from('reviews').delete().eq('id', id),
};

// Portfolio-related queries
export const portfolio = {
  getByProfessional: (professionalId: string) =>
    supabase
      .from('portfolio')
      .select('*')
      .eq('professional_id', professionalId),

  create: (data: any) =>
    supabase.from('portfolio').insert(data),

  update: (id: string, data: any) =>
    supabase.from('portfolio').update(data).eq('id', id),

  delete: (id: string) =>
    supabase.from('portfolio').delete().eq('id', id),
};
