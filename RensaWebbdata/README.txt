# Rensa webbdata för utvalda sidor

## 📝 Syfte
Detta tillägg används för att rensa sparad webbdata (cookies, sessioner, localStorage m.m.) på specifika webbsidor som ibland låser sig eller vägrar logga ut korrekt.  
Exempel: [https://mip.se](https://mip.se) och [https://login-digitalt.majema.se](https://login-digitalt.majema.se).

När en elev klickar på tillägget (via pusselbiten → "Rensa webbdata"):
- rensas all sessionsdata för dessa sidor
- webbläsarhistoriken påverkas **inte**
- ett meddelande visas när rensningen är klar

Syftet är att elever ska kunna "nollställa" dessa webbsidor utan att behöva öppna webbläsarens inställningar.

---

## ⚙️ Lägga till fler domäner

1. Öppna filen **`config.json`** i denna mapp.
2. Lägg till domäner i listan under `"domains"`.  
   Varje domän ska ha protokoll (`https://`) och ingen extra slash i slutet.

**Exempel:**
```json
{
  "domains": [
    "https://mip.se",
    "https://login-digitalt.majema.se",
    "https://ny-sajt.se"
  ]
}
