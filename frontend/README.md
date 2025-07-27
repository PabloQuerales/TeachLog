# ✨ TeachLog: Tu Aliado Perfecto en la Enseñanza ✨

¡Hola! 👋 Bienvenido a **TeachLog**, la aplicación que va a transformar la forma en que gestionas tus clases y a tus increíbles estudiantes. Olvídate del estrés y dale la bienvenida a la eficiencia. ¡Prepárate para llevar un control impecable y ver tus esfuerzos traducidos en resultados claros!

## 🚀 Lo que TeachLog hace por ti (¡y te encantará!) 🚀

- **📚 Gestión de Estudiantes sin Esfuerzo:** ¡Añade, edita y despide a tus estudiantes con un clic! Toda su información, siempre a mano.
- **✏️ Registra Cada Clase, ¡Al Detalle!:** Anota la fecha, la duración y la tarifa por hora de cada sesión. ¡Nunca más te perderás un registro!
- **💰 Balances por Estudiante, ¡Claridad Total!:** Descubre cuánto tiempo y dinero se ha generado con cada uno de tus alumnos. ¡Tus finanzas bajo control!
- **📊 Tu Dashboard Personalizado (¡Visión 360°!):**
  - Clases dictadas y tiempo enseñado este mes.
  - ¡El dinero acumulado en tu bolsillo este mes! 💸
  - Un resumen histórico de todas tus clases, tiempo y ganancias. ¡Tu legado al alcance de tu mano!
- **🔐 Acceso Seguro y Personalizado:** Tu información está protegida. Regístrate y accede para gestionar solo tus datos.
- **💖 Diseño Intuitivo y Amigable:** ¡Usar TeachLog es un placer! Pensado para que tu experiencia sea fluida y agradable.

## 🛠️ Bajo el Capó: La Magia que lo Hace Posible ✨

### Frontend (¡La cara bonita de TeachLog!):

- **React:** Construyendo interfaces de usuario dinámicas y responsivas.
- **Vite:** ¡Un rayo para el desarrollo! Cargas instantáneas y un rendimiento increíble.
- **Zustand:** Nuestra solución ligera y potente para mantener el estado de tu aplicación bajo control.
- **React Router DOM:** Navegación fluida entre tus vistas.
- **Bootstrap:** ¡Estilos profesionales y responsive listos para usar!
- **React-Card-Flip:** ¡Efectos visuales geniales para tus tarjetas informativas!
- **SweetAlert2:** Mensajes de alerta que realmente llaman la atención (¡de la buena!).
- **DiceBear:** Generando avatares únicos y divertidos para cada estudiante.

### Backend (¡El cerebro que lo organiza todo!):

- **Flask:** Un microframework de Python, rápido y robusto para nuestra API.
- **Flask-SQLAlchemy:** Conectando Flask con nuestra base de datos sin esfuerzo.
- **SQLAlchemy:** El poderoso ORM que gestiona nuestras interacciones con la base de datos.

### Base de Datos (¡Donde tus datos viven seguros!):

- **PostgreSQL (gestionado a través de Supabase):** Una base de datos relacional de confianza, escalable y alojada en la nube para que no te preocupes por nada.

## 🚀 ¡Manos a la Obra! Cómo Poner TeachLog en Marcha 🚀

¿Listo para empezar? Sigue estos sencillos pasos:

### Prerrequisitos (¡Lo que necesitas antes de empezar!):

- [Node.js](https://nodejs.org/) (versión LTS recomendada)
- [Python](https://www.python.org/) (versión 3.x recomendada)
- npm (viene con Node.js) o yarn
- pip (viene con Python)

### 1. Backend (¡El corazón de la app!)

1.  **Clona el repositorio (¡tu copia personal!):**
    ```bash
    git clone [https://github.com/PabloQuerales/TeachLog.git](https://github.com/PabloQuerales/TeachLog.git) # ¡Asegúrate de usar el nombre correcto de tu repo!
    cd TeachLog/backend # Entra en el cerebro del proyecto
    ```
2.  **Crea y activa un entorno virtual (¡un espacio de trabajo limpio!):**
    ```bash
    python -m venv .virtualenvs/backend
    # En Windows:
    .virtualenvs\backend\Scripts\activate
    # En macOS/Linux:
    source .virtualenvs/backend/bin/activate
    ```
3.  **Instala las dependencias de Python (¡todo lo que necesita para funcionar!):**
    ```bash
    pip install -r requirements.txt
    ```
    _(Tip: Si no tienes un `requirements.txt`, puedes generarlo con `pip freeze > requirements.txt` después de instalar tus librerías)._
4.  **Configura tu base de datos (¡conéctate a Supabase!):**
    Asegúrate de que tus variables de entorno para la conexión a PostgreSQL de Supabase estén bien configuradas (por ejemplo, `DATABASE_URL`).
    _(Si usas Flask-Migrate para las migraciones, no olvides `flask db init`, `flask db migrate`, `flask db upgrade` si es necesario)._
5.  **¡Inicia el servidor Flask! (¡Que empiece la magia!):**
    ```bash
    flask run
    ```
    Tu backend estará esperando peticiones en `http://127.0.0.1:5000` (o el puerto que hayas configurado).

### 2. Frontend (¡La ventana a tu TeachLog!)

1.  **Navega al directorio del frontend:**
    ```bash
    cd ../frontend # ¡Vamos a la parte visual!
    ```
2.  **Instala las dependencias de Node (¡los ingredientes para la interfaz!):**
    ```bash
    npm install # o yarn install
    ```
3.  **Configura la URL del Backend (¡para que se comuniquen!):**
    Verifica que tu configuración en el frontend apunte a la dirección de tu backend (ej. `http://127.0.0.1:5000`).
4.  **¡Inicia el servidor de desarrollo de React! (¡A ver TeachLog en acción!):**
    ```bash
    npm run dev # o yarn dev
    ```
    Tu TeachLog se abrirá mágicamente en tu navegador (probablemente en `http://localhost:5173` con Vite).

## 🤝 ¿Quieres Contribuir? ¡Únete a la Aventura! 🌟

¡TeachLog está creciendo y nos encantaría tu ayuda! Si tienes ideas, mejoras o encuentras algún bug, no dudes en:

1.  Hacer un "fork" de este repositorio.
2.  Crear una nueva rama para tus geniales cambios (`git checkout -b feature/MiNuevaFuncionalidad`).
3.  Realizar tus cambios y hacer un commit (`git commit -m '¡Añadida una función increíble!'`).
4.  Subir tus cambios (`git push origin feature/MiNuevaFuncionalidad`).
5.  Abrir un Pull Request. ¡Estaremos encantados de revisarlo!

## 📄 Licencia

Este proyecto está bajo la [Licencia MIT](https://opensource.org/licenses/MIT). ¡Libre para usar, modificar y compartir!

## 👤 Autor

¡Con mucho cariño, desarrollado por:

**Pablo Querales**

- GitHub: [https://github.com/PabloQuerales](https://github.com/PabloQuerales)
- LinkedIn: [https://www.linkedin.com/in/pablo-querales/](https://www.linkedin.com/in/pablo-querales/)

---
