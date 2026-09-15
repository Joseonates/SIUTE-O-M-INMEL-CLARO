const CACHE_NAME = "emergencias-claro-firebase-v9";
const APP_SHELL = [
  "./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png",
  "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js",
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js",
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"
];
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) =>
    Promise.all(APP_SHELL.map((url) => fetch(url, { mode: "no-cors" }).then((res) => cache.put(url, res)).catch(() => {})))
  ));
  self.skipWaiting();
});
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (event.request.url.includes("firestore.googleapis.com")) return;
  event.respondWith(
    fetch(event.request).then((networkRes) => {
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkRes.clone()));
      return networkRes;
    }).catch(() => caches.match(event.request))
  );
});
