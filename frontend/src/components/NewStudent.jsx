import useStore from "../store";

export const NewStudent = (props) => {
	const { backendUrl, userLogged } = useStore();

	const newStudent = async () => {
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		const raw = JSON.stringify({
			name: "Jose H",
			price: "30",
			coin: "EU",
			contact_name: "Joanna",
			contact_phone: "+31631261468",
			level: "C1"
		});

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		try {
			const response = await fetch(`${backendUrl}/new_student/${userLogged.id}`, requestOptions);
			if (response.status == 200) {
				props.getStudents();
			}
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<>
			<button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#newStudenModal" onClick={newStudent}>
				Crear Estudiante
			</button>
			<div class="modal fade" id="newStudenModal" tabindex="-1" aria-labelledby="newStudenModal" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content bg-dark text-white">
						<div class="modal-header">
							<h1 class="modal-title fs-5" id="newStudenModal">
								Registro de Estudiantes
							</h1>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							<form>
								<div className="mb-3">
									<label className="form-label">Nombre y Apellido</label>
									<input type="text" className="form-control" />
								</div>

								<div className="row mb-3">
									<div className="col">
										<label className="form-label">Persona de Contacto</label>
										<input type="text" className="form-control" />
									</div>
									<div className="col">
										<label className="form-label">Número de Contacto</label>
										<input type="text" className="form-control" />
									</div>
								</div>

								<div className="row mb-3">
									<div className="col">
										<label className="form-label">Nivel Actual del Estudiante</label>
										<input type="text" className="form-control" />
									</div>
									<div className="col">
										<label className="form-label">Precio de Clase X Hora</label>
										<input type="text" className="form-control" />
									</div>
									<div className="col">
										<label className="form-label">Moneda</label>
										<input type="text" className="form-control" />
									</div>
								</div>
							</form>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
								Close
							</button>
							<button type="button" class="btn btn-primary">
								Save changes
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
