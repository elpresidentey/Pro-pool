import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('propool_favorites');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load favorites:', error);
      }
    }
    setLoading(false);
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('propool_favorites', JSON.stringify(favorites));
    }
  }, [favorites, loading]);

  const toggleFavorite = (professionalId: string) => {
    setFavorites((prev) =>
      prev.includes(professionalId)
        ? prev.filter((id) => id !== professionalId)
        : [...prev, professionalId]
    );
  };

  const isFavorite = (professionalId: string) => {
    return favorites.includes(professionalId);
  };

  const addFavorite = (professionalId: string) => {
    if (!favorites.includes(professionalId)) {
      setFavorites((prev) => [...prev, professionalId]);
    }
  };

  const removeFavorite = (professionalId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== professionalId));
  };

  return {
    favorites,
    loading,
    toggleFavorite,
    isFavorite,
    addFavorite,
    removeFavorite,
  };
}
