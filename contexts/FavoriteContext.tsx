import React, { createContext, useState, useContext } from 'react';

type FavoriteContextType = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};
const FavoriteContext = createContext<FavoriteContextType>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
});

export const FavoriteProvider : React.FC<{ children: React.ReactNode }>= ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (recipeId: string) => {
    setFavorites(prev =>
        prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]     
    );
  };

  const isFavorite = (recipeId: string) => {
    return favorites.includes(recipeId);
  }

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => useContext(FavoriteContext);