import './style.css';
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';
import { connectToServer } from './socket-client.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>        

    <input id="jwt-token" placeholder="Json Web Token" />
    <button id="connect-to-server">Conectar</button>

    <h3>
      <span>Server: </span> 
      <span id="server-status" class="offline">Disconnected</span>
    </h3>
    
    <h4>Connected Clients</h4>
    <ul id="connected-clients"></ul>

    <h4>Messages:</h4>
    <ul id="messages-ul"></ul>
    <form id="message-form">
      <input id="message-input" placeholder="message"/>
    </form>

  </div>
`;

const jwtTokenInput = document.querySelector<HTMLInputElement>('#jwt-token')!;
const connectToServerBtn = document.querySelector<HTMLInputElement>('#connect-to-server')!;

connectToServerBtn.addEventListener('click', () => {
  if (jwtTokenInput.value.trim().length <= 0) {
    return alert('Enter Json Web Token');
  }
  connectToServer(jwtTokenInput.value);
});
