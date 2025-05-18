from flask import Blueprint, jsonify
from models import User,db

users_bp = Blueprint('users_bp', __name__)

@users_bp.route('/users', methods=['GET'])
def get_all_users():
    data = db.session.scalars(db.select(User)).all()
    result = list(map(lambda item: item.serialize(),data))
    if result == []:
        return jsonify({"msg":"Usuario no encontrado"}), 404
    response_body = {
        "results": result
    }
    return jsonify(response_body), 200