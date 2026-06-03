// Hinweis: Polyfills-Loader für ältere Browser und WebViews.
// Diese Datei wird dynamisch eingebunden, wenn der Client keine
// modernen APIs (fetch, AbortController, CustomEvent) bereitstellt.
// Der Loader lädt schlanke CDN-Shims, um die Laufzeitkompatibilität zu erhöhen.
(function(){
  if (typeof window === 'undefined') return;

  function loadScript(src){
    var s = document.createElement('script');
    s.src = src;
    s.async = false;
    document.head.appendChild(s);
  }

  // fetch polyfill
  if (!window.fetch) {
    loadScript('https://cdn.jsdelivr.net/npm/whatwg-fetch@3.6.2/dist/fetch.umd.js');
  }

  // AbortController polyfill
  if (typeof window.AbortController === 'undefined') {
    loadScript('https://cdn.jsdelivr.net/npm/abortcontroller-polyfill@2.0.2/dist/abortcontroller-polyfill-only.js');
  }

  // CustomEvent for older browsers
  (function () {
    if (typeof window.CustomEvent === 'function') return false;
    function CustomEvent(event, params) {
      params = params || { bubbles: false, cancelable: false, detail: null };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    }
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
  })();

  // Intl fallback is large; only warn if missing
  if (typeof Intl === 'undefined') {
    console.warn('Intl not available - consider adding full-icu or polyfills for older browsers');
  }
})();
