import type { Professional, ProfessionalCard as ProfessionalCardType } from '../types';

const PROFESSIONALS_STORAGE_KEY = 'propool_professionals';
const NEXT_PROFESSIONAL_ID_KEY = 'propool_next_prof_id';

// Mock data - base professionals
const mockProfessionals: { [key: string]: Professional } = {
  '1': {
    id: '1',
    user_id: 'user-1',
    name: 'Chioma Okonkwo',
    category: 'beautician',
    location: 'lekki',
    phone: '+2348012345678',
    whatsapp: '+2348012345678',
    bio: 'Professional makeup and hair beautician with over 5 years of experience. Specialized in bridal makeup, weaving, and nails. I deliver quality services with premium products.',
    profile_image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop',
    instagram_link: 'https://instagram.com/chioma_makeup',
    is_approved: true,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  '2': {
    id: '2',
    user_id: 'user-2',
    name: 'Tunde Adeleke',
    category: 'plumber',
    location: 'yaba',
    phone: '+2348023456789',
    whatsapp: '+2348023456789',
    bio: 'Expert plumber with 8 years of experience. Specialized in residential and commercial plumbing. Fast response time and professional service guaranteed.',
    profile_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
    instagram_link: 'https://instagram.com/tunde_plumbing',
    is_approved: true,
    created_at: '2024-01-20T00:00:00Z',
    updated_at: '2024-01-20T00:00:00Z',
  },
  '3': {
    id: '3',
    user_id: 'user-3',
    name: 'Zainab Hassan',
    category: 'writer',
    location: 'ikeja',
    phone: '+2348034567890',
    whatsapp: '+2348034567890',
    bio: 'Content writer and SEO specialist with 6 years experience. I create engaging, informative content for blogs, websites, and social media. Fluent in English and Hausa.',
    profile_image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop',
    instagram_link: 'https://instagram.com/zainab_writes',
    is_approved: true,
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-01-10T00:00:00Z',
  },
  '4': {
    id: '4',
    user_id: 'user-4',
    name: 'Kunle Oladele',
    category: 'electrician',
    location: 'surulere',
    phone: '+2348045678901',
    whatsapp: '+2348045678901',
    bio: 'Licensed electrician with 10 years of experience. Expert in residential wiring, solar installation, and electrical repairs. Licensed and insured professional.',
    profile_image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop',
    instagram_link: 'https://instagram.com/kunle_electric',
    is_approved: true,
    created_at: '2024-01-12T00:00:00Z',
    updated_at: '2024-01-12T00:00:00Z',
  },
  '5': {
    id: '5',
    user_id: 'user-5',
    name: 'Amara Nwosu',
    category: 'tailor',
    location: 'VI',
    phone: '+2348056789012',
    whatsapp: '+2348056789012',
    bio: 'High-end fashion tailor specializing in traditional and contemporary wear. 12 years experience with celebrity clients. Expert in alterations and custom designs.',
    profile_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
    instagram_link: 'https://instagram.com/amara_designs',
    is_approved: true,
    created_at: '2024-01-08T00:00:00Z',
    updated_at: '2024-01-08T00:00:00Z',
  },
  '6': {
    id: '6',
    user_id: 'user-6',
    name: 'Samuel Okoro',
    category: 'beautician',
    location: 'agege',
    phone: '+2348067890123',
    whatsapp: '+2348067890123',
    bio: 'Professional barber and grooming specialist. Expert in contemporary cuts, fades, and traditional shaving. Premium products used for all services.',
    profile_image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop',
    instagram_link: 'https://instagram.com/samuel_barber',
    is_approved: true,
    created_at: '2024-01-05T00:00:00Z',
    updated_at: '2024-01-05T00:00:00Z',
  },
};

// Get next available professional ID
function getNextProfessionalId(): string {
  const nextId = localStorage.getItem(NEXT_PROFESSIONAL_ID_KEY);
  const id = nextId ? parseInt(nextId) : 7; // Start from 7 since mock has 1-6
  localStorage.setItem(NEXT_PROFESSIONAL_ID_KEY, String(id + 1));
  return String(id);
}

// Load professionals from localStorage
export function loadProfessionals(): Professional[] {
  const stored = localStorage.getItem(PROFESSIONALS_STORAGE_KEY);
  const storedProfessionals: { [key: string]: Professional } = stored ? JSON.parse(stored) : {};
  
  // Combine mock data with stored data (stored data takes precedence)
  return Object.values({ ...mockProfessionals, ...storedProfessionals });
}

// Load professionals as cards
export function loadProfessionalCards(): ProfessionalCardType[] {
  const professionals = loadProfessionals();
  return professionals.map((prof) => ({
    id: prof.id,
    name: prof.name,
    category: prof.category as any,
    location: prof.location as any,
    profile_image_url: prof.profile_image_url || '',
    rating: 4.8, // Default rating
    review_count: 0,
  }));
}

// Save a new professional
export function saveProfessional(data: Omit<Professional, 'id' | 'created_at' | 'updated_at'>): Professional {
  const stored = localStorage.getItem(PROFESSIONALS_STORAGE_KEY);
  const storedProfessionals: { [key: string]: Professional } = stored ? JSON.parse(stored) : {};

  const now = new Date().toISOString();
  const id = getNextProfessionalId();

  const professional: Professional = {
    ...data,
    id,
    created_at: now,
    updated_at: now,
  };

  storedProfessionals[id] = professional;
  localStorage.setItem(PROFESSIONALS_STORAGE_KEY, JSON.stringify(storedProfessionals));

  return professional;
}

// Get a specific professional
export function getProfessional(id: string): Professional | null {
  const professionals = loadProfessionals();
  return professionals.find((p) => p.id === id) || null;
}

// Get professional by user ID
export function getProfessionalByUserId(userId: string): Professional | null {
  const professionals = loadProfessionals();
  return professionals.find((p) => p.user_id === userId) || null;
}

// Get all mock professionals
export function getMockProfessionals(): Professional[] {
  return Object.values(mockProfessionals);
}
