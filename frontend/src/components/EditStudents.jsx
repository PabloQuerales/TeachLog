import useStore from "../store";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

export const EditStudents = (props) => {
	const { backendUrl } = useStore();
	const path = useLocation();
	const params = useParams();
	const studentId = props.inputValue?.id || params.id;
	const [inputValue, setInputValue] = useState({
		name: "",
		coin: "",
		level: "",
		price: "",
		contact_name: "",
		contact_phone: ""
	});

	const editStudent = async () => {
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		const raw = JSON.stringify(props.inputValue ? props.inputValue : inputValue);

		const requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		try {
			const response = await fetch(`${backendUrl}/edit_student/${studentId}`, requestOptions);
			if (response.status == 200) {
				if (path.pathname === "/students") {
					props.getStudents();
				} else {
					props.getStudent();
					props.getStudentDetails();
				}
				Swal.fire({
					title: "Edición realizada correctamente!",
					icon: "success",
					confirmButtonColor: "rgb(196, 159, 59)",
					theme: "dark"
				});
			} else {
				Swal.fire({
					title: "Información incompleta",
					icon: "error",
					confirmButtonColor: "rgb(196, 159, 59)",
					theme: "dark"
				});
			}
		} catch (error) {
			console.error(error);
		}
		setInputValue({
			name: "",
			coin: "",
			level: "",
			price: "",
			contact_name: "",
			contact_phone: ""
		});
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputValue({ ...inputValue, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		editStudent();
	};
	return (
		<>
			{path.pathname !== "/students" ? (
				<>
					<i className="bi bi-gear user-avatar-edit-icon" data-bs-toggle="modal" data-bs-target="#editModal"></i>

					<div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
						<div className="modal-dialog">
							<div className="modal-content bg-dark text-white">
								<div className="modal-header">
									<h1 className="modal-title fs-5" id="editModalLabel">
										Editar estudiante
									</h1>
									<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
								</div>
								<div className="modal-body">
									<form>
										<div className="mb-3">
											<label className="form-label">Nombre y Apellido</label>
											<input type="text" className="form-control" name="name" value={inputValue.name} onChange={handleChange} />
										</div>
										<div className="row mb-3">
											<div className="col">
												<label className="form-label">Persona de Contacto</label>
												<input type="text" className="form-control" name="contact_name" value={inputValue.contact_name} onChange={handleChange} />
											</div>
											<div className="col">
												<label className="form-label">Número de Contacto</label>
												<input type="text" className="form-control" name="contact_phone" value={inputValue.contact_phone} onChange={handleChange} />
											</div>
										</div>
										<div className="row mb-3 align-items-end">
											<div className="col">
												<label className="form-label">Nivel Actual del Estudiante</label>
												<select className="form-select" aria-label="Level" name="level" required value={inputValue.level} onChange={handleChange}>
													<option value="">Nivel</option>
													<option value="A2">A2</option>
													<option value="B1">B1</option>
													<option value="B2">B2</option>
													<option value="C1">C1</option>
												</select>
											</div>
											<div className="col">
												<label className="form-label">Precio de Clase X Hora</label>
												<input type="number" className="form-control" name="price" value={inputValue.price} onChange={handleChange} />
											</div>
											<div className="col">
												<label className="form-label">Moneda</label>
												<select className="form-select" aria-label="Moneda" name="coin" required value={inputValue.coin} onChange={handleChange}>
													<option value="">Moneda</option>
													<option value="PEN">PEN</option>
													<option value="EUR">EUR</option>
													<option value="USD">USD</option>
												</select>
											</div>
										</div>
									</form>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
										Cancelar
									</button>
									<button type="button" className="button-accent" onClick={handleSubmit} data-bs-dismiss="modal">
										Confirmar
									</button>
								</div>
							</div>
						</div>
					</div>
				</>
			) : (
				<button type="submit" className="btn btn-success btn-sm mt-4" onClick={editStudent}>
					Confirmar Cambios
				</button>
			)}
		</>
	);
};
