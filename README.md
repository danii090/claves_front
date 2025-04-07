
# Frontend Gestor de Claves 🔐

Este proyecto es el frontend de una aplicación para gestión de claves. Usa **Vite** como herramienta de desarrollo para lograr una estructura modular y eficiente.

---

## 📦 Requisitos

- Node.js (versión recomendada: 18 o superior)
- npm (incluido con Node)

---

## 🚀 Instalación

1. Clona el repositorio (si no lo has hecho):

   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   cd FRONTEND-GESTOR-CLAVES
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

---

## ▶️ Levantar el servidor de desarrollo

```bash
npm run dev
```

Esto abrirá el navegador en la siguiente URL:

```
http://localhost:5173/src/index.html
```

Desde ahí puedes navegar a:

- `index.html` → Página de inicio de sesión  
- `dashboard.html` → Panel principal (acceso después de iniciar sesión)

---

## ⚙️ Estructura del proyecto

```
FRONTEND-GESTOR-CLAVES/
├─ public/              → Archivos públicos (imágenes, íconos, etc.)
├─ src/                 → Archivos fuente
│  ├─ css/              → Estilos personalizados
│  ├─ img/              → Imágenes del sitio
│  ├─ js/               → Lógica con JavaScript
│  ├─ index.html        → Página de inicio de sesión
│  └─ dashboard.html    → Panel de administración
├─ vite.config.js       → Configuración de Vite
├─ package.json         → Dependencias y scripts
└─ README.md            → Esta documentación
```

---

## 🌐 Conexión al backend

Este frontend se conecta a una API hecha con Express que debe estar corriendo en:

```
http://localhost:3000
```

Asegúrate de:

- Correr el backend primero (`npm start` o `node app.js`)
- Tener habilitado CORS con `credentials: true` en tu backend
- Tener `withCredentials: true` en tus peticiones desde el frontend (por ejemplo con Axios)

---

## 🛠️ Construcción para producción

```bash
npm run build
```

Los archivos finales estarán en la carpeta `dist/`.

---

## 💡 Notas

- Si no necesitas el archivo `index.html` que está en la raíz del proyecto, puedes eliminarlo.
- Este proyecto usa múltiples páginas HTML (no SPA), por lo que cada HTML se configura individualmente en `vite.config.js`.

---