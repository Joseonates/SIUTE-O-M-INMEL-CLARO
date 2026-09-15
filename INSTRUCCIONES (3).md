# Cómo activar la sincronización entre el técnico y el supervisor

Esta variante necesita un backend gratuito (Firebase) para que los datos que
guarda el técnico en su celular se vean en tiempo real en el dispositivo del
supervisor. Son 4 pasos, ~10 minutos, sin tarjeta de crédito.

Si ya creaste un proyecto de Firebase para la app de Plantas Eléctricas,
**puedes reutilizar el mismo proyecto** para esta app de Emergencias (usan
colecciones separadas internamente, no chocan entre sí) — en ese caso solo
copia el mismo `firebaseConfig` que ya tienes y ve directo al paso 4.

## 1. Crear el proyecto de Firebase
1. Ve a **https://console.firebase.google.com**
2. Clic en **"Agregar proyecto"**, ponle un nombre (ej: `claro-om-emergencias`)
3. Puedes desactivar Google Analytics (no se necesita)
4. Clic en "Crear proyecto"

## 2. Activar Firestore (la base de datos)
1. En el menú izquierdo: **Compilación → Firestore Database**
2. Clic en **"Crear base de datos"**
3. Elige una ubicación cercana (ej. `southamerica-east1` — São Paulo)
4. Elige **"Iniciar en modo de prueba"**

## 3. Obtener las credenciales del proyecto (firebaseConfig)
1. Clic en el ícono de engranaje ⚙️ → **"Configuración del proyecto"**
2. Baja hasta **"Tus apps"** → clic en el ícono **`</>`** (Web)
3. Ponle un apodo (ej: `app-emergencias`) y clic en **"Registrar app"**
4. Copia el objeto `firebaseConfig` que te muestra

## 4. Pegarlo en la app
Abre `index.html` de esta carpeta, busca el bloque que dice:

```js
const firebaseConfig = {
    apiKey: "PEGA_AQUI_TU_API_KEY",
    ...
};
```

Y reemplázalo completo por el que copiaste de Firebase. Guarda el archivo.

---

## Seguridad de la base de datos
El "modo de prueba" expira a los 30 días. Para dejarlo abierto de forma
permanente (uso interno de equipo), en **Firestore Database → Reglas**:

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

## Publicar la app
Sube esta carpeta completa a un hosting gratuito (Firebase Hosting, o
Netlify Drop en netlify.com/drop), y luego usa **pwabuilder.com** con esa
URL para generar el APK instalable (Package for stores → Android).
