import { gql } from '@apollo/client';

export const AllTodosQuery = gql`
  query AllTodosQuery {
    todos @rest(type: "Todo", path: "todos") {
      title
      completed
    }
  }
`;
