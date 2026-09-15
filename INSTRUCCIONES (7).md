# Cómo activar la sincronización entre el técnico y el supervisor

Esta variante necesita un backend gratuito (Firebase) para que los datos que
guarda el técnico en su celular se vean en tiempo real en el dispositivo del
supervisor. Son 4 pasos, ~10 minutos, sin tarjeta de crédito.

## 1. Crear el proyecto de Firebase
1. Ve a **https://console.firebase.google.com**
2. Clic en **"Agregar proyecto"**, ponle un nombre (ej: `plantas-claro-costa`)
3. Puedes desactivar Google Analytics (no se necesita)
4. Clic en "Crear proyecto"

## 2. Activar Firestore (la base de datos)
1. En el menú izquierdo: **Compilación → Firestore Database**
2. Clic en **"Crear base de datos"**
3. Elige una ubicación cercana (ej. `southamerica-east1` — São Paulo, o
   `us-central1` si no aparece una más cercana)
4. Elige **"Iniciar en modo de prueba"** (esto da acceso abierto por 30 días;
   ver la sección de seguridad más abajo para dejarlo permanente y protegido)

## 3. Obtener las credenciales del proyecto (firebaseConfig)
1. Clic en el ícono de engranaje ⚙️ (arriba a la izquierda) → **"Configuración
   del proyecto"**
2. Baja hasta **"Tus apps"** → clic en el ícono **`</>`** (Web)
3. Ponle un apodo (ej: `app-tecnico`) y clic en **"Registrar app"**
4. Copia el objeto `firebaseConfig` que te muestra, algo así:

```js
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "plantas-claro-costa.firebaseapp.com",
  projectId: "plantas-claro-costa",
  storageBucket: "plantas-claro-costa.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

## 4. Pegarlo en la app
Abre `index.html` de esta carpeta, busca el bloque que dice:

```js
const firebaseConfig = {
    apiKey: "PEGA_AQUI_TU_API_KEY",
    ...
};
```

Y reemplázalo completo por el que copiaste de Firebase. Guarda el archivo.

Listo — ya puedes subir esta carpeta a un hosting (ver más abajo) y usarla
desde el celular del técnico y el del supervisor: ambos verán los mismos
datos en tiempo real.

---

## Seguridad de la base de datos (importante)
El "modo de prueba" de Firestore deja la base de datos **abierta a
cualquiera con el enlace** y expira a los 30 días. Para un uso interno de
equipo, en **Firestore Database → Reglas**, puedes usar unas reglas simples
como estas (siguen siendo abiertas, pero sin fecha de vencimiento):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

Esto es aceptable si el enlace de la app solo circula internamente en tu
equipo. Si más adelante quieres restringirlo por usuario (ej. solo técnicos
autenticados), se puede agregar Firebase Authentication — avísame y lo
armamos.

## Sobre el consumo (plan gratuito "Spark")
Firebase da gratis 50,000 lecturas y 20,000 escrituras por día — de sobra
para uso normal de un equipo de técnicos. El único caso que consume más es
dejar el "Modo supervisor" abierto viendo una OT en vivo durante muchas
horas seguidas (se actualiza cada 6 segundos), ya que cada actualización
lee la OT completa. Si tu equipo lo usará de forma intensiva y constante,
aumenta el intervalo en `index.html` (busca `}, 6000);` dentro de
`startLiveRefresh` y súbelo, por ejemplo a `15000` — 15 segundos).

## Publicar la app (para que tenga una URL y se pueda instalar)
Sube esta carpeta completa (`index.html`, `manifest.json`, `sw.js`, los
íconos) a un hosting gratuito:
- **Firebase Hosting** (recomendado, ya tienes la cuenta): en la consola de
  Firebase → Hosting → seguir el asistente
- O **Netlify Drop** (netlify.com/drop): arrastra la carpeta y listo

Luego, para empaquetarla como APK instalable, usa **pwabuilder.com** con la
URL donde quedó publicada (Package for stores → Android).
