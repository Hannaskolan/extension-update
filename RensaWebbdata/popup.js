//document.addEventListener('DOMContentLoaded', () => {
//  const clearBtn = document.getElementById('clearBtn');
//  const status = document.getElementById('status');
//
// console.log("Popup loaded"); // Loggar när popupen laddas
//
//  clearBtn.addEventListener('click', () => {
//    console.log("Clear button clicked"); // Loggar klicket
//
    // Här anger du vilka domäner som ska rensas
//    const domains = ["mip.se"]; 
//
//   const since = new Date();
//    since.setFullYear(since.getFullYear() - 1); // Rensa upp till 1 år tillbaka

//    chrome.browsingData.remove({
//      origins: domains.map(domain => `https://${domain}`),
//      since: since.getTime()
//    }, {
//      cookies: true,
//      localStorage: true,
//      indexedDB: true,
//      cache: true
//    }, () => {
//      console.log("Data cleared"); // Loggar när det är klart
//      status.textContent = "Webbdata rensad!";
//      setTimeout(() => status.textContent = "", 3000);
//    });
//  });
// });

document.addEventListener("DOMContentLoaded", () => {
  console.log("Popup laddad");

  const clearBtn = document.getElementById("clearBtn");
  const statusEl = document.getElementById("status");

  clearBtn.addEventListener("click", async () => {
    console.log("Knapp klickad – startar rensning");

    try {
      // Lista av domäner att rensa
      const domains = ["https://mip.se", "https://example.com"];
      console.log("Domäner att rensa:", domains);

      // Skapa filter för varje domän och rensa
      for (const domain of domains) {
        console.log(`Försöker rensa data för: ${domain}`);
        await chrome.browsingData.remove(
          { origins: [domain] },
          {
            cookies: true,
            localStorage: true,
            indexedDB: true,
            cache: true,
            serviceWorkers: true
          }
        );
        console.log(`✅ Rensning klar för: ${domain}`);
      }

      statusEl.textContent = "Webbdata rensad!";
      console.log("🎉 All rensning slutförd");
    } catch (err) {
      console.error("⚠️ Fel vid rensning:", err);
      statusEl.textContent = "Fel vid rensning, se konsolen";
    }
  });
});
