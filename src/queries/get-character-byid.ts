import { gql } from '@apollo/client';

export const GET_CHARACTER_BYID = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      image
    }
  }
`;
