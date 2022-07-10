if('serviceWorker' in navigator){
   navigator.serviceWorker.register('./sw.js',
      // {scope:''}
   )
   .then(function(){
      console.log('Service Worker Registered');
   })
}

window.addEventListener('beforeinstallprompt',function(event){
   event.preventDefault()
})
