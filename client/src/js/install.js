const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevents the default browser prompt to install the PWA
  window.deferredPrompt = event;
  // event.preventDefault(); 
  // deferredPrompt = event;
  butInstall.classList.toggle('hidden', false);
  console.log('beforeinstallprompt fired');
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  const eventPrompt = window.deferredPrompt;
  // installation prompt
  if (!eventPrompt) {
    return;
  }
    eventPrompt.prompt();
    window.deferredPrompt = null;
    butInstall.classList.toggle('hidden', true);
    console.log('butInstall clicked');
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('App has been installed.');
  window.deferredPrompt = null;
  console.log('appinstalled fired');
});