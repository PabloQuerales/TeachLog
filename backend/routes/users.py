from flask import Blueprint, jsonify
from models import User

users_bp = Blueprint('users_bp', __name__)

@users_bp.route("/users", methods=["GET"])
def get_all_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200
