import { useEffect, useState } from 'react';
import { CharacterDetailsType } from '../types';
import { useCharactersStore, useFavoriteCharactersStore } from '../store';

export const useCharacterComments = (id: string | undefined) => {
  const [characterDetail, setCharacterDetail] = useState<
    CharacterDetailsType | undefined
  >(undefined);
  const { characters, setCharacters, setCharactersOriginal } =
    useCharactersStore();
  const { favoriteCharacters, updateFavoriteCharacter } =
    useFavoriteCharactersStore();

  useEffect(() => {
    if (id) {
      const characterChoosed = characters.find(
        (character) => character.id === id
      );
      const favoritesChoosed = favoriteCharacters.find(
        (character) => character.id === id
      );
      if (favoritesChoosed) {
        setCharacterDetail(favoritesChoosed);
        return;
      }
      setCharacterDetail(characterChoosed);
    }
  }, [characters, id, favoriteCharacters]);

  const addCommentToCharacter = (comment: string) => {
    if (id) {
      const characterChoosed = characters.find(
        (character) => character.id === id
      );
      const favoritesChoosed = favoriteCharacters.find(
        (character) => character.id === id
      );
      if (characterChoosed) {
        const updatedCharacter = {
          ...characterChoosed,
          comments: [
            ...(characterChoosed.comments || []),
            {
              id: Date.now(),
              comment,
            },
          ],
        };
        const updatedCharacters = characters.map((character) =>
          character.id === id ? updatedCharacter : character
        );
        setCharacters(updatedCharacters);
        setCharactersOriginal(updatedCharacters);

        if (favoritesChoosed) {
          updateFavoriteCharacter({
            ...favoritesChoosed,
            comments: [
              ...(favoritesChoosed.comments || []),
              {
                id: Date.now(),
                comment,
              },
            ],
          });
        }
      }
    }
  };

  return {
    characterDetail,
    addCommentToCharacter,
  };
};
