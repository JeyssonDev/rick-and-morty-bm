import { useParams } from 'react-router-dom';
import useFetchCharacters from '../../../hooks/useFetchCharacters';
import {
  useCharactersStore,
  useFavoriteCharactersStore,
  useFilterStore,
  useIsMobileStore,
} from '../../../store';
import CharacterList from '../../reusable/CharacterList';
import FilterOptionsMobile from '../FiltersOptionsMobile/FilterOptionsMobile';
import SearchBar from '../SearchBar/SearchBar';
import {
  CHARACTERS,
  RICK_AND_MORTY,
  STARRED_CHARACTERS,
} from '../../../utils/constanst';
import Loader from '../../reusable/Loader';
import { ResumeApplyFilters } from '../ResumeApplyFilters/ResumeApplyFilters';

const Sidebar = () => {
  const { favoriteCharacters } = useFavoriteCharactersStore();
  const { options, isOpenFilters } = useFilterStore();
  const { isMobile } = useIsMobileStore();
  const { loading } = useFetchCharacters();
  const { characters } = useCharactersStore();
  const { id } = useParams();

  const hasFilterOptions =
    options.specie?.length > 0 || options.status?.length > 0;

  const regularCharacters = characters.filter(
    (character) =>
      !favoriteCharacters.find(
        (favoriteCharacter) => favoriteCharacter.id === character.id
      )
  );

  if (loading) return <Loader />;

  return (
    <>
      <aside className={`${isOpenFilters && isMobile ? 'hidden' : 'block'}`}>
        {!isOpenFilters && hasFilterOptions ? (
          <ResumeApplyFilters />
        ) : (
          <>
            <h1 className="text-2xl text-left leading-8 font-bold">
              {RICK_AND_MORTY}
            </h1>
            <SearchBar />
          </>
        )}
        {!isMobile || !id ? (
          <div className="pt-5">
            <CharacterList
              title={STARRED_CHARACTERS}
              characters={favoriteCharacters}
            />
            <CharacterList title={CHARACTERS} characters={regularCharacters} />
          </div>
        ) : null}
      </aside>
      {isOpenFilters && <FilterOptionsMobile />}
    </>
  );
};

export default Sidebar;
