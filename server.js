const express = require("express");
const pino = require("express-pino-logger")();
const sqlite3 = require("sqlite3").verbose();
const { v4: uuidv4 } = require("uuid");

const PORT = 5000;
const db = new sqlite3.Database("./server/db.sqlite3");

const { CREATE_TODOS_TABLE, ALL_TODOS, CREATE_TODO } = require("./server/sql");
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
        return res.send(createError());
      }

      res.send(rows);
    });
  });

  app.post("/api/todos", (req, res) => {
    const { title } = req.body;

    if (!title) {
      return res.send(createError("Missing `title` param in body", 400));
    }
    const id = uuidv4();

    db.run(CREATE_TODO, [id, title], (err) => {
      if (err) {
        req.log.error(err);
        return res.send(createError());
      }

      res.send({
        id,
        title,
      });
    });
  });

  app.listen(PORT, () => {
    console.log("Server running on http://localhost:%s", PORT);
  });
};

initApp();
