from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
from models import setup_db, db
from routes import all_blueprints

load_dotenv()

app = Flask(__name__)
CORS(app)

setup_db(app)

for bp in all_blueprints:
    app.register_blueprint(bp)

@app.route("/")
def index():
    return {"message": "Hello from Flask + DB!"}

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(port=5000, debug=True)
