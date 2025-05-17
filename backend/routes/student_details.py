from flask import Blueprint, jsonify
from models import Student_details

student_details_bp = Blueprint('student_details_bp', __name__)

@student_details_bp.route("/student-details", methods=["GET"])
def get_all_details():
    details = Student_details.query.all()
    return jsonify([detail.serialize() for detail in details]), 200
