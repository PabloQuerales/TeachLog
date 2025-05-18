from .users import users_bp
from .students import students_bp
from .student_details import student_details_bp

# Esto se importa en app.py
all_blueprints = [users_bp, students_bp, student_details_bp]
