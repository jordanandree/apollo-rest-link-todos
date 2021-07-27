import { useQuery } from '@apollo/client';
import { AllTodosQuery } from './queries';

const Todos = () => {
  const { data, loading, error } = useQuery(AllTodosQuery);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading todos:<br />{error.message}</p>;
  }

  return <ul>
    {data.todos.map((todo) => {
      return <li key={todo.id}>{todo.title}</li>;
    })}
  </ul>
}

export default Todos;
