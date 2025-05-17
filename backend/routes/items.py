from flask import Blueprint, request, jsonify
from models import db, Item

items_bp = Blueprint("items", __name__)

@items_bp.route("/items", methods=["GET"])
def get_items():
    items = Item.query.all()
    return jsonify([item.serialize() for item in items])

@items_bp.route("/items", methods=["POST"])
def create_item():
    data = request.get_json()
    item = Item(name=data["name"], quantity=data.get("quantity", 1))
    db.session.add(item)
    db.session.commit()
    return jsonify(item.serialize()), 201
