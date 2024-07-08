import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCharacterComments } from '../../../hooks/useCharacterComments';
import { ADD, ADD_COMMENT, COMMENTS } from '../../../utils/constanst';

export default function CharacterComments() {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { id } = useParams<{ id: string }>();
  const { characterDetail, addCommentToCharacter } = useCharacterComments(id);

  const handleInputChange = () => {
    if (inputRef.current?.value) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  };

  const handleAddComment = () => {
    if (inputRef.current?.value) {
      addCommentToCharacter(inputRef.current.value);
      inputRef.current.value = '';
      handleInputChange();
    }
  };

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          {COMMENTS}
        </h3>
        <div className="space-y-4 mb-6">
          {characterDetail?.comments?.map((comment) => (
            <div
              key={comment.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between"
            >
              <p className="text-gray-700">{comment.comment}</p>
              <span className="text-xs text-gray-500">
                {new Date(comment.id).toLocaleString().split(',')[0]}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center flex-col lg:flex-row">
          <input
            onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
            onChange={handleInputChange}
            type="text"
            ref={inputRef}
            className="w-full flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:border-purple-500 focus:outline-none"
            placeholder={ADD_COMMENT}
          />
          <button
            onClick={handleAddComment}
            disabled={!isButtonEnabled}
            className={`lg:ml-4 mt-3 lg:mt-0 px-6 py-2 rounded-lg text-white w-full lg:w-fit ${
              !isButtonEnabled
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-purple-500 hover:bg-purple-600'
            }`}
          >
            {ADD}
          </button>
        </div>
      </div>
    </>
  );
}
