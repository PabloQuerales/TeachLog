import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import useStore from "../store";
import Swal from "sweetalert2";

export const RegisterClass = (props) => {
	const { backendUrl } = useStore();
	const [studentSelected, setStudentSelected] = useState("");
	const [currentDate, setCurrentDate] = useState("");
	const [register, setRegister] = useState({
		student_id: studentSelected.id || "",
		date: currentDate,
		time: 0
	});
	const path = useLocation();
	const students = props.students;

	const postStudentDetail = async () => {
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		const raw = JSON.stringify(register);
		console.log(register);
		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		try {
			const response = await fetch(`${backendUrl}/student-details`, requestOptions);
			if (response.status === 200) {
				Swal.fire({
					title: "Clase registada!",
					icon: "success",
					confirmButtonColor: "rgb(196, 159, 59)",
					theme: "dark"
				});
				setRegister({ student_id: studentSelected.id || "", date: currentDate, time: 0 });
			}
		} catch (error) {
			console.error(error);
		}
		setStudentSelected("");
	};
	const handleChange = (e) => {
		const { value, name } = e.target;
		let parsedValue = value;
		if (name === "time") {
			parsedValue = parseFloat(value);
		}
		if (name === "studentNameSelect") {
			const selectedStudent = students.find((student) => student.name === value);
			setStudentSelected(selectedStudent || "");
		} else {
			setRegister(() => ({ ...register, [name]: parsedValue, student_id: studentSelected.id }));
		}
	};

	const handleClick = () => {
		if (register.time != 0) {
			postStudentDetail();
		} else {
			Swal.fire({
				text: "Faltó ingresar la cantidad de tiempo a registrar",
				icon: "error",
				confirmButtonColor: "rgb(196, 159, 59)",
				theme: "dark"
			});
		}
	};
	useEffect(() => {
		const now = new Date();
		const formattedDate = now.toISOString().split("T")[0];
		setCurrentDate(formattedDate);
		setRegister({ ...register, date: formattedDate });
	}, []);

	return (
		<>
			<button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#registerClass">
				Añadir registro de estudiante
			</button>

			<div className="modal fade" id="registerClass" tabIndex="-1" aria-labelledby="registerClass" aria-hidden="true">
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
								<div className="row">
									<div className="col-11 mb-3">
										<label className="form-label">Estudiante</label>
										{path.pathname === "/students" ? (
											<select
												className="form-select"
												aria-label="Name"
												name="studentNameSelect"
												required
												value={studentSelected ? studentSelected.name : ""}
												onChange={handleChange}>
												<option value="">---Seleccionar Estudiante---</option>
												{props.students.map((student) => {
													return (
														<option key={student.id} value={student.name}>
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
												<select aria-label="Time" name="time" required className="form-select" onChange={handleChange}>
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
													name="date"
													defaultValue={currentDate}
													onChange={handleChange}
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
												<button type="button" className="button-accent" data-bs-dismiss="modal" onClick={handleClick}>
													Registrar
												</button>
											</div>
										</div>
									</>
								) : (
									<>
										{props.student ? (
											<div className="row">
												<div className="col">
													<h5 className="mb-3">{props.student.name}</h5>
												</div>
												<div className="col">
													<h5 className="mb-3">
														{props.student.price} {props.student.coin}
													</h5>
												</div>
											</div>
										) : null}
										<div className="row">
											<div className="col">
												<TextField
													id="date"
													label="Día"
													type="date"
													name="date"
													defaultValue={currentDate}
													onChange={handleChange}
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
											<div className="col align-content-center">
												<select aria-label="Time" name="time" required className="form-select" onChange={handleChange}>
													<option value="">--Selecciona Tiempo--</option>
													<option value="0.5">30 min</option>
													<option value="1">1 hora</option>
													<option value="1.5">1 hora y 30 min</option>
													<option value="2">2 horas</option>
													<option value="2.5">2 horas y 30 min</option>
													<option value="3">3 horas</option>
												</select>
											</div>
										</div>
										<div className="row mt-1 d-flex justify-content-end">
											<div className="col-4 d-flex justify-content-end">
												<button type="button" className="button-accent" data-bs-dismiss="modal" onClick={handleClick}>
													Registrar
												</button>
											</div>
										</div>
									</>
								)}
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
