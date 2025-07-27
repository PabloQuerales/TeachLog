from datetime import timedelta
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate  # ← NUEVO
import os

from models import setup_db, db
from routes import all_blueprints

load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=[
    "http://localhost:5173",
    "https://your-frontend-app.netlify.app", # <-- ¡REEMPLAZA ESTO con la URL REAL de tu frontend en Netlify/Vercel!
    "https://your-frontend-app.vercel.app"   # <-- ¡O ESTA si usas Vercel!
])

# Configuración de base de datos
setup_db(app)

# Configuración de JWT
app.config["JWT_SECRET_KEY"] = "TeachLogApp"
app.config["JWT_COOKIE_CSRF_PROTECT"] = True

jwt = JWTManager(app)

# Configuración de migraciones
migrate = Migrate(app, db)  # ← NUEVO

# Registro de blueprints
for bp in all_blueprints:
    app.register_blueprint(bp)

@app.route("/")
def index():
    return {"message": "Hello from Flask + DB!"}

if __name__ == "__main__":
    app.run(port=5000, debug=True)
