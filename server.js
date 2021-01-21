import websocket from "websocket";
import http from "http";
import { uid } from "uid";
const websocketServer = websocket.server;
const server = http.createServer();
server.listen(8000);
console.log("Server started");

const wsServer = new websocketServer({
  httpServer: server,
});
const users = {};
wsServer.on("request", (req) => {
  const userId = uid(10);
  const connection = req.accept(null, req.origin);
  users[userId] = connection;
  console.log("connection received");
  connection.on("message", (msg) => {
    if (msg.length > 0) {
      for (i in users) {
        users[i].send({ msg });
        console.log("Message sent");
      }
    }
  });
});
