# Hosting Nexus World v5

All files in this zip are the whole game. Host them at a site root over HTTPS (any static host), open the link on a phone and choose Install app / Add to Home Screen. `_headers` serves the manifest as application/manifest+json and sw.js as no-cache (Netlify and Cloudflare Pages read it). The game makes no network calls; saves stay in each player's browser (localStorage keys nexusworldv5.save and nexusworldv5.settings). After an update upload all files again; the service worker cache name changes automatically.
