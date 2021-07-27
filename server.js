const express = require('express');
const axios = require('axios');
const pino = require('express-pino-logger')()

const PORT = 5000;

const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

const initApp = () => {
  const app = express();

  app.use(pino);

  app.get('/api/todos', async (_req, res) => {
    const response = await client.get('todos');
    res.send(response.data);
  });

  app.post('/api/todos', async (req, res) => {
    const response = await client.post('todos', {
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    res.send();
  });


  app.listen(PORT, () => {
    console.log("Server running on http://localhost:%s", PORT);
  });
}

initApp();
