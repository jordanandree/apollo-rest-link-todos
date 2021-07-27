import { useMutation } from "@apollo/client";
import clsx from "clsx";
import { useState } from "react";
import { AllTodosQuery, UpdateTodoMutation } from "./queries";

import "./Todo.css";

const Todo = ({ id, title, completed }) => {
  const [isCompleted, setCompleted] = useState(completed);
  const [updateTodo] = useMutation(UpdateTodoMutation, {
    refetchQueries: [{ query: AllTodosQuery }],
  });

  const handleCompleted = (e) => {
    setCompleted(e.target.checked);
    updateTodo({
      variables: { id, input: { completed: e.target.checked } },
    });
  };

  return (
    <li className={clsx("Todo", isCompleted && "Todo-completed")}>
      <p>{title}</p>
      <input type="checkbox" onChange={handleCompleted} checked={isCompleted} />
    </li>
  );
};

export default Todo;
