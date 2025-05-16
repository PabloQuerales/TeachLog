from typing import List
from sqlalchemy.orm import declarative_base, Mapped, mapped_column, relationship
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, create_engine, ForeignKey

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(256),nullable=False)
    first_name: Mapped[str] = mapped_column(String(120),nullable=False)
    last_name: Mapped[str] = mapped_column(String(120),nullable=False)
    students: Mapped[List["Students"]] = relationship(back_populates="user")
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            # do not serialize the password, its a security breach
        }

class Students(db.Model):
    __tablename__ = 'students'
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    name: Mapped[str] = mapped_column(String(80),nullable=False)
    contact: Mapped[str] = mapped_column(nullable=False)
    price: Mapped[int] = mapped_column(nullable=False)
    user: Mapped["User"] = relationship(back_populates="students")
    student_details: Mapped[List["Student_details"]] = relationship(back_populates="student")

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "contact": self.contact,
            "price": self.price
        }

class Student_details(db.Model):
    __tablename__ = 'student_details'
    id: Mapped[int] = mapped_column(primary_key=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("students.id"))
    date: Mapped[str] = mapped_column(String(80),nullable=False)
    time: Mapped[int] = mapped_column(nullable=False)
    student: Mapped["Students"] = relationship(back_populates="student_details")
    
    def serialize(self):
        return {
            "id": self.id,
            "accounts_id": self.accounts_id,
            "detail": self.detail,
            "amount": self.amount,
            "coin": self.coin,
            "type": self.type,
            "date": self.date,
            "time": self.time,
            "operation": self.operation,
        }   