import FavoriteFilledIcon from '../../../assets/icons/FavoriteFilledIcon.png';
import FavoriteUnfilledIcon from '../../../assets/icons/FavoriteUnfilledIcon.png';
import { useNavigate, useParams } from 'react-router-dom';
import { CharacterDetailsType } from '../../../types';
import { useFavoriteCharacter } from '../../../hooks';
import { FAVORITE } from '../../../utils/constanst';

const CharacterItem = ({
  id,
  name,
  status,
  image,
  species,
}: CharacterDetailsType) => {
  const navigate = useNavigate();
  const { id: selectedId } = useParams<{ id: string }>();
  const { isFavorite, toggleFavorite } = useFavoriteCharacter({
    id,
    name,
    status,
    image,
    species,
  });

  const handleNavigation = () => navigate(`/character-detail/${id}`);

  return (
    <div
      className={`flex w-full items-center py-4 border-t-[1px] relative leading-4 px-3 ${
        selectedId === id ? 'bg-[#EEE3FF] rounded-lg' : 'bg-white'
      }`}
      onClick={handleNavigation}
    >
      <div className="flex w-full items-center cursor-pointer">
        <img
          className="w-[32px] h-[32px] rounded-full"
          src={image}
          alt={`${name}-image`}
        />
        <div className="flex flex-col ml-4 w-full text-left">
          <h3 className="text-base font-bold text-[#111827]">{name}</h3>
          <p className="font-light text-[#6B7280]">{species}</p>
        </div>
      </div>
      <div
        className="z-20 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite();
        }}
      >
        <img
          className="w-[24px] h-[24px]"
          src={isFavorite ? FavoriteFilledIcon : FavoriteUnfilledIcon}
          alt={FAVORITE}
        />
      </div>
    </div>
  );
};

export default CharacterItem;
