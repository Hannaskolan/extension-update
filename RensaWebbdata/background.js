// Funktion som hämtar listan med domäner från config.json
async function getDomains() {
  try {
    const url = chrome.runtime.getURL('config.json');
    const res = await fetch(url);
    const data = await res.json();
    return data.domains || [];
  } catch (e) {
    console.error('Kunde inte läsa config.json:', e);
    return [];
  }
}

// Rensar alla datatyper för en given origin
async function clearForOrigin(origin) {
  try {
    // 1) Rensa med browsingData (localStorage, IndexedDB, cache, service workers)
    await chrome.browsingData.remove(
      { origins: [origin] },
      {
        cookies: true,
        indexedDB: true,
        localStorage: true,
        cacheStorage: true,
        serviceWorkers: true
      }
    );

    // 2) Rensa cookies med chrome.cookies (för HttpOnly också)
    const url = new URL(origin);
    const domain = url.hostname;
    const baseDomain = domain.split('.').slice(-2).join('.');
    const domainsToClear = new Set([domain, `.${domain}`, baseDomain, `.${baseDomain}`]);

    for (const d of domainsToClear) {
      const cookies = await chrome.cookies.getAll({ domain: d.replace(/^\./, '') });
      for (const c of cookies) {
        const proto = c.secure ? 'https:' : 'http:';
        const cookieUrl = `${proto}//${c.domain.startsWith('.') ? c.domain.slice(1) : c.domain}${c.path}`;
        try {
          await chrome.cookies.remove({ url: cookieUrl, name: c.name, storeId: c.storeId });
        } catch (e) {
          console.warn('Misslyckades ta bort cookie', c.name, e);
        }
      }
    }

    console.log('Rensade data för', origin);
  } catch (e) {
    console.error('Fel vid rensning av', origin, e);
    throw e;
  }
}

// Lyssnar på meddelande från popup.js
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  (async () => {
    if (msg?.type === 'CLEAR_ALL_DOMAINS') {
      try {
        const domains = await getDomains();
        for (const origin of domains) {
