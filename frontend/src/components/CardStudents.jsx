import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import "../styles/cardStudents.css";
import { EditStudents } from "./EditStudents";
import { DeletStudents } from "./DeletStudents";

export const CardStudents = ({ student, getStudents }) => {
	const [isFlipped, setIsFlipped] = useState(false);
	const [inputValue, setInputValue] = useState({
		name: student.name,
		contact_name: student.contact_name,
		contact_phone: student.contact_phone,
		price: student.price,
		coin: student.coin,
		level: student.level,
		status: student.status,
		id: student.id
	});

	const handleFlip = () => setIsFlipped(!isFlipped);

	const handleChange = (e) => {
		setInputValue({ ...inputValue, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		handleFlip();
	};

	return (
		<ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
			{/* LADO FRONTAL */}
			<div className="card card-student" key="front">
				<div className="student-content">
					<div className="student-info">
						<h5 className="student-name">{student.name}</h5>
						<div className="info-group">
							<span className="label">Contacto:</span>
							<span>{student.contact_name}</span>
							<span>{student.contact_phone}</span>
						</div>
						<div className="info-group">
							<span className="label">Precio:</span>
							<span>
								{student.price} {student.coin}
							</span>
							<span className="label">Nivel:</span>
							<span>{student.level}</span>
						</div>
					</div>
					<div className="student-status">
						<div className="mb-4">
							<span className="label">Status:</span>
							<span className={`status-dot ${student.status ? "green" : "red"}`}></span>
						</div>
						<div className="mt-4">
							<button className="btn btn-success" onClick={handleFlip}>
								Editar
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* LADO POSTERIOR (idéntico pero con inputs) */}
			<div className="card card-student bg-dark text-white" key="back">
				<form className="student-content" onSubmit={handleSubmit}>
					<div className="student-info">
						<input
							type="text"
							name="name"
							className="form-control form-control-sm mb-3"
							value={inputValue.name}
							onChange={handleChange}
							placeholder="Nombre"
						/>

						<div className="info-group">
							<label className="label">Contacto:</label>
							<input
								type="text"
								name="contact_name"
								className="form-control form-control-sm"
								value={inputValue.contact_name}
								onChange={handleChange}
								placeholder="Nombre"
							/>
							<input
								type="text"
								name="contact_phone"
								className="form-control form-control-sm"
								value={inputValue.contact_phone}
								onChange={handleChange}
								placeholder="Teléfono"
							/>
						</div>

						<div className="input-row">
							<input
								type="text"
								name="price"
								className="form-control input-sm"
								value={inputValue.price}
								onChange={handleChange}
								placeholder="Precio"
							/>

							<select className="form-select input-sm" name="coin" required value={inputValue.coin} onChange={handleChange}>
								<option value="">Moneda</option>
								<option value="PEN">PEN</option>
								<option value="EUR">EUR</option>
								<option value="USD">USD</option>
							</select>

							<select className="form-select input-sm" name="level" required value={inputValue.level} onChange={handleChange}>
								<option value="">Nivel</option>
								<option value="A2">A2</option>
								<option value="B1">B1</option>
								<option value="B2">B2</option>
								<option value="C1">C1</option>
							</select>
						</div>
					</div>

					<div className="student-status student-status-edit">
						<DeletStudents />
						<EditStudents inputValue={inputValue} getStudents={getStudents} />
					</div>
				</form>
			</div>
		</ReactCardFlip>
	);
};
