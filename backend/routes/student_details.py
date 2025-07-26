from flask import Blueprint, jsonify, request
from models import db, Students, Student_details

student_details_bp = Blueprint('student_details_bp', __name__)

@student_details_bp.route("/student-details/student/<int:student_id>", methods=["GET"])
def get_student_details_by_student_id(student_id):
    student = db.session.get(Students, student_id)
    if not student:
        return jsonify({"msg": "Estudiante no encontrado"}), 404
    details = db.session.scalars(db.select(Student_details).filter_by(student_id=student_id).order_by(Student_details.date)).all()
    result = [detail.serialize() for detail in details]
    return jsonify(result), 200

@student_details_bp.route('/student-details', methods=['POST'])
def add_student_detail():
    data = request.get_json()
    student_id = data.get('student_id')
    date = data.get('date')
    time = data.get('time')
    
    if not student_id or not date or time is None:
        return jsonify({"msg": "Faltan campos obligatorios (student_id, date, time) para el detalle del estudiante"}), 400

    student_exists = db.session.get(Students, student_id)
    if not student_exists:
        return jsonify({"msg": "ID de estudiante no válido"}), 404

    current_hourly_rate = student_exists.price

    if current_hourly_rate is None:
        return jsonify({"msg": "El estudiante no tiene un precio por hora definido."}), 400

    new_detail = Student_details(
        student_id=student_id,
        date=date,
        time=time,
        hourly_rate=current_hourly_rate  # ¡Asigna el precio actual aquí!
    )
    db.session.add(new_detail)
    db.session.commit()
    return jsonify({"msg": "Detalle de estudiante añadido exitosamente", "detail": new_detail.serialize()}), 200

@student_details_bp.route('/student-detail/<int:detail_id>', methods=['GET'])
def get_single_student_detail(detail_id):
    detail = db.session.get(Student_details, detail_id)
    if not detail:
        return jsonify({"msg": "Detalle de estudiante no encontrado"}), 404
    return jsonify(detail.serialize()), 200

@student_details_bp.route('/student-detail/<int:detail_id>', methods=['PUT'])
def update_student_detail(detail_id):
    detail = db.session.get(Student_details, detail_id)
    if not detail:
        return jsonify({"msg": "Detalle de estudiante no encontrado"}), 404

    data = request.get_json()
    detail.date = data.get('date', detail.date)
    detail.time = data.get('time', detail.time)
    
    db.session.commit()
    return jsonify({"msg": "Detalle de estudiante actualizado exitosamente", "detail": detail.serialize()}), 200

@student_details_bp.route('/student-detail/<int:detail_id>', methods=['DELETE'])
def delete_student_detail(detail_id):
    detail = db.session.get(Student_details, detail_id)
    if not detail:
        return jsonify({"msg": "Detalle de estudiante no encontrado"}), 404
    
    db.session.delete(detail)
    db.session.commit()
    return jsonify({"msg": "Detalle de estudiante eliminado exitosamente"}), 200