from flask import Blueprint, jsonify
from models import Students

students_bp = Blueprint('students_bp', __name__)

@students_bp.route("/students", methods=["GET"])
def get_all_students():
    students = Students.query.all()
    return jsonify([student.serialize() for student in students]), 200
