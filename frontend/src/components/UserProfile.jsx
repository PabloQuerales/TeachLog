import "../styles/UserProfile.css";
import useStore from "../store";
export const UserProfile = () => {
	const { userLogged } = useStore();
	return (
		<div className="container p-0 d-flex flex-column vw-100 align-items-center">
			<div className="user-header">
				<img src={`https://api.dicebear.com/9.x/initials/svg?seed=${userLogged.name}`} className="user-avatar" />
			</div>
			<div className="user-content container">
				<div className="row justify-content-around mt-5">
					<div className="card col-4 m-3">
						<div className="card-body text-center">
							<h5 className="card-title">Clases dictadas de MES EN CURSO AQUÍ</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
						</div>
					</div>
					<div className="card m-3 col-4">
						<div className="card-body text-center">
							<h5 className="card-title">Clases totales</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
						</div>
					</div>
					<div className="card m-3 col-4">
						<div className="card-body text-center">
							<h5 className="card-title">Dinero acumulado en MES EN CURSO AQUI</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
						</div>
					</div>
					<div className="card m-3 col-4">
						<div className="card-body text-center">
							<h5 className="card-title">Total dinero generado</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
						</div>
					</div>
				</div>
				<div className="d-flex justify-content-center">
					<button type="button" class="btn btn-secondary">
						Agregar Registro
					</button>
				</div>
			</div>
		</div>
	);
};
