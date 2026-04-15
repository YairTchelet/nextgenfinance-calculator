(function() {
  // Inject manifest link
  var link = document.createElement('link');
  link.rel = 'manifest';
  link.href = '/manifest.json';
  document.head.appendChild(link);

  // iOS PWA meta tags
  var metaCapable = document.createElement('meta');
  metaCapable.name = 'apple-mobile-web-app-capable';
  metaCapable.content = 'yes';
  document.head.appendChild(metaCapable);

  var metaStatus = document.createElement('meta');
  metaStatus.name = 'apple-mobile-web-app-status-bar-style';
  metaStatus.content = 'black-translucent';
  document.head.appendChild(metaStatus);

  // Register service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').catch(function() {});
    });
  }
})();
