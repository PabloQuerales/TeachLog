import "../styles/UserProfile.css";
import useStore from "../store";
import { useEffect } from "react";

export const UserProfile = () => {
	const { backendUrl, userLogged } = useStore();
	const getInfoDashboard = async () => {
		const requestOptions = {
			method: "GET",
			redirect: "follow"
		};

		try {
			const response = await fetch(`${backendUrl}/user_dashboard/${userLogged.id}`, requestOptions);
			const result = await response.text();
			console.log(result);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		getInfoDashboard();
	}, []);
	return (
		<div className="container p-0 d-flex flex-column vw-100 align-items-center">
			<div className="user-header">
				<img src={`https://api.dicebear.com/9.x/initials/svg?seed=${userLogged.first_name}`} className="user-avatar" />
				<i className="bi bi-gear user-avatar-edit-icon" data-bs-toggle="modal" data-bs-target="#editModal"></i>
			</div>
			<div className="user-content container d-flex flex-column justify-content-center">
				<div className="row justify-content-around">
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
			</div>
		</div>
	);
};
