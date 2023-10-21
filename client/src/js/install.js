const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevents the default browser prompt to install the PWA
    window.deferredPrompt = event;
    // event.preventDefault(); 
    // deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // installation prompt
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
    
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the PWA installation');
        }
        // Reset the deferred prompt variable to null as it can only be used once.
        
        deferredPrompt = null; 
        butInstall.classList.toggle('hidden', true);
      }
    
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('App has been installed.');
    window.deferredPrompt = null;

});