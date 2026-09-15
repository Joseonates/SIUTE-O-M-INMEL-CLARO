# Cómo activar esta versión (archivo único)

Esta carpeta contiene la Suite completa — selector, Plantas Eléctricas y
Emergencias/Correctivo — **fusionados en un solo `index.html`**. Ya no hay
carpetas `plantas/` ni `emergencias/`: todo vive en un único archivo, junto
con `manifest.json`, `sw.js` y los íconos, todos al mismo nivel (sin ninguna
carpeta). Esto se hizo así a propósito para que subir la app a GitHub (o
cualquier otro hosting) sea a prueba de errores — no hay forma de que una
carpeta se "desordene" al subirla, porque no existen carpetas.

## 1. Crear el proyecto de Firebase (si no tienes uno)
1. Ve a **https://console.firebase.google.com**
2. "Agregar proyecto" → nómbralo, por ejemplo `claro-om-suite`
3. Desactiva Google Analytics si te lo pregunta (no se necesita)
4. Espera a que se cree

## 2. Activar Firestore Database
1. Menú izquierdo → **Compilación → Firestore Database → Crear base de datos**
2. Elige una ubicación cercana (ej. `southamerica-east1`)
3. Elige **"Iniciar en modo de prueba"**

## 3. Obtener el firebaseConfig
1. Ícono de engranaje ⚙️ → **Configuración del proyecto**
2. "Tus apps" → ícono **`</>`** (Web) → ponle un apodo → "Registrar app"
3. Copia el bloque `const firebaseConfig = {...}` que te muestra

## 4. Pegarlo — ahora solo en UN lugar
Abre `index.html`, busca el bloque cerca del inicio que dice:

```js
const firebaseConfig = {
    apiKey: "PEGA_AQUI_TU_API_KEY",
    ...
};
```

Reemplázalo completo por el que copiaste. **A diferencia de la versión
anterior (con carpetas), ahora solo hay que hacer esto una vez** — antes
había que repetirlo en tres archivos distintos; con el archivo único ya no
hace falta.

## 5. Cambiar las contraseñas antes de usarla en producción
Busca estas dos líneas cerca del inicio del bloque del selector:

```js
const ADMIN_PASSWORD = "admin2026";
const MASTER_ADMIN_PASSWORD = "maestro2026";
```

Cámbialas por contraseñas propias. Recuerda que son un candado simple, no
autenticación segura real — cualquiera con el código fuente puede verlas.

## Subir a tu servidor (GitHub, Netlify, etc.)
Sube estos 5 archivos **sueltos, sin meterlos en ninguna carpeta**:

```
index.html
manifest.json
sw.js
icon-192.png
icon-512.png
```

En GitHub, esto se puede arrastrar directo a "Add file → Upload files" sin
preocuparte por carpetas — no hay ninguna que preservar.

## Qué cambió por dentro (para referencia técnica)
- El selector, Plantas Eléctricas y Emergencias siguen siendo tres módulos
  de código independientes (cada uno en su propio bloque `<script>`, con
  sus propias variables — no se mezclan entre sí), solo que ahora viven en
  el mismo archivo en vez de en archivos separados.
- Al elegir una plantilla, ya no se carga dentro de un iframe — el propio
  JavaScript de la página cambia lo que se muestra. Esto además solucionó
  el problema anterior del GPS bloqueado por el iframe: ahora la
  geolocalización funciona de forma nativa, sin permisos especiales.
- La sincronización con Firebase, los roles de usuario, el administrador
  maestro, el bloqueo por ubicación de Plantas, los videos de soporte —
  todo funciona exactamente igual que antes. Nada de eso cambió, solo la
  forma en que los archivos están organizados.

## Aviso de seguridad (igual que siempre)
La contraseña de administrador es un candado simple, no autenticación
segura real — cualquiera que revise el código fuente puede verla o
cambiarla. Es razonable para control de acceso interno de equipo, no para
proteger información verdaderamente sensible.
