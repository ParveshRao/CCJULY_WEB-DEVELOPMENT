const socket = new WebSocket('ws://localhost:3000');

socket.onopen = () => {
  console.log('WebSocket connection established.');
};

socket.onmessage = (event) => {
  const messagesDiv = document.getElementById('messages');
  const message = document.createElement('p');
  message.textContent = event.data;
  messagesDiv.appendChild(message);
};

function sendMessage() {
  const inputField = document.getElementById('messageInput');
  const message = inputField.value;
  socket.send(message);
  inputField.value = '';
}
