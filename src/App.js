import { ApolloProvider } from "@apollo/client";
import { client } from "./utils/client";

import "./App.css";
import Todos from "./Todos";
import AddTodo from "./AddTodo";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <AddTodo />
        <Todos />
      </div>
    </ApolloProvider>
  );
}

export default App;
