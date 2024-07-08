import { useEffect, useState } from 'react';
import SortIcon from '../../../src/assets/icons/SortIcon.png';
import {
  useCharactersStore,
  useFavoriteCharactersStore,
  useIsMobileStore,
} from '../../store';
import { CharacterDetailsType } from '../../types';
import CharacterItem from '../ui/CharacterItem/CharacterItem';
import { A_Z, SORT, STARRED_CHARACTERS } from '../../utils/constanst';
import { useNavigate } from 'react-router-dom';

type CharacterListProps = {
  title: string;
  characters?: CharacterDetailsType[];
};

const CharacterList = ({ title, characters }: CharacterListProps) => {
  const [isSorted, setIsSorted] = useState(false);
  const { sortFavoriteCharacters } = useFavoriteCharactersStore();
  const { sortCharacters, selectFirstCharacter, selectedCharacter } =
    useCharactersStore();
  const navigate = useNavigate();
  const { isMobile } = useIsMobileStore();

  useEffect(() => {
    if (
      !selectedCharacter &&
      characters &&
      characters.length > 0 &&
      !isMobile
    ) {
      selectFirstCharacter();
      navigate(`/character-detail/${characters && characters[0]?.id}`);
    }
  }, [selectedCharacter, characters, selectFirstCharacter, navigate, isMobile]);

  const handleSort = () => {
    if (characters && characters.length > 0) {
      if (title === STARRED_CHARACTERS) {
        sortFavoriteCharacters(isSorted ? 'ZA' : 'AZ');
      } else {
        sortCharacters(isSorted ? 'ZA' : 'AZ');
      }
      setIsSorted((prevState) => !prevState);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h3 className="text-left py-6 text-xs leading-4 font-semibold tracking-wider text-[#6B7280]">
          {title} ({characters?.length})
        </h3>
        <button className="flex items-center" onClick={handleSort}>
          <img
            className={`${!isSorted ? 'rotate-190' : '-rotate-180'} w-[25px]`}
            src={SortIcon}
            alt={SORT}
          />
          <span className="text-[13px] -mb-2 text-[#6B7280]">{A_Z}</span>
        </button>
      </div>
      {characters?.map((character) => (
        <CharacterItem key={character.id} {...character} />
      ))}
    </>
  );
};

export default CharacterList;
