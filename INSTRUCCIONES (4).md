# Cómo activar esta suite con control de acceso real

Esta carpeta trae 3 aplicaciones que deben compartir el MISMO proyecto de
Firebase para funcionar como un conjunto:

- `index.html` (la entrada / selector con autorización de usuarios)
- `plantas/index.html` (Mantenimiento Preventivo — Plantas Eléctricas)
- `emergencias/index.html` (Mantenimiento Correctivo y Emergencias)

Si ya configuraste Firebase para alguna app anterior (Plantas, Emergencias
o el Catálogo de Belleza), **puedes reutilizar ese mismo proyecto** — el
único paso es pegar el mismo `firebaseConfig` en los 3 archivos de esta
carpeta. Si es la primera vez, sigue estos pasos:

## 1. Crear el proyecto de Firebase
1. Ve a **https://console.firebase.google.com**
2. Clic en **"Agregar proyecto"**, ponle un nombre (ej: `claro-om-suite`)
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
3. Ponle un apodo y clic en **"Registrar app"**
4. Copia el objeto `firebaseConfig` que te muestra

## 4. Pegarlo en LOS TRES archivos
Abre cada uno de estos archivos y reemplaza el bloque `const firebaseConfig = {...}`
por el que copiaste — debe quedar **idéntico en los tres**:

- `index.html`
- `plantas/index.html`
- `emergencias/index.html`

Si el `firebaseConfig` no es el mismo en los tres, cada app quedará
guardando datos en un lugar distinto y nada se va a ver conectado.

---

## Cómo funciona el control de acceso
1. Un técnico abre la app, escribe su **nombre completo** y **número de
   cédula**, y queda en estado "pendiente".
2. El administrador entra tocando **"Soy administrador"** en la pantalla
   de inicio (contraseña por defecto: `admin2026` — **cámbiala** editando
   la constante `ADMIN_PASSWORD` al inicio del script en `index.html`
   antes de usar la app en producción).
3. Desde el panel de administrador puede **autorizar**, **rechazar** o
   **revocar** el acceso de cualquier persona, o crear directamente un
   usuario ya autorizado sin que tenga que solicitarlo primero.
4. Una vez autorizado, el técnico ve el selector de plantillas (Plantas
   Eléctricas / Emergencias) y puede entrar a cualquiera de las dos.

### Aviso de seguridad importante
La contraseña de administrador es un candado simple para evitar que
cualquier técnico entre por accidente al panel — **no es autenticación
segura real**. Cualquier persona que revise el código fuente de la app
(algo que cualquiera puede hacer en una app web) puede ver o cambiar esa
contraseña. Esto es razonable para un control de acceso interno de equipo,
pero no lo uses para proteger información verdaderamente sensible. Si
necesitas autenticación robusta (por ejemplo con Firebase Authentication
y contraseñas individuales por usuario), lo podemos construir aparte.

## Seguridad de la base de datos
El "modo de prueba" expira a los 30 días. Para dejarlo abierto de forma
permanente, en **Firestore Database → Reglas**:

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
Sube la carpeta completa (con las tres subcarpetas) a un hosting gratuito
(Firebase Hosting, o Netlify Drop en netlify.com/drop). Comparte esa URL
con tu equipo — todos entrarán por el mismo selector con el control de
acceso activo. Para generar un APK instalable, usa **pwabuilder.com** con
esa URL (Package for stores → Android).
