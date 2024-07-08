import { create } from 'zustand';
import { CharacterDetailsType } from '../types';

type CharactersStoreState = {
  characters: CharacterDetailsType[];
  charactersOriginal: CharacterDetailsType[];
  setCharacters: (characters: CharacterDetailsType[]) => void;
  setCharactersOriginal: (characters: CharacterDetailsType[]) => void;
  sortCharacters: (order: 'AZ' | 'ZA') => void;
  deleteCharacter: (id: CharacterDetailsType['id']) => void;
  selectedCharacter: CharacterDetailsType | null;
  setSelectedCharacter: (character: CharacterDetailsType | null) => void;
  selectFirstCharacter: () => void;
};

export const useCharactersStore = create<CharactersStoreState>((set, get) => ({
  characters: [],
  charactersOriginal: [],

  setCharacters: (characters: CharacterDetailsType[]) => set({ characters }),

  setCharactersOriginal: (characters: CharacterDetailsType[]) =>
    set({ charactersOriginal: characters }),

  sortCharacters: (order) => {
    const { characters } = get();

    const sortedCharacters = [...characters].sort((a, b) => {
      if (order === 'AZ') {
        return a.name.localeCompare(b.name);
      } else if (order === 'ZA') {
        return b.name.localeCompare(a.name);
      }

      return 0;
    });

    set({ characters: sortedCharacters });
  },

  selectedCharacter: null,

  setSelectedCharacter: (character: CharacterDetailsType | null) =>
    set({ selectedCharacter: character }),

  deleteCharacter(id) {
    const { characters } = get();
    const filteredCharacters = characters.filter(
      (character) => character.id !== id
    );
    set({ characters: filteredCharacters, selectedCharacter: null });
  },

  selectFirstCharacter() {
    const { characters, setSelectedCharacter } = get();
    if (characters.length > 0) {
      setSelectedCharacter(characters[0]);
    }
  },
}));
