export type CharactersCommentsType = {
  comment: string;
  id: number;
};

export type CharacterDetailsType = {
  id: string;
  name: string;
  status: string;
  image: string;
  isFavorite?: boolean;
  species?: string;
  comments?: CharactersCommentsType[];
};
