// import { Config } from "../pages/config";
import { useNavigate } from "react-router-dom";
import useStore from "../store";

export const Sidebar = () => {
	const navigate = useNavigate();
	const { backendUrl } = useStore();
	const handleClick = async () => {
		const requestOptions = {
			method: "POST",
			credentials: "include",
			redirect: "follow"
		};

		try {
			const response = await fetch(`${backendUrl}/logout`, requestOptions);
			if (response.status === 200) {
				navigate("/");
			} else {
				console.error("Error al cerrar sesión:", response.status);
			}
		} catch (error) {
			console.error("Error de red:", error);
		}
	};
	return (
		<div className="sidebar">
			<div className="sidebar-header">
				<span className="title-sidebar fs-1">TeachLog</span>
				<p className="sidebar-slogan">User Name</p>
			</div>
			<div className="d-flex align-items-center user-info">
				{/* <img src={`${store.defaultImgProfile}${store.user.first_name}`} className="avatar" />
				<p className="name p-2">
					{store.user.first_name} {store.user.last_name}
				</p> */}
				perfil del usuario
			</div>
			{/* menu */}
			<ul className="nav nav-pills flex-column mb-auto nav-links">
				<li className="nav-item" onClick={() => navigate("/")}>
					<i className="icons-sidebar bi bi-envelope"></i> <span className="icon-name">Cuentas</span>
				</li>
				<li onClick={() => navigate("/")}>
					<i className="icons-sidebar bi bi-graph-up"></i> <span className="icon-name">Movimientos</span>
				</li>
				{/* <li>
					<Config />
				</li> */}
			</ul>
			{/* boton cerrar sesion */}
			<div className="logout-container">
				<button className="logout-btn" onClick={handleClick}>
					<i className="icons-sidebar bi bi-box-arrow-left"></i> <span className="icon-name">Cerrar sesion</span>
				</button>
			</div>
		</div>
	);
};
