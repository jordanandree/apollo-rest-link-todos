const CREATE_TODOS_TABLE = `
  CREATE TABLE todos (
    uuid CHAR(36) NOT NULL PRIMARY KEY,
    title TEXT NOT NULL,
    created_at TEXT NOT NUll,
    completed BOOLEAN
  )`;

const ALL_TODOS = `
  SELECT * FROM todos
  ORDER BY created_at DESC`;

const CREATE_TODO = `
  INSERT INTO todos (uuid, title, created_at, completed)
  VALUES (?, ?, datetime('now'), false)
`;

module.exports = {
  CREATE_TODOS_TABLE,
  ALL_TODOS,
  CREATE_TODO,
};
