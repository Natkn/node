const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true); // Разбираем URL
  const query = parsedUrl.query; // Получаем параметры запроса

  if (parsedUrl.pathname !== "/") {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end();
    return; //  Если путь не "/", возвращаем ошибку 500
  }

  if (query.hello) {
    const name = query.hello;
    if (name) {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`Hello, ${name}!`);
    } else {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Enter a name");
    }
  } else if (query.users) {
    fs.readFile("data/users.json", (err, data) => {
      if (err) {
        console.error(err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        return;
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
    });
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, World!");
  }
});

const port = 3003;
const hostname = "127.0.0.1";

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
