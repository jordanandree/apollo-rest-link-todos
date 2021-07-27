import { useMutation } from '@apollo/client';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  Checkbox,
  Flex,
  IconButton,
  ListItem,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

import {
  AllTodosQuery,
  DeleteTodoMutation,
  UpdateTodoMutation,
} from './queries';

const Todo = ({ id, title, completed }) => {
  const [isCompleted, setCompleted] = useState(completed);
  const [isHover, setHover] = useState(false);
  const toast = useToast();
  const [updateTodo, { error: updateError }] = useMutation(UpdateTodoMutation, {
    refetchQueries: [{ query: AllTodosQuery }],
  });
  const [deleteTodo, { error: deleteError }] = useMutation(DeleteTodoMutation, {
    refetchQueries: [{ query: AllTodosQuery }],
  });

  const handleCompletedClick = (e) => {
    setCompleted(e.target.checked);
    updateTodo({
      variables: { id, input: { completed: e.target.checked } },
    });
  };

  const handleDeleteClick = () => {
    deleteTodo({ variables: { id } });
  };

  if (updateError) {
    toast({
      title: 'Error updating todo',
      description: updateError.message,
      status: 'error',
    });
  }

  if (deleteError) {
    toast({
      title: 'Error deleting todo',
      description: updateError.message,
      status: 'error',
    });
  }

  return (
    <ListItem
      borderWidth="1px"
      borderRadius="md"
      paddingX="3"
      paddingY="2"
      marginY="2"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <Flex justifyContent="space-between" alignItems="center" paddingY="2">
        <Flex alignItems="center">
          <Text
            as={isCompleted && 'del'}
            sx={{ color: isCompleted && 'gray.400' }}>
            {title}
          </Text>
          {isHover && (
            <IconButton
              variant="link"
              icon={<DeleteIcon />}
              onClick={handleDeleteClick}
            />
          )}
        </Flex>
        <Checkbox
          onChange={handleCompletedClick}
          isChecked={isCompleted}
          size="lg"
        />
      </Flex>
    </ListItem>
  );
};

export default Todo;
