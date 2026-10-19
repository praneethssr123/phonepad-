/* PhonePad cookie consent.
   Essential-only by default; nothing non-essential is set or read before consent. */
(function () {
  "use strict";

  var KEY = "phonepad.consent.v1";
  var banner, prefs, analyticsPref;

  function readConsent() {
    try {
      var raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function storeConsent(consent) {
    consent.version = 1;
    consent.timestamp = new Date().toISOString();
    try {
      localStorage.setItem(KEY, JSON.stringify(consent));
    } catch (e) { /* storage unavailable (private mode/iframe): ignore */ }
  }

  function applyConsent(consent) {
    // Load non-essential scripts only with valid explicit consent.
    if (consent.analytics === true) {
      document.dispatchEvent(new CustomEvent("phonepad:consent-analytics", { detail: consent }));
    }
  }

  function showBanner() {
    var consent = readConsent();
    if (consent && consent.version === 1) {
      if (analyticsPref) analyticsPref.checked = !!consent.analytics;
      if (prefs) prefs.classList.toggle("open", !!consent.customized);
      applyConsent(consent);
      return;
    }
    if (banner) banner.hidden = false;
  }

  function save(mode) {
    var consent = readConsent();
    if (!consent || consent.version !== 1) consent = { essential: true, analytics: false, customized: false };
    if (mode === "accept-all") {
      consent.analytics = true;
      storeConsent(consent);
    } else if (mode === "reject") {
      consent.analytics = false;
      storeConsent(consent);
    } else if (mode === "save-preferences") {
      consent.analytics = !!(analyticsPref && analyticsPref.checked);
      consent.customized = true;
      storeConsent(consent);
    } else if (mode === "open-prefs") {
      if (prefs) prefs.classList.add("open");
      if (banner) banner.hidden = false;
      return;
    } else {
      return;
    }
    if (banner) banner.hidden = true;
    applyConsent(readConsent());
  }

  document.addEventListener("click", function (evt) {
    var btn = evt.target.closest ? evt.target.closest("[data-consent]") : null;
    if (btn) {
      save(btn.getAttribute("data-consent"));
      return;
    }
    var link = evt.target.closest ? evt.target.closest("[data-cookie-settings]") : null;
    if (link) {
      evt.preventDefault();
      save("open-prefs");
    }
  });

  function init() {
    banner = document.getElementById("cookie-banner");
    prefs = banner ? banner.querySelector(".cookie-preferences") : null;
    analyticsPref = document.getElementById("pref-analytics");
    showBanner();
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
