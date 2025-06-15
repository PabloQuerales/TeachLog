export const CardStudents = (props) => {
	return (
		<div className="card mb-3">
			<div className="row g-0">
				<div className="col-md-4">
					<img src="..." className="img-fluid rounded-start" alt="..." />
				</div>
				<div className="col-md-8">
					<div className="card-body">
						<h5 className="card-title">{props.student.name}</h5>
						<p className="card-text">{props.student.coin}</p>
						<p className="card-text">{props.student.contact_name}</p>
						<p className="card-text">{props.student.contact_phone}</p>
						<p className="card-text">{props.student.contact_name}</p>
						<p className="card-text">{props.student.level}</p>
						<p className="card-text">{props.student.price}</p>
						<p className="card-text">{props.student.status}</p>
						{props.student.status ? <p className="btn btn-success"></p> : <p className="btn btn-danger"></p>}
						<button onClick={() => console.log(props.student.name)}>hola</button>
					</div>
				</div>
			</div>
		</div>
	);
};
