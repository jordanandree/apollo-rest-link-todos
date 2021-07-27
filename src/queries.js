import { gql } from "@apollo/client";

export const AllTodosQuery = gql`
  query AllTodosQuery {
    allTodos @rest(type: "Todo", path: "/todos") {
      id
      title
      completed
    }
  }
`;

export const CreateTodoMutation = gql`
  fragment NewTodoPayload on REST {
    title: String
  }

  mutation AddTodo($input: NewTodoPayload!) {
    todo(input: $input) @rest(type: "Todo", path: "/todos", method: "POST") {
      id
      title
    }
  }
`;

export const UpdateTodoMutation = gql`
  fragment UpdateTodoPayload on REST {
    title: String
    completed: Boolean
  }

  mutation UpdateTodo($id: ID!, $input: UpdateTodoPayload!) {
    updateTodo(id: $id, input: $input)
      @rest(type: "Todo", path: "/todos/{args.id}", method: "PUT") {
      id
      title
      completed
    }
  }
`;
