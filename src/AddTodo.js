import { useMutation } from '@apollo/client';
import { Box, Button, Flex, Input, useToast } from '@chakra-ui/react';
import { useState } from 'react';

import { AllTodosQuery, CreateTodoMutation } from './queries';

const AddTodo = () => {
  const [title, setTitle] = useState('');
  const [addTodo, { error }] = useMutation(CreateTodoMutation, {
    refetchQueries: [{ query: AllTodosQuery }],
  });
  const toast = useToast();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addTodo({ variables: { input: { title } } });
    setTitle('');
    toast({
      title: 'Todo added',
      status: 'success',
    });
  };

  if (error) {
    toast({
      title: 'Error creating todo',
      description: error.message,
      status: 'error',
    });
  }

  return (
    <Box marginY="4">
      <Flex marginTop="2" as="form" onSubmit={handleSubmit}>
        <Input type="text" value={title} onChange={handleTitleChange} />
        <Button type="button" onClick={handleSubmit} marginLeft="2">
          Add Todo
        </Button>
      </Flex>
    </Box>
  );
};

export default AddTodo;
