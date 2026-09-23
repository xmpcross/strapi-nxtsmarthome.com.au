/* Geniuslink link conversion. Settings come from the script tag's data- attributes (components/HeadScripts.tsx). */
(function () {
  var script = document.currentScript;
  if (!script) return;
  var tsid = Number(script.getAttribute('data-tsid'));
  var baseUrl = script.getAttribute('data-base-url') || 'https://buy.geni.us';
  var preserve = script.getAttribute('data-preserve-existing') === 'true';
  function convert() {
    if (!tsid || !window.Genius || !window.Genius.amazon) return;
    window.Genius.amazon.convertLinks(tsid, preserve, baseUrl);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', convert);
  else convert();
})();
