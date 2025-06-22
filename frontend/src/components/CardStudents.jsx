import "../styles/cardStudents.css";

export const CardStudents = ({ student }) => {
	return (
		<div className=" card card-student">
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
						<button className="btn btn-success">Editar</button>
					</div>
				</div>
			</div>
		</div>
	);
};
