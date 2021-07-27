import { ApolloProvider } from '@apollo/client';
import { client } from './utils/client';

import './App.css';
import Todos from './Todos';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          Todos
        </header>

        <Todos />
      </div>
    </ApolloProvider>
  );
}

export default App;
