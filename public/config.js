var socket = io();
var messagestored = [];

socket.on("chat message", function (data) {
  var item = document.createElement("li");
  item.textContent = data.username + ": " + data.message;
  document.getElementById("messages").appendChild(item);

  // No es necesario almacenar el mensaje aquí, ya que se almacena en el servidor
  // messagestored.push(data);

  window.scrollTo(0, document.body.scrollHeight);
});

document.querySelector("#form").addEventListener("submit", function (e) {
  e.preventDefault();
  var input = document.querySelector("#input");
  var username = document.querySelector("#username").value; // Obtener el nombre de usuario
  if (input.value) {
    socket.emit("chat message", { username: username, message: input.value }); // Enviar el nombre de usuario junto con el mensaje
    input.value = "";
  }
});
