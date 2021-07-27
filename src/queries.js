import { gql } from "@apollo/client";

export const AllTodosQuery = gql`
  query AllTodosQuery {
    todos @rest(type: "Todo", path: "todos") {
      uuid
      title
      completed
    }
  }
`;

export const CreateTodoMutation = gql`
  fragment TodoPayload on REST {
    title: String
  }

  mutation AddTodo($input: TodoPayload!) {
    todo(input: $input) @rest(type: "Todo", path: "todos", method: "POST") {
      uuid
      title
    }
  }
`;
