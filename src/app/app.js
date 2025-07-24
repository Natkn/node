const express = require("express");
const fs = require("fs");
const url = require("url");
const app = express(); // Создаем экземпляр Express
const port = 3003;
const hostname = "127.0.0.1";

// Middleware для обработки JSON-данных
app.use(express.json());

// Middleware для обработки данных из форм
app.use(express.urlencoded({ extended: true }));

// Обработчик для GET-запросов
app.get("/", (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;

  if (query.hello) {
    const name = query.hello;
    if (name) {
      res.status(200).send(`Hello, ${name}!`);
    } else {
      res.status(400).send("Enter a name");
    }
  } else if (query.users) {
    fs.readFile("data/users.json", (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.status(200).json(JSON.parse(data));
    });
  } else {
    res.status(200).send("Hello, World!");
  }
});

// Запускаем сервер
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
