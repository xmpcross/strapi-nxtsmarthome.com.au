/*
 * Geniuslink link conversion. Settings come from the script tag's data- attributes (components/HeadScripts.tsx).
 *
 * The snippet converts the links that are in the DOM when it runs, once. Next.js
 * renders later pages client-side, so a MutationObserver reruns the conversion
 * whenever new nodes arrive. Already-converted (geni.us) links are skipped by the
 * snippet itself, so rerunning is safe.
 */
(function () {
  var script = document.currentScript;
  if (!script) return;
  var tsid = Number(script.getAttribute('data-tsid'));
  var baseUrl = script.getAttribute('data-base-url') || 'https://buy.geni.us';
  // Second argument to convertLinks is Geniuslink's passDtb flag (env: NEXT_PUBLIC_GENIUSLINK_PRESERVE_EXISTING).
  var preserve = script.getAttribute('data-preserve-existing') === 'true';
  function convert() {
    if (!tsid || !window.Genius || !window.Genius.amazon) return;
    window.Genius.amazon.convertLinks(tsid, preserve, baseUrl);
  }
  var pending = 0;
  function schedule() {
    if (pending) return;
    pending = window.setTimeout(function () {
      pending = 0;
      convert();
    }, 150);
  }
  function start() {
    convert();
    if (!window.MutationObserver || !document.body) return;
    new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        if (mutations[i].addedNodes.length || mutations[i].type === 'attributes') return schedule();
      }
    }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['href'] });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
