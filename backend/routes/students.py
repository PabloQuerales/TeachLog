from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from models import User,db, Students

students_bp = Blueprint('students_bp', __name__)

@students_bp.route("/students", methods=["GET"])
def get_all_students():
    students = Students.query.all()
    return jsonify([student.serialize() for student in students]), 200

@students_bp.route("/new_student", methods=["POST"])
@jwt_required(locations=["cookies"])
def post_new_student():
    current_user = get_jwt_identity()
    try:
        request_body = request.json
        exist = db.session.query(db.select(Students).filter_by(name=request_body["name"]).exists()).scalar()
        if not exist: 
            new_student = Students(user_id=current_user, name=request_body["name"],coin=request_body["coin"], price=request_body["price"], level=request_body["level"], contact_name=request_body["contact_name"], contact_phone=request_body["contact_phone"], status= True)
            db.session.add(new_student)
            db.session.commit()  
            student_id = new_student.id
            return jsonify({"id": student_id, **request_body}), 200
        else:
            return jsonify({"msg": "Account already exists"}), 404
    except Exception as e:
        return jsonify({"msg": "Error", "error": str(e)}), 500