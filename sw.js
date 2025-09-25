// sw.js
var nombreCache = 'cache1';

self.addEventListener(
  'install', 
  function(evento) {
    evento.waitUntil(
      caches.open(nombreCache)
        .then(function(cache) {
          cache.addAll(
            [
              'index.html',
              'bootstrap-5.0.2-dist/css/bootstrap.min.css',
              'bootstrap-5.0.2-dist/js/bootstrap.bundle.min.js',
              'lib1.js',
              'lib2.js',
              'hola.jpg',
              'perro.jpg',
              'utp.png'
            ]
          );
        })
    );
  }
);

self.addEventListener(
  'fetch',
  function(evento) {
    // Si la URL solicitada termina en .jpg (Expresión Regular: /\.jpg$/)
    // Se comenta: // http://localhost/pwasd25/pwa2/index.jpg > unicorn.jpg
    if (/\.jpg$/.test(evento.request.url)) {
      evento.respondWith(
        fetch('perro.jpg')
      );
    }
    // Si la URL solicitada termina en .png (Expresión Regular: /\.png$/)
    // Se comenta: // http://localhost/pwasd25/pwa2/index.png > utp.png
    else if (/\.png$/.test(evento.request.url)) {
      evento.respondWith(
        fetch('utp.png')
      );
    }
    // Para cualquier otra solicitud (ej. HTML, CSS, JS, etc.)
    else {
      evento.respondWith(
        caches.match(evento.request)
          .then(function(respuesta) {
            if (respuesta) {
              return respuesta; // Si está en caché, devuelve la respuesta de caché
            }
            return fetch(evento.request); // Si no está en caché, realiza la solicitud de red
          })
      );
    }
  }
);
