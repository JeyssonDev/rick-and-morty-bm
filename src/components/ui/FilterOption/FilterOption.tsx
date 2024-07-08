type FilterOptionProps = {
  titleFilter: string;
  option: string;
  isSelected: boolean;
  handleChange: (option: string) => void;
};

export const FilterOption = ({
  titleFilter,
  option,
  isSelected,
  handleChange,
}: FilterOptionProps) => {
  return (
    <div className="relative">
      <input
        className="sr-only peer"
        type="radio"
        value={option}
        name={titleFilter}
        id={`${titleFilter}-${option}`}
        onClick={() => handleChange(option)}
      />
      <label
        htmlFor={`${titleFilter}-${option}`}
        className={`border-[1px] border-[#E5E7EB] block cursor-pointer select-none rounded-xl px-2 py-3 text-center text-sm leading-5 font-semibold ${
          isSelected ? 'bg-[#EEE3FF] font-bold text-[#8054C7]' : ''
        }`}
      >
        {option}
      </label>
    </div>
  );
};
