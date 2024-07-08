import { ChangeEvent, useEffect, useState } from 'react';
import { useCharactersStore, useFavoriteCharactersStore } from '../store';

const useCharacterFilter = () => {
  const { charactersOriginal, setCharacters } = useCharactersStore();
  const { filterFavoriteCharacters } = useFavoriteCharactersStore();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (searchText) {
      const filteredCharacters = charactersOriginal.filter((character) =>
        character.name.toLowerCase().includes(searchText.toLowerCase())
      );

      setCharacters(filteredCharacters);
      filterFavoriteCharacters(searchText);
    }
  }, [searchText]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return { handleSearchChange };
};

export default useCharacterFilter;
