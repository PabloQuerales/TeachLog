from flask import Blueprint, jsonify, request
from models import db, Students, User

students_bp = Blueprint('students_bp', __name__)

@students_bp.route("/students/<int:user_id>", methods=["GET"])
def get_all_students(user_id):
    exists_user = db.session.query(db.select(User).filter_by(id=user_id).exists()).scalar()
    if exists_user:
        students = db.session.scalars(db.select(Students).filter_by(user_id=user_id, status=True).order_by(Students.id)).all()
        result = [student.serialize() for student in students]
        return jsonify(result), 200
    else:
        return jsonify({"msg": "Usuario no existente"}), 401

@students_bp.route("/student/<int:student_id>", methods=["GET"])
def get_single_student(student_id):
    student = db.session.get(Students, student_id)
    if not student:
        return jsonify({"msg": "Estudiante no encontrado"}), 404
    return jsonify(student.serialize()), 200

@students_bp.route("/new_student/<int:user_id>", methods=["POST"])
def post_new_student(user_id):
    try:
        request_body = request.json

        # Buscar si ya existe un estudiante con ese nombre y ese user_id
        existing_student = Students.query.filter_by(name=request_body["name"], user_id=user_id).first()

        if existing_student:
            if existing_student.status:
                return jsonify({"msg": "Ya existe un estudiante activo con ese nombre"}), 400
            else:
                # Reactivar estudiante desactivado
                existing_student.coin = request_body["coin"]
                existing_student.price = request_body["price"]
                existing_student.level = request_body["level"]
                existing_student.contact_name = request_body["contact_name"]
                existing_student.contact_phone = request_body["contact_phone"]
                existing_student.status = True
                db.session.commit()
                return jsonify({"msg": "Estudiante reactivado", "id": existing_student.id}), 200

        # Si no existe ningún estudiante con ese nombre
        new_student = Students(
            user_id=user_id,
            name=request_body["name"],
            coin=request_body["coin"],
            price=request_body["price"],
            level=request_body["level"],
            contact_name=request_body["contact_name"],
            contact_phone=request_body["contact_phone"],
            status=True
        )
        db.session.add(new_student)
        db.session.commit()
        return jsonify({"msg": "Estudiante creado", "id": new_student.id}), 201

    except Exception as e:
        return jsonify({"msg": "Error", "error": str(e)}), 500

@students_bp.route("/edit_student/<int:student_id>", methods=["PUT"])
def edit_student(student_id):
    try:
        request_body = request.json
        student = db.get_or_404(Students, student_id)

        # Validar duplicado solo si el nombre cambia
        if "name" in request_body and request_body["name"] != student.name:
            duplicate = db.session.query(
                db.select(Students).filter_by(name=request_body["name"], user_id=student.user_id)
                .where(Students.id != student.id)
                .exists()
            ).scalar()
            if duplicate:
                return jsonify({"msg": "Ya existe un estudiante con ese nombre"}), 400
            student.name = request_body["name"]

        # Actualizar solo los campos que hayan cambiado
        campos = ["coin", "price", "level", "contact_name", "contact_phone", "status"]
        for campo in campos:
            if campo in request_body and getattr(student, campo) != request_body[campo]:
                setattr(student, campo, request_body[campo])

        db.session.commit()
        return jsonify({"msg": "Estudiante actualizado exitosamente", "student": student.serialize()}), 200

    except Exception as e:
        return jsonify({"msg": "Error al editar estudiante", "error": str(e)}), 500
    
@students_bp.route("/delete_student/<int:student_id>", methods=["PUT"])
def delete_student(student_id):
    try:
        student = db.get_or_404(Students, student_id)

        if not student.status:
            return jsonify({"msg": "El estudiante ya estaba desactivado"}), 400

        student.status = False
        db.session.commit()
        return jsonify({"msg": "Estudiante desactivado correctamente"}), 200

    except Exception as e:
        return jsonify({"msg": "Error al desactivar estudiante", "error": str(e)}), 500