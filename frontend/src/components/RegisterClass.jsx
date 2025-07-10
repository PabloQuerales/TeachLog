import { useState } from "react";
import { useLocation } from "react-router-dom";
import { TextField } from "@material-ui/core";

export const RegisterClass = (props) => {
	const [studentSelected, setStudentSelected] = useState("");
	const path = useLocation();
	const students = props.students;
	const handleClick = () => {
		console.log(students.find((student) => student.name == "Julio Cesar"));
	};
	const handleChange = (e) => {
		setStudentSelected(students.find((student) => student.name == e.target.value));
	};
	return (
		<>
			<button onClick={handleClick} type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#registerClass">
				Añadir registro de estudiante
			</button>
			<div className="modal modal-lg fade" id="registerClass" tabIndex="-1" aria-labelledby="registerClass" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content bg-dark text-white">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="registerClass">
								Registro de Estudiantes
							</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form>
								<div className="mb-3">
									<label className="form-label">Estudiante</label>
									{path.pathname == "/students" ? (
										<select className="form-select" aria-label="Name" name="name" required onChange={handleChange}>
											<option value="">---Seleccionar Estudiante---</option>
											{props.students.map((student) => {
												return <option value={student.name}>{student.name}</option>;
											})}
										</select>
									) : null}
								</div>
								{studentSelected ? (
									<div className="row mb-3">
										<div className="col">
											<label className="form-label">Precio x Hora</label>
											<input type="text" className="form-select text-center" name="contact_name" value={studentSelected.price} disabled />
										</div>
										<div className="col">
											<label className="form-label">Moneda</label>
											<input type="text" className="form-select text-center" name="contact_name" value={studentSelected.coin} disabled />
										</div>
										<div className="col">
											<label className="form-label">Duración de la sesión</label>
											<select aria-label="Time" name="time" required className="form-select">
												<option value="">--Selecciona una Opción--</option>
												<option value="0.5">30 min</option>
												<option value="1">1 hora</option>
												<option value="1.5">1 hora y 30 min</option>
												<option value="2">2 horas</option>
												<option value="2.5">2 horas y 30 min</option>
												<option value="3">3 horas</option>
											</select>
										</div>
										<div className="col">
											<TextField
												id="date"
												label="Birthday"
												type="date"
												defaultValue="2017-05-24"
												className={classes.textField}
												InputLabelProps={{
													shrink: true
												}}
											/>
										</div>
									</div>
								) : null}
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
								Close
							</button>
							{/* <button type="button" className="btn btn-primary" onClick={handleSubmit} data-bs-dismiss="modal">
								Save changes
							</button> */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
