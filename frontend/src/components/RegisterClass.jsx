import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";

export const RegisterClass = (props) => {
	const [studentSelected, setStudentSelected] = useState("");
	const [currentDate, setCurrentDate] = useState("");
	const path = useLocation();
	const students = props.students;

	const handleClick = () => {
		console.log(students.find((student) => student.name === "Julio Cesar"));
	};

	const handleChange = (e) => {
		setStudentSelected(students.find((student) => student.name === e.target.value));
	};

	useEffect(() => {
		const now = new Date();
		const formattedDate = now.toISOString().split("T")[0];
		setCurrentDate(formattedDate);
	}, []);

	return (
		<>
			<button onClick={handleClick} type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#registerClass">
				Añadir registro de estudiante
			</button>

			<div className="modal fade" id="registerClass" tabIndex="-1" aria-labelledby="registerClass" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content bg-dark text-white">
						{" "}
						{/* Mantienes los estilos de Bootstrap para el modal */}
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="registerClass">
								Registro de Estudiantes
							</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form>
								<div className="row">
									<div className="col-11 mb-3">
										<label className="form-label">Estudiante</label>
										{path.pathname === "/students" ? (
											<select className="form-select" aria-label="Name" name="name" required onChange={handleChange}>
												<option value="">---Seleccionar Estudiante---</option>
												{props.students.map((student) => {
													return (
														<option key={student.name} value={student.name}>
															{student.name}
														</option>
													);
												})}
											</select>
										) : null}
									</div>
								</div>
								{studentSelected ? (
									<>
										<div className="row mb-3">
											<div className="col-3">
												<label className="form-label">Precio x Hora</label>
												<input
													type="text"
													className="form-select text-center bg-gradient"
													name="contact_name"
													value={studentSelected.price}
													disabled
												/>
											</div>
											<div className="col-3">
												<label className="form-label ">Moneda</label>
												<input
													type="text"
													className="form-select text-center bg-gradient"
													name="contact_name"
													value={studentSelected.coin}
													disabled
												/>
											</div>
											<div className="col-5">
												<label className="form-label ">Duración de la sesión</label>
												<select aria-label="Time" name="time" required className="form-select">
													<option value="">--Selecciona--</option>
													<option value="0.5">30 min</option>
													<option value="1">1 hora</option>
													<option value="1.5">1 hora y 30 min</option>
													<option value="2">2 horas</option>
													<option value="2.5">2 horas y 30 min</option>
													<option value="3">3 horas</option>
												</select>
											</div>
										</div>
										<div className="row">
											<div className="col">
												<TextField
													id="date"
													label="Día"
													type="date"
													defaultValue={currentDate}
													sx={{
														"& .MuiInputLabel-root": {
															color: "white"
														},
														"& .MuiInputBase-input": {
															color: "white"
														},
														"& .MuiOutlinedInput-notchedOutline": {
															borderColor: "white"
														},
														"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
															borderColor: "white"
														},
														"&:hover .MuiOutlinedInput-notchedOutline": {
															borderColor: "white"
														},
														"& .MuiInputAdornment-root .MuiSvgIcon-root": {
															color: "white"
														}
													}}
												/>
											</div>
											<div className="col-4 d-flex">
												<button type="button" className="button-accent" data-bs-dismiss="modal">
													Registrar
												</button>
											</div>
										</div>
									</>
								) : null}
							</form>
						</div>
						{/* <button type="button" className="btn btn-primary" onClick={handleSubmit} data-bs-dismiss="modal">
                Save changes
              </button> */}
					</div>
				</div>
			</div>
		</>
	);
};
