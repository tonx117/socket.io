const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Mantén un array de mensajes aquí
const messagestored = [];

app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("a user connected");

  // Envía los mensajes almacenados al usuario que se conecta
  messagestored.forEach((data) => {
    socket.emit("chat message", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (data) => {
    messagestored.push(data); // Guarda el mensaje en el array
    io.emit("chat message", data); // Envía tanto el nombre de usuario como el mensaje
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

module.exports = { io, messagestored }; // Exporta io y el array de mensajes
