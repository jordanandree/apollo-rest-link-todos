const CREATE_TODOS_TABLE = `
  CREATE TABLE todos (
    id CHAR(36) NOT NULL PRIMARY KEY,
    title TEXT NOT NULL,
    created_at TEXT NOT NUll,
    completed BOOLEAN
  )`;

const ALL_TODOS = `
  SELECT * FROM todos
  ORDER BY completed ASC, created_at DESC`;

const CREATE_TODO = `
  INSERT INTO todos (id, title, created_at, completed)
  VALUES (?, ?, datetime('now'), false)
  `;

const UPDATE_TODO = `
  UPDATE todos SET completed = ? WHERE id = ?
    `;

const GET_TODO = `
  SELECT * FROM todos WHERE id = ?
  `;

module.exports = {
  CREATE_TODOS_TABLE,
  ALL_TODOS,
  CREATE_TODO,
  UPDATE_TODO,
  GET_TODO,
};
