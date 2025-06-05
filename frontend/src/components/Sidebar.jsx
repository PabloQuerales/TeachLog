// import { Config } from "../pages/config";
import { useNavigate } from "react-router-dom";
import useStore from "../store";
import "../styles/sidebar.css";

export const Sidebar = () => {
	const navigate = useNavigate();
	const { backendUrl, userLogged } = useStore();
	const logout = async () => {
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
	const handleClick = () => {
		logout();
		localStorage.clear();
	};

	return (
		<div className="sidebar">
			<div className="sidebar-header">
				<span className="title-sidebar fs-1">TeachLog</span>
				<p className="sidebar-slogan">
					{userLogged.name} {userLogged.last_name}
				</p>
			</div>
			{/* menu */}
			<ul className="nav nav-pills flex-column mb-auto nav-links">
				<li className="nav-item" onClick={() => navigate("/")}>
					<i className="icons-sidebar bi bi-envelope"></i> <span className="icon-name">Home</span>
				</li>
				<li className="nav-item" onClick={() => navigate("/")}>
					<i className="icons-sidebar bi bi-envelope"></i> <span className="icon-name">Cuentas</span>
				</li>
				<li>
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
