const express = require("express");
const pino = require("express-pino-logger")();
const sqlite3 = require("sqlite3").verbose();
const { v4: uuidv4 } = require("uuid");

const PORT = 5000;
const db = new sqlite3.Database("./server/db.sqlite3");

const {
  CREATE_TODOS_TABLE,
  ALL_TODOS,
  CREATE_TODO,
  UPDATE_TODO,
  GET_TODO,
} = require("./server/sql");
const { createError } = require("./server/errors");

const initApp = () => {
  const app = express();

  app.use(pino);
  app.use(express.json());

  db.serialize(() => {
    db.run(CREATE_TODOS_TABLE, [], (err) => {
      if (err) {
        return console.log(err);
      }

      console.log("Successfully created `todos` table");
    });
  });

  app.get("/api/todos", (req, res) => {
    db.all(ALL_TODOS, [], (err, rows) => {
      if (err) {
        req.log.error(err);
        return res.status(500).send(createError());
      }

      res.send(rows);
    });
  });

  app.post("/api/todos", (req, res) => {
    const { title } = req.body;

    if (!title) {
      return res
        .status(400)
        .send(createError("Missing `title` param in body", 400));
    }
    const id = uuidv4();

    db.run(CREATE_TODO, [id, title], (err) => {
      if (err) {
        req.log.error(err);
        return res.status(500).send(createError());
      }

      res.send({
        id,
        title,
      });
    });
  });

  app.put("/api/todos/:id", (req, res) => {
    const { completed } = req.body;
    const { id } = req.params;

    db.get(GET_TODO, [id], (err, todo) => {
      if (err) {
        req.log.error(err);
        return res.status(500).send(createError());
      }

      if (!todo) {
        return res.status(404).send(createError(`Todo ${id} is missing`, 404));
      }

      db.run(UPDATE_TODO, [completed, id], (err) => {
        if (err) {
          req.log.error(err);
          return res.status(500).send(createError());
        }

        res.send({
          ...todo,
          completed,
        });
      });
    });
  });

  app.listen(PORT, () => {
    console.log("Server running on http://localhost:%s", PORT);
  });
};

initApp();
