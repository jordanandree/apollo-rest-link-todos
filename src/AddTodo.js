import { useMutation } from "@apollo/client";
import { useState } from "react";
import { AllTodosQuery, CreateTodoMutation } from "./queries";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [addTodo, { error }] = useMutation(CreateTodoMutation, {
    refetchQueries: [{ query: AllTodosQuery }],
  });

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = () => {
    addTodo({ variables: { input: { title } } });
    setTitle("");
  };

  if (error) {
    return (
      <p>
        Error creating todo:
        <br />
        {error.message}
      </p>
    );
  }

  return (
    <>
      <h2>Add Todo</h2>
      <input type="text" value={title} onChange={handleTitleChange} />
      <button type="button" onClick={handleSubmit}>
        Add
      </button>
    </>
  );
};

export default AddTodo;
