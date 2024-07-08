import {
  useCharactersStore,
  useFavoriteCharactersStore,
  useFilterStore,
  useIsMobileStore,
} from '../../../store';
import BackIcon from '../../../assets/icons/ArrowBack.png';
import FilterOptions from '../FilterOptions/FilterOptions';
import { CharacterDetailsType } from '../../../types';
import { BACK, FILTER, FILTERS } from '../../../utils/constanst';

const FilterOptionsMobile = () => {
  const { isMobile } = useIsMobileStore();
  const { openFilter, areAllOptionsEmpty, options } = useFilterStore();
  const { setCharacters, charactersOriginal } = useCharactersStore();
  const { addFavoriteArrayCharacter, favoriteCharactersOriginal } =
    useFavoriteCharactersStore();

  const filterData = () => {
    const { specie, characters: characterOptions } = options;

    const filteredCharacters = charactersOriginal.filter(
      (character: CharacterDetailsType) => {
        const matchesSpecie =
          specie.includes('All') || specie.includes(character.species!);
        const matchesStatus =
          characterOptions.includes('All') ||
          characterOptions.includes(character.status);

        return matchesSpecie && matchesStatus;
      }
    );

    const filteredCharactersStarred = favoriteCharactersOriginal.filter(
      (character: CharacterDetailsType) => {
        const matchesSpecie =
          specie.includes('All') || specie.includes(character.species!);
        const matchesStatus =
          characterOptions.includes('All') ||
          characterOptions.includes(character.status);
        return matchesSpecie && matchesStatus;
      }
    );

    if (characterOptions.includes('Starred')) {
      setCharacters(filteredCharactersStarred);
      addFavoriteArrayCharacter(filteredCharactersStarred);
    } else {
      setCharacters(filteredCharacters);
      addFavoriteArrayCharacter(filteredCharactersStarred);
    }

    openFilter();
  };

  return (
    <div
      className={`absolute bg-white z-20 p-5 flex flex-col justify-between ${
        isMobile
          ? 'w-full h-full left-0 top-0'
          : 'w-[343px] h-auto left-3 shadow-lg top-[140px] rounded-lg ring-1 ring-black ring-opacity-5'
      }`}
    >
      {isMobile && (
        <div className="flex w-full text-center justify-between items-center">
          <button type="button" onClick={openFilter}>
            <img src={BackIcon} alt={BACK} />
          </button>
          <h3 className="text-base text-left py-5 leading-6 font-semibold">
            {FILTERS}
          </h3>
          <span></span>
        </div>
      )}

      <div className="flex-grow">
        <FilterOptions
          titleFilter="Characters"
          options={['All', 'Starred', 'Others']}
        />
        <FilterOptions
          titleFilter="Specie"
          options={['All', 'Human', 'Alien']}
        />
      </div>

      <button
        onClick={filterData}
        disabled={areAllOptionsEmpty()}
        type="button"
        className={`w-full h-10 mx-auto rounded-md ${
          areAllOptionsEmpty()
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-purple-700 text-white'
        }`}
      >
        {FILTER}
      </button>
    </div>
  );
};

export default FilterOptionsMobile;
