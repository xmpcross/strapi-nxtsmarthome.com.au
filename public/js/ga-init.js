/* Google tag bootstrap with Consent Mode v2. The id comes from the script tag's data-ga-id (components/HeadScripts.tsx). */
(function () {
  var script = document.currentScript;
  var id = script && script.getAttribute('data-ga-id');
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  var gtag = window.gtag;
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500
  });
  try {
    if (window.localStorage.getItem('nxt.consent.v2') === 'granted') {
      gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted'
      });
    }
  } catch (e) {}
  gtag('js', new Date());
  if (id) gtag('config', id);

  // gtag.js after load, when the main thread is free. The commands above are
  // queued in dataLayer and run in order once it arrives.
  if (!id) return;
  function loadTag() {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(s);
  }
  function whenIdle() {
    if ('requestIdleCallback' in window) window.requestIdleCallback(loadTag, { timeout: 4000 });
    else window.setTimeout(loadTag, 1500);
  }
  if (document.readyState === 'complete') whenIdle();
  else window.addEventListener('load', whenIdle, { once: true });
})();
