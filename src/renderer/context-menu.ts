import electron from 'electron';

const handlerContextMenu = (ev: any) => {
  ev.preventDefault();
  (ev.isTrusted) && electron?.ipcRenderer?.send('show-context-menu');
}

const CONTEXTMENU_DIV = document.getElementById('contextMenu');
CONTEXTMENU_DIV?.addEventListener('contextmenu', handlerContextMenu)
