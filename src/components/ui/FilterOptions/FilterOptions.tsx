import { useFilterStore } from '../../../store/filter-store';
import { FilterOption } from '../FilterOption/FilterOption';

type FilterOptionsProps = {
  titleFilter: string;
  options: string[];
};

const FilterOptions = ({ titleFilter, options }: FilterOptionsProps) => {
  const {
    setFilters,
    removeOption,
    options: optionsSelected,
  } = useFilterStore();

  const handleChange = (option: string) => {
    const filterType = titleFilter.toLowerCase();
    if (isSelectedOption(option)) {
      removeOption(option, filterType);
    } else {
      setFilters(option, filterType);
    }
  };

  const isSelectedOption = (option: string) => {
    return optionsSelected?.[
      titleFilter === 'Characters' ? 'characters' : 'specie'
    ]?.includes(option!);
  };

  return (
    <div className="py-2">
      <h3 className="text-base text-left leading-6 font-medium text-[#6B7280]">
        {titleFilter}
      </h3>
      <div className="grid grid-cols-3 gap-x-5 m-4 max-w-md mx-auto">
        {options.map((option) => (
          <FilterOption
            key={option}
            titleFilter={titleFilter}
            option={option}
            isSelected={isSelectedOption(option)}
            handleChange={handleChange}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterOptions;
