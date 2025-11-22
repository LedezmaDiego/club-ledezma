from flask import Blueprint, request, jsonify
from config import DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
import pymysql
import bcrypt
from datetime import datetime

auth_bp = Blueprint("auth", __name__)

def get_db():
    return pymysql.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME,
        cursorclass=pymysql.cursors.DictCursor
    )

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json

    full_name = data.get("fullName")
    email = data.get("email")
    password = data.get("password")

    hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    try:
        db = get_db()
        cursor = db.cursor()

        sql = """
            INSERT INTO users (full_name, email, password_hash, created_at)
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(sql, (full_name, email, hashed, datetime.now()))
        db.commit()

        return jsonify({"message": "Usuario registrado correctamente"}), 201

    except pymysql.err.IntegrityError:
        return jsonify({"error": "El correo ya está registrado"}), 409

    except Exception as e:
        return jsonify({"error": "Error en el servidor"}), 500

    finally:
        cursor.close()
        db.close()


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json

    email = data.get("email")
    password = data.get("password")

    db = get_db()
    cursor = db.cursor()

    cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
    user = cursor.fetchone()

    if not user:
        return jsonify({"error": "El correo no está registrado"}), 400

    if not bcrypt.checkpw(password.encode("utf-8"), user["password_hash"].encode("utf-8")):
        return jsonify({"error": "Contraseña incorrecta"}), 400

    return jsonify({
        "message": "Inicio de sesión exitoso",
        "full_name": user["full_name"],
        "email": user["email"]
    }), 200
