from datetime import timedelta
from flask import Blueprint, jsonify, make_response, request
from models import User,db
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required


users_bp = Blueprint('users_bp', __name__)
bcrypt = Bcrypt()

@users_bp.route("/singup", methods=["POST"])
def singup():
    body = request.json
    email = db.session.query(db.select(User).filter_by(email=body.get("email")).exists()).scalar()
    if email:
        return jsonify({"msg": "correo en uso"}), 406
    if not body or not body.get("email") or not body.get("password") or not body.get("last_name")or not body.get("first_name"):
        return jsonify({"msg": "body incompleto"}), 400
    hashe_password = bcrypt.generate_password_hash(body["password"]).decode("utf-8")
    new_user = User(email = body["email"],password=hashe_password, last_name= body["last_name"],first_name= body["first_name"])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "usuario creado"}), 200

@users_bp.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    try:
        user = db.session.execute(db.select(User).filter_by(email=email)).scalar_one()
        if not bcrypt.check_password_hash(user.password, password):
            return jsonify({"msg": "email o contraseña equivocados"}), 401
        access_token = create_access_token(identity=str(user.id), expires_delta=timedelta(minutes=30))        
        response = make_response(jsonify({"user_id": user.id}))
        response.set_cookie(
            "access_token_cookie",
            access_token,
            httponly=True,
            secure=False,    # en desarrollo lo dejamos False; en prod: True con HTTPS
            samesite='Strict'
        )
        return response
    except:
        return jsonify({"msg": "este usuario no existe"}), 404

@users_bp.route("/protected", methods=["GET"])
@jwt_required(locations=["cookies"])
def protected():
    current_user = get_jwt_identity()
    user = db.session.execute(db.select(User).filter_by(id=current_user)).scalar_one()
    return jsonify(user.serialize()), 200

@users_bp.route("/logout", methods=["POST"])
def logout():
    response = make_response(jsonify({"msg": "Sesión cerrada"}))
    response.delete_cookie("access_token_cookie", samesite='Strict')
    return response

@users_bp.route("/users/<string:email>", methods=["PUT"])
def edit_user(email):
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "usuario no encontrado"}), 404
    body = request.json
    if not body:
        return jsonify({"msg": "body vacio"}), 400
    if "email" in body:
        user.email = body["email"]
    if "first_name" in body:
        user.first_name = body["first_name"]
    if "last_name" in body:
        user.last_name = body["last_name"]
    if "password" in body:
        user.password = bcrypt.generate_password_hash(body["password"]).decode("utf-8")
    db.session.commit()
    return jsonify({"msg": "usuario actualizado"}), 200

@users_bp.route("/users/<string:email>", methods=["DELETE"])
def delete_user(email):
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "usuario no encontrado"}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({"msg": "usuario eliminado"}), 200

@users_bp.route("/ping")
def ping():
    return "pong", 200