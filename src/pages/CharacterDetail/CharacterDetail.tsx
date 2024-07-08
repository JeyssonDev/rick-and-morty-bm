import ArrowBack from '../../../src/assets/icons/ArrowBack.png';
import DeleteIcon from '../../../src/assets/icons/DeleteIcon.png';
import { useNavigate, useParams } from 'react-router-dom';
import FavoriteFilledIcon from '../../../src/assets/icons/FavoriteFilledIcon.png';
import FavoriteUnfilledIcon from '../../../src/assets/icons/FavoriteUnfilledIcon.png';
import useFetchCharacterById from '../../hooks/useFetchCharacterById';
import { useCharactersStore, useIsMobileStore } from '../../store';
import CharacterComments from '../../components/ui/CharacterComments/CharacterComments';
import { useFavoriteCharacter } from '../../hooks';
import { ARROW_BACK, FAVORITE, SPECIE, STATUS } from '../../utils/constanst';
import Loader from '../../components/reusable/Loader';

const CharacterDetail = () => {
  const { isMobile } = useIsMobileStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading } = useFetchCharacterById(id);
  const { selectedCharacter, deleteCharacter } = useCharactersStore();
  const { isFavorite, toggleFavorite } =
    useFavoriteCharacter(selectedCharacter);

  if (loading) return <Loader />;

  const handleDeleteCharacter = () => {
    if (selectedCharacter?.id) {
      deleteCharacter(selectedCharacter.id);
      navigate('/');
    }
  };

  return (
    <section
      className={`block ${
        isMobile ? 'absolute top-0 left-0 w-full h-full p-5' : 'relative px-14'
      } bg-white`}
    >
      {isMobile && (
        <button
          className="flex pb-8"
          type="button"
          onClick={() => navigate('/')}
        >
          <img src={ArrowBack} alt={ARROW_BACK} />
        </button>
      )}
      <div className="relative w-[75px] h-[75px]">
        <img
          className="w-[75px] h-[75px] rounded-full"
          src={selectedCharacter?.image}
          alt={`${selectedCharacter?.name}-image`}
        />
        <img
          onClick={toggleFavorite}
          className="cursor-pointer absolute bottom-1 -right-3 w-[24px] h-[24px]"
          src={isFavorite ? FavoriteFilledIcon : FavoriteUnfilledIcon}
          alt={FAVORITE}
        />
      </div>
      <h1 className="text-2xl font-bold text-left pt-2">
        {selectedCharacter?.name}
      </h1>
      <button
        className="absolute right-0 top-10 w-[32px]"
        onClick={handleDeleteCharacter}
      >
        <img src={DeleteIcon} alt="Delete" className="w-[24px] h-[24px]" />
      </button>
      <div className="flex flex-col w-full items-center py-4 relative leading-4">
        <div className="flex flex-col border-b-[1px] py-4 w-full text-left">
          <h3 className="text-base font-bold text-[#111827]">{SPECIE}</h3>
          <p className="font-light text-[#6B7280]">
            {selectedCharacter?.species}
          </p>
        </div>
        <div className="flex flex-col w-full py-4 text-left">
          <h3 className="text-base font-bold text-[#111827]">{STATUS}</h3>
          <p className="font-light text-[#6B7280]">
            {selectedCharacter?.status}
          </p>
        </div>
      </div>
      <CharacterComments />
    </section>
  );
};

export default CharacterDetail;
