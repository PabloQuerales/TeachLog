from datetime import timedelta
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
import os

from models import setup_db, db
from routes import all_blueprints

load_dotenv()

app = Flask(__name__)

# --- CORS ---
# Lee las URLs permitidas desde variable de entorno (separadas por coma)
cors_origins = os.getenv("CORS_ALLOWED_ORIGINS", "http://localhost:5173").split(",")
CORS(app, supports_credentials=True, origins=cors_origins)

# --- Base de datos ---
setup_db(app)

# --- JWT ---
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "TeachLogApp")
app.config["JWT_COOKIE_CSRF_PROTECT"] = True
jwt = JWTManager(app)

# --- Migraciones ---
migrate = Migrate(app, db)

# --- Blueprints ---
for bp in all_blueprints:
    app.register_blueprint(bp)

@app.route("/")
def index():
    return {"message": "Hello from Flask + DB!"}

if __name__ == "__main__":
    app.run(port=5000, debug=True)