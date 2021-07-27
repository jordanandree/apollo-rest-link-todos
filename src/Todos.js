import { useQuery } from '@apollo/client';
import { Box, Center, List, Spinner } from '@chakra-ui/react';

import { AllTodosQuery } from './queries';
import Todo from './Todo';

const Todos = () => {
  const { data, loading, error } = useQuery(AllTodosQuery);

  if (loading) {
    return (
      <Center h="500px">
        <Spinner />
      </Center>
    );
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
    <Box>
      <List>
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
      </List>
    </Box>
  );
};

export default Todos;
