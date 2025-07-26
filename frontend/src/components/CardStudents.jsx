import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import "../styles/cardStudents.css";
import { EditStudents } from "./EditStudents";
import { DeletStudents } from "./DeletStudents";
import { useNavigate } from "react-router-dom";

export const CardStudents = (props) => {
	const navigate = useNavigate();
	const [isFlipped, setIsFlipped] = useState(false);
	const [inputValue, setInputValue] = useState({
		name: props.student.name,
		contact_name: props.student.contact_name,
		contact_phone: props.student.contact_phone,
		price: props.student.price,
		coin: props.student.coin,
		level: props.student.level,
		status: props.student.status,
		id: props.student.id
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
			<div className="card card-student" key="front" style={{ height: "156px" }}>
				<div className="student-content">
					<div className="student-info">
						<h5 className="student-name">{props.student.name}</h5>
						<div className="info-group">
							<span className="label">Contacto:</span>
							<span>{props.student.contact_name}</span>
							<span>{props.student.contact_phone}</span>
						</div>
						<div className="info-group">
							<span className="label">Precio:</span>
							<span>
								{props.student.price} {props.student.coin}
							</span>
							<span className="label">Nivel:</span>
							<span>{props.student.level}</span>
						</div>
					</div>
					<div className="student-status">
						<div className="mb-2">
							<span className="label">Status:</span>
							<span className={`status-dot ${props.student.status ? "green" : "red"}`}></span>
						</div>
						<div className="d-flex flex-column ">
							<button className="btn btn-success mb-1" onClick={handleFlip}>
								Editar
							</button>
							<button className="btn btn-secondary" onClick={() => navigate(`/student_details/${props.student.id}`)}>
								Ver Detalles
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
						<DeletStudents inputValue={inputValue} getStudents={props.getStudents} />
						<EditStudents inputValue={inputValue} getStudents={props.getStudents} />
					</div>
				</form>
			</div>
		</ReactCardFlip>
	);
};
