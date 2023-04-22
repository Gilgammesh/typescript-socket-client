import { Manager, Socket } from 'socket.io-client';

let socket: Socket;

export const connectToServer = (token: string) => {
  const manager = new Manager('http://localhost:4000/socket.io/socket.io.js', {
    extraHeaders: {
      authentication: token
    }
  });

  socket?.removeAllListeners();

  socket = manager.socket('/'); // main namespace
  // const adminSocket = manager.socket('/admin'); // admin namespace

  addListeners();
};

const addListeners = () => {
  const serverStatusDom = document.querySelector<HTMLSpanElement>('#server-status')!;
  const connectedClientsDom = document.querySelector<HTMLUListElement>('#connected-clients')!;

  const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;
  const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
  const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;

  socket.on('connect', () => {
    serverStatusDom.innerHTML = 'Connected';
    serverStatusDom.classList.remove('offline');
    serverStatusDom.classList.add('online');
    connectedClientsDom.innerHTML = '';
  });

  socket.on('disconnect', () => {
    serverStatusDom.innerHTML = 'Disconnected';
    serverStatusDom.classList.remove('online');
    serverStatusDom.classList.add('offline');
    connectedClientsDom.innerHTML = '';
  });

  socket.on('connected-clients', (clients: string[]) => {
    let clientsHtml = '';
    clients.forEach(client => {
      clientsHtml += `<li>${client}</li>`;
    });
    connectedClientsDom.innerHTML = clientsHtml;
  });

  messageForm.addEventListener('submit', event => {
    event.preventDefault();
    if (messageInput.value.trim().length > 0) {
      socket.emit('message-from-client', { id: 'YO', message: messageInput.value });
      messageInput.value = '';
    }
  });

  socket.on('message-from-server', (payload: { fullName: string; message: string }) => {
    const newMessage = `
      <li>
        <strong>${payload.fullName}</strong>
        <span>${payload.message}</span>
      </li>
    `;
    const li = document.createElement('li');
    li.innerHTML = newMessage;
    messagesUl.append(li);
  });
};
