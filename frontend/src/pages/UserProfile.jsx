import "../styles/userProfile.css";
import useStore from "../store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";

export const UserProfile = () => {
	const { backendUrl, userLogged } = useStore();
	const [dashboardInformation, setDashBoardInformation] = useState(null);
	const navigate = useNavigate();
	const getInfoDashboard = async () => {
		const requestOptions = {
			method: "GET",
			redirect: "follow"
		};

		try {
			const response = await fetch(`${backendUrl}/user_dashboard/${userLogged.id}`, requestOptions);
			const result = await response.json();
			setDashBoardInformation(result);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (userLogged && userLogged.id) {
			getInfoDashboard();
		}
	}, [userLogged]);

	if (!dashboardInformation) {
		return <Loader />;
	}
	const formatToDDMMYY = (dateStr) => {
		const date = new Date(dateStr);
		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const year = String(date.getFullYear()).slice(-2);
		return `${day}/${month}/${year}`;
	};

	const { profile, summary, balance } = dashboardInformation;

	return (
		<div className="container p-0 d-flex flex-column vw-100 align-items-center">
			<div className="user-header">
				<img src={`https://api.dicebear.com/9.x/initials/svg?seed=${userLogged.first_name}`} className="user-avatar" alt="User Avatar" />
				{/* <i className="bi bi-gear user-avatar-edit-icon" data-bs-toggle="modal" data-bs-target="#editModal"></i> */}
			</div>

			<div className="user-content container d-flex flex-column justify-content-center">
				<div className="row justify-content-around">
					{/* Tarjeta 1: Estudiantes */}
					<div className="card col-4 m-3 mb-0" style={{ maxWidth: "400px" }}>
						<div className="card-body text-center">
							<h3 className="card-title title">Resumen de Estudiantes</h3>
							<p className="fw-bold">
								Haz tenido un total de <span className="title">{profile.students_count}</span> estudiantes.
							</p>
							<p className="fw-bold">
								Tienes <span className="title">{profile.active_students}</span> activos
							</p>
							<p className="fw-bold">
								Tienes <span className="title">{profile.inactive_students}</span> inactivos
							</p>
							<p className="mt-1">
								Puedes activar y desactivar estudiantes desde la seccion {""}
								<a
									className=" p-0 border-0 "
									onClick={() => {
										navigate("/students");
									}}>
									Estudiantes.
								</a>
							</p>
						</div>
					</div>

					{/* Tarjeta 2: Clases */}
					<div className="card col-4 m-3 mb-0" style={{ maxWidth: "400px" }}>
						<div className="card-body text-center">
							<h3 className="card-title title">Resumen de Clases</h3>
							<p className="fw-bold">
								Haz tenido un total de <span className="title">{summary.total_classes}</span> clases dadas
							</p>
							<p className="fw-bold">
								<span className="title">{summary.current_month_classes}</span> En el mes actual
							</p>
							<p className="fw-bold">
								<span className="title">{summary.previous_month_classes}</span> En el mes anterior
							</p>
							<p className="mt-1">
								Puedes añadir clases desde la sección {""}
								<a
									className=" p-0 border-0 "
									onClick={() => {
										navigate("/students");
									}}>
									Estudiantes.
								</a>
							</p>
						</div>
					</div>

					{/* Tarjeta 3: Ganancias */}
					<div className="card col-4 m-3 mb-0" style={{ maxWidth: "400px" }}>
						<div className="card-body text-center">
							<h3 className="card-title title">Resumen de Ganancias</h3>
							<p className="fw-bold">
								Total generado hasta la fecha <span className="title">{balance.total_earned.toFixed(2)}</span> PEN
							</p>
							<p className="fw-bold">
								Generado en el mes <span className="title">{balance.current_month.toFixed(2)}</span> PEN
							</p>
							<p className="fw-bold">
								Generado el mes anterior: <span className="title">{balance.previous_month.toFixed(2)}</span> PEN
							</p>
							<p>Los montos mostrados se basan en la moneda configurada en su perfil.</p>
						</div>
					</div>

					{/* Tarjeta 4: Últimos Registros */}
					<div className="card m-3 col-4 mb-0" style={{ maxWidth: "400px" }}>
						<div className="card-body text-center">
							<div className="row align-items-center">
								<div className="col-12">
									<h3 className="card-title title text-center m-2">Últimos Registros</h3>
								</div>
							</div>
							<div className="row scrollmenu-y">
								{dashboardInformation.last_records && dashboardInformation.last_records.length > 0 ? (
									dashboardInformation.last_records.map((detail) => (
										<div className="col-4 p-1 pb-2" key={detail.id}>
											<div className="card bg-secondary text-white">
												<p className="title m-0">{detail.student_name}</p>
												<p className="m-0 fw-bold">{formatToDDMMYY(detail.date)}</p>
												<p className="m-0 fw-bold">{(detail.amount * detail.duration).toFixed(2)}</p>
												<p className="fw-bold m-0">{detail.duration} hrs</p>
											</div>
										</div>
									))
								) : (
									<p className="fw-bold">No hay clases recientes</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
