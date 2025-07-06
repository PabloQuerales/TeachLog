import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export const RegisterClass = () => {
	const path = useLocation();
	useEffect(() => {
		console.log(path.pathname);
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
								<div className="mb-3">
									<label className="form-label">Estudiante</label>
									{path.pathname == "/students" ? (
										<select className="form-select" aria-label="Level" name="level" required value="JUAN">
											<option value="">Nivel</option>
											<option value="A2">A2</option>
											<option value="B1">B1</option>
											<option value="B2">B2</option>
											<option value="C1">C1</option>
										</select>
									) : null}
								</div>
								<div className="row mb-3">
									<div className="col">
										<label className="form-label">Persona de Contacto</label>
										{/* <input type="text" className="form-control" name="contact_name" value={inputValue.contact_name} onChange={handleChange} /> */}
									</div>
									<div className="col">
										<label className="form-label">Número de Contacto</label>
										{/* <input type="text" className="form-control" name="contact_phone" value={inputValue.contact_phone} onChange={handleChange} /> */}
									</div>
								</div>
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
