self.addEventListener('install',function(event){
   console.log('Service Worker Installing',event);
})
self.addEventListener('activate',function(event){
   console.log('Service Worker Installing',event);
   return self.clients.claim()
})

self.addEventListener('fetch',function(event){
   console.log('Service Worker fetching something...',event);
})