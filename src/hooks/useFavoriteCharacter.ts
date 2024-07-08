import { useFavoriteCharactersStore } from '../store/favorite-characters-store';
import { CharacterDetailsType } from '../types';

export const useFavoriteCharacter = (
  character: CharacterDetailsType | null
) => {
  const { favoriteCharacters, addFavoriteCharacter, removeFavoriteCharacter } =
    useFavoriteCharactersStore();

  const isFavoriteCharacter = () => {
    if (!character) return false;
    return !!favoriteCharacters.find(
      (favoriteCharacter) => favoriteCharacter.id === character.id
    );
  };

  const toggleFavorite = () => {
    if (!character) return;
    if (isFavoriteCharacter()) {
      removeFavoriteCharacter(character);
    } else {
      addFavoriteCharacter(character);
    }
  };

  return {
    isFavorite: isFavoriteCharacter(),
    toggleFavorite,
  };
};

export default useFavoriteCharacter;
