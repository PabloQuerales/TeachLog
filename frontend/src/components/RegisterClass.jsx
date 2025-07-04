export const RegisterClass = () => {
	return (
		<>
			<button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#newStudenModal">
				Añadir registro de estudiante
			</button>
			<div className="modal fade" id="newStudenModal" tabIndex="-1" aria-labelledby="newStudenModal" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content bg-dark text-white">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="newStudenModal">
								Registro de Estudiantes
							</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form>
								<div className="mb-3">
									<label className="form-label">Nombre y Apellido</label>
									{/* <input type="text" className="form-control" name="name" value={inputValue.name} onChange={handleChange} /> */}
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
								<div className="row mb-3 align-items-end">
									<div className="col">
										<label className="form-label">Nivel Actual del Estudiante</label>
										{/* <select className="form-select" aria-label="Level" name="level" required value={inputValue.level} onChange={handleChange}>
											<option value="">Nivel</option>
											<option value="A2">A2</option>
											<option value="B1">B1</option>
											<option value="B2">B2</option>
											<option value="C1">C1</option>
										</select> */}
									</div>
									<div className="col">
										<label className="form-label">Precio de Clase X Hora</label>
										{/* <input type="number" className="form-control" name="price" value={inputValue.price} onChange={handleChange} /> */}
									</div>
									<div className="col">
										<label className="form-label">Moneda</label>
										{/* <select className="form-select" aria-label="Moneda" name="coin" required value={inputValue.coin} onChange={handleChange}>
											<option value="">Moneda</option>
											<option value="PEN">PEN</option>
											<option value="EUR">EUR</option>
											<option value="USD">USD</option>
										</select> */}
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
