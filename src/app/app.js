const express = require("express");
const fs = require("fs");
const url = require("url");
const path = require("path");
const { getUsers } = require("../modules/users");

const app = express();
const port = process.env.PORT || 3003;
const hostname = "127.0.0.1";

const server = app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;

  if (Object.keys(query).length === 0) {
    res.setHeader("Content-Type", "text/plain");
    res.status(200).send("Hello, World!");
  } else if (query.hello !== undefined) {
    const name = query.hello;
    if (name) {
      res.setHeader("Content-Type", "text/plain");
      res.status(200).send(`Hello, ${name}!`);
    } else {
      res.setHeader("Content-Type", "text/plain");
      res.status(400).send("Enter a name");
    }
  } else if (query.users !== undefined) {
    console.log("Users route hit");
    getUsers()
      .then(({ status, data }) => {
        res.setHeader("Content-Type", "application/json");
        res.status(status).json(data);
      })
      .catch(({ status, message }) => {
        res.setHeader("Content-Type", "text/plain");
        res.status(status).send(message);
      });
  } else {
    res.setHeader("Content-Type", "text/plain");
    res.status(500).send("Internal Server Error");
  }
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
});
