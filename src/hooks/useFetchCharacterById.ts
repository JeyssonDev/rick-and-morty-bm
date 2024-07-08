import { useQuery } from '@apollo/client';
import { GET_CHARACTER_BYID } from '../queries/get-character-byid';
import { useCharactersStore } from '../store/characters-store';
import { useEffect } from 'react';

const useFetchCharacterById = (id: string | undefined) => {
  const { setSelectedCharacter } = useCharactersStore();

  const { loading, error, data } = useQuery(GET_CHARACTER_BYID, {
    variables: { id },
    skip: !id,
  });

  useEffect(() => {
    if (data?.character) {
      setSelectedCharacter(data.character);
    }
  }, [data, setSelectedCharacter]);

  return { loading, error };
};

export default useFetchCharacterById;
