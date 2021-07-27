import { ApolloProvider } from '@apollo/client';
import { ChakraProvider, Container } from '@chakra-ui/react';

import AddTodo from './AddTodo';
import Navigation from './Navigation';
import Todos from './Todos';
import { client } from './utils/client';

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Navigation />
        <Container>
          <AddTodo />
          <Todos />
        </Container>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
