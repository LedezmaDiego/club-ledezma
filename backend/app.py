from flask import Flask
from flask_cors import CORS
from config import DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
from routes.auth_routes import auth_bp
import pymysql

app = Flask(__name__)

# CORS
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})


# Conexión a MySQL
def get_db():
    return pymysql.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME,
        cursorclass=pymysql.cursors.DictCursor
    )

# Registrar rutas (blueprints)
app.register_blueprint(auth_bp, url_prefix="/auth")

@app.route("/")
def home():
    return "Backend funcionando."

if __name__ == "__main__":
    app.run(debug=True)
