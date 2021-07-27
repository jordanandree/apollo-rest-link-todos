import { useQuery } from "@apollo/client";
import { AllTodosQuery } from "./queries";

import Todo from "./Todo";

const Todos = () => {
  const { data, loading, error } = useQuery(AllTodosQuery);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <p>
        Error loading todos:
        <br />
        {error.message}
      </p>
    );
  }

  return (
    <>
      <h2>All Todos</h2>
      <ul style={{ padding: 0 }}>
        {data.allTodos.map((todo) => {
          return (
            <Todo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
            />
          );
        })}
      </ul>
    </>
  );
};

export default Todos;
