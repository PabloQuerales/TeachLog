from .users import users_bp
from .students import students_bp
from .student_detail import student_detail_bp

# Esto se importa en app.py
all_blueprints = [users_bp, students_bp, student_detail_bp]
