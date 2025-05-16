from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return {"message": "Bienvenido a TeachLog"}

if __name__ == "__main__":
    app.run(port=5000, debug=True)