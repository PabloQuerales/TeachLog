from datetime import datetime, timedelta
from flask import Blueprint, jsonify, make_response, request
from models import db, Students, Student_details, User
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from sqlalchemy import extract, func



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
        secure = request.host != "localhost"  # solo secure en prod
        response.set_cookie(
            "access_token_cookie",
            access_token,
            httponly=True,
            secure=secure,
            samesite='None'  # más flexible para frontend separado
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

@users_bp.route("/user_dashboard/<int:user_id>", methods=['GET'])
def teacher_dashboard(user_id):
    students = Students.query.filter_by(user_id=user_id).all()
    
    # Separar activos e inactivos aunque esté vacío
    active_students = [s for s in students if s.status] if students else []
    inactive_students = [s for s in students if not s.status] if students else []

    # Recoger todos los registros
    registros = []
    for student in students:
        student_records = Student_details.query.filter_by(student_id=student.id).all()
        for record in student_records:
            record.student_name = student.name
        registros.extend(student_records)

    now = datetime.now()
    current_month = now.month
    current_year = now.year
    previous_month = current_month - 1 if current_month > 1 else 12
    previous_month_year = current_year if current_month > 1 else current_year - 1

    def ensure_datetime(date_obj):
        if isinstance(date_obj, str):
            try:
                return datetime.fromisoformat(date_obj)
            except ValueError:
                return datetime.strptime(date_obj, "%Y-%m-%d")
        return date_obj

    def is_same_month(date_obj, month, year):
        date_obj = ensure_datetime(date_obj)
        return date_obj.month == month and date_obj.year == year

    total_classes = len(registros)
    total_time = sum([r.time for r in registros]) if registros else 0
    total_earned = sum([r.hourly_rate * r.time for r in registros]) if registros else 0

    current_month_classes = [r for r in registros if is_same_month(r.date, current_month, current_year)]
    previous_month_classes = [r for r in registros if is_same_month(r.date, previous_month, previous_month_year)]

    last_records = sorted(registros, key=lambda r: ensure_datetime(r.date), reverse=True)[:5] if registros else []

    response = {
        "profile": {
            "students_count": len(students),
            "active_students": len(active_students),
            "inactive_students": len(inactive_students)
        },
        "summary": {
            "total_classes": total_classes,
            "total_hours": total_time,
            "current_month_classes": len(current_month_classes),
            "current_month_hours": sum([r.time for r in current_month_classes]),
            "previous_month_classes": len(previous_month_classes),
            "previous_month_hours": sum([r.time for r in previous_month_classes])
        },
        "balance": {
            "total_earned": total_earned,
            "current_month": sum([r.hourly_rate * r.time for r in current_month_classes]),
            "previous_month": sum([r.hourly_rate * r.time for r in previous_month_classes])
        },
        "last_records": [
            {
                "date": ensure_datetime(r.date).strftime('%Y-%m-%d'),
                "amount": r.hourly_rate * r.time,
                "duration": r.time,
                "student_name": r.student_name
            }
            for r in last_records
        ]
    }

    return jsonify(response)

@users_bp.route("/ping")
def ping():
    return "pong", 200