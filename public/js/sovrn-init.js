/*
 * Sovrn Commerce (VigLink), consent-gated. The key comes from the script tag's
 * data-key (components/HeadScripts.tsx).
 *
 * Nothing loads by itself: this parks a loader on window.__nxtLoadSovrn, which
 * the cookie banner calls on "Accept". A reader who accepted on an earlier visit
 * (nxt.consent.v1 = granted) gets it straight away.
 */
(function () {
  var script = document.currentScript;
  var key = script && script.getAttribute('data-key');
  if (!key) return;
  var loaded = false;
  window.__nxtLoadSovrn = function () {
    if (loaded) return;
    loaded = true;
    window.vglnk = { key: key };
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = 'https://cdn.viglink.com/api/vglnk.js';
    var r = document.getElementsByTagName('script')[0];
    r.parentNode.insertBefore(s, r);
  };
  try {
    if (window.localStorage.getItem('nxt.consent.v1') === 'granted') window.__nxtLoadSovrn();
  } catch (e) {}
})();
