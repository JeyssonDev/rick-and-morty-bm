import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
const uri = 'https://rickandmortyapi.com/graphql';

export const client = new ApolloClient({
  link: new HttpLink({
    uri,
  }),
  cache: new InMemoryCache(),
});
