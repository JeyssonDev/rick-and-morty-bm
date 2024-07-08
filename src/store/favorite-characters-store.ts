import { create } from 'zustand';
import { CharacterDetailsType } from '../types';

type FavoriteCharactersState = {
  favoriteCharactersOriginal: CharacterDetailsType[];
  favoriteCharacters: CharacterDetailsType[];
  addFavoriteCharacter: (favorite: CharacterDetailsType) => void;
  updateFavoriteCharacter: (updatedCharacter: CharacterDetailsType) => void;
  removeFavoriteCharacter: (favorite: CharacterDetailsType) => void;
  addFavoriteArrayCharacter: (
    favoriteCharacters: CharacterDetailsType[]
  ) => void;
  filterFavoriteCharacters: (searchText: string) => void;
  sortFavoriteCharacters: (order: 'AZ' | 'ZA') => void;
};

export const useFavoriteCharactersStore = create<FavoriteCharactersState>(
  (set, get) => ({
    favoriteCharactersOriginal: [],
    favoriteCharacters: [],

    addFavoriteCharacter: (favoriteCharacter: CharacterDetailsType) => {
      set((state) => {
        if (
          !state.favoriteCharacters.some(
            (char) => char.id === favoriteCharacter.id
          )
        ) {
          const updatedCharacter = { ...favoriteCharacter, isFavorite: true };
          return {
            favoriteCharacters: [...state.favoriteCharacters, updatedCharacter],
            favoriteCharactersOriginal: [
              ...state.favoriteCharactersOriginal,
              updatedCharacter,
            ],
          };
        }
        return state;
      });
    },

    updateFavoriteCharacter: (updatedCharacter) => {
      set((state) => {
        const updateCharacterInArray = (characters: CharacterDetailsType[]) =>
          characters.map((char) =>
            char.id === updatedCharacter.id ? updatedCharacter : char
          );

        return {
          favoriteCharacters: updateCharacterInArray(state.favoriteCharacters),
          favoriteCharactersOriginal: updateCharacterInArray(
            state.favoriteCharactersOriginal
          ),
        };
      });
    },

    addFavoriteArrayCharacter: (favoriteCharacters) => {
      set(() => ({
        favoriteCharacters: favoriteCharacters,
        favoriteCharactersOriginal: favoriteCharacters,
      }));
    },

    removeFavoriteCharacter: (favoriteCharacter) => {
      set((state) => ({
        favoriteCharacters: state.favoriteCharacters.filter(
          (char) => char.id !== favoriteCharacter.id
        ),
        favoriteCharactersOriginal: state.favoriteCharactersOriginal.filter(
          (char) => char.id !== favoriteCharacter.id
        ),
      }));
    },

    filterFavoriteCharacters: (searchText) => {
      const { favoriteCharactersOriginal } = get();
      set(() => ({
        favoriteCharacters: searchText
          ? favoriteCharactersOriginal.filter((char) =>
              char.name.toLowerCase().includes(searchText.toLowerCase())
            )
          : favoriteCharactersOriginal,
      }));
    },

    sortFavoriteCharacters: (order) => {
      const { favoriteCharacters } = get();

      const sortedCharacters = [...favoriteCharacters].sort((a, b) => {
        if (order === 'AZ') {
          return a.name.localeCompare(b.name);
        } else if (order === 'ZA') {
          return b.name.localeCompare(a.name);
        }

        return 0;
      });

      set({ favoriteCharacters: sortedCharacters });
    },
  })
);
