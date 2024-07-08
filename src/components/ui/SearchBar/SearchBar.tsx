import SearchIcon from '../../../../src/assets/icons/SearchIcon.png';
import FilterIcon from '../../../../src/assets/icons/FilterIcon.png';
import { useFilterStore } from '../../../store/filter-store';
import useCharacterFilter from '../../../hooks/useCharacterFilter';
import { FILTER, SEARCH_FILTER_PLACEHOLDER } from '../../../utils/constanst';

const SearchBar = () => {
  const { openFilter } = useFilterStore();
  const { handleSearchChange } = useCharacterFilter();

  return (
    <div className={`flex relative pt-5 w-auto`}>
      <img
        className="w-[20px] h-[20px] absolute left-3 top-1/2"
        src={SearchIcon}
        alt="Search Icon"
      />

      <input
        onChange={handleSearchChange}
        className="rounded-md p-5 pl-11 w-full h-[38px] placeholder:text-[16px] placeholder-[#6B7280] bg-[#F3F4F6]"
        type="text"
        placeholder={SEARCH_FILTER_PLACEHOLDER}
      />

      <button
        type="button"
        onClick={openFilter}
        className="absolute right-3 top-2/3 transform -translate-y-1/2 p-2 rounded-lg hover:bg-[#EEE3FF]"
      >
        <img className="w-auto h-auto" src={FilterIcon} alt={FILTER} />
      </button>
    </div>
  );
};

export default SearchBar;
