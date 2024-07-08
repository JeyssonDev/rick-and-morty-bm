import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../queries/get-characters';
import { useCharactersStore } from '../store/characters-store';

const useFetchCharacters = () => {
  const { setCharactersOriginal, setCharacters } = useCharactersStore();

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page: 1 },
  });

  useEffect(() => {
    if (data?.characters.results) {
      const charactersList = data.characters.results;
      setCharactersOriginal(charactersList);
      setCharacters(charactersList);
    }
  }, [data, setCharactersOriginal, setCharacters]);

  return { loading, error };
};

export default useFetchCharacters;
