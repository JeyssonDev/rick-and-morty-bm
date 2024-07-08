import { useEffect, useState } from 'react';
import {
  useCharactersStore,
  useFavoriteCharactersStore,
  useFilterStore,
  useIsMobileStore,
} from '../../../store';
import BackIcon from '../../../assets/icons/ArrowBack.png';
import SearchBar from '../SearchBar/SearchBar';
import {
  ADVANCED_SEARCH,
  DONE,
  FILTER,
  RESULTS,
  RICK_AND_MORTY,
} from '../../../utils/constanst';

export const ResumeApplyFilters = () => {
  const [counterFilters, setCounterFilters] = useState(0);
  const { removeAllOptions, options } = useFilterStore();
  const { characters, setCharacters, charactersOriginal } =
    useCharactersStore();
  const {
    addFavoriteArrayCharacter,
    favoriteCharactersOriginal,
    favoriteCharacters,
  } = useFavoriteCharactersStore();
  const { isMobile } = useIsMobileStore();

  useEffect(() => {
    const calculateFilterCount = () => {
      const currentOptions = useFilterStore.getState().options;
      const count = Object.values(currentOptions).reduce(
        (total, filterOptions) => total + (filterOptions?.length || 0),
        0
      );
      setCounterFilters(count);
    };
    calculateFilterCount();
  }, []);

  const resultsCount = options.status.includes('Starred')
    ? favoriteCharacters.length
    : characters.length;

  const resetFilters = () => {
    removeAllOptions();
    setCharacters(charactersOriginal);
    addFavoriteArrayCharacter(favoriteCharactersOriginal);
  };

  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-2xl text-left leading-8 font-bold">
          {RICK_AND_MORTY}
        </h1>
        <SearchBar />

        {isMobile && (
          <div className="flex items-center justify-between w-full text-center">
            <button type="button" onClick={resetFilters}>
              <img src={BackIcon} alt="Back Icon" />
            </button>
            <h3 className="text-base text-left py-5">{ADVANCED_SEARCH}</h3>
            <button type="button" onClick={resetFilters}>
              <h3 className="text-base text-right text-primary-600">{DONE}</h3>
            </button>
          </div>
        )}

        <div className="border-t py-5 -mb-4 border-b flex justify-between items-center">
          <span className="text-[#2563EB]">
            {resultsCount} {RESULTS}
          </span>
          <div className="flex">
            <div className="py-1 px-4 rounded-xl bg-[#E0F7D7]">
              <span className="text-[#3B8520]">
                {counterFilters} {FILTER}
              </span>
            </div>
            <button
              className="text-[#6ed349] pl-2 font-bold"
              onClick={resetFilters}
            >
              X
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
