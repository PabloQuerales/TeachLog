import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Swal from "sweetalert2";
import useStore from "../store";
import { useNavigate } from "react-router-dom";

export const AppLayout = () => {
	const { backendUrl, setUserLogged } = useStore();
	const navigate = useNavigate();
	const [isLogged, setIsLogged] = useState(false);

	const userAuth = async () => {
		const requestOptions = {
			method: "GET",
			redirect: "follow",
			credentials: "include"
		};

		try {
			const response = await fetch(`${backendUrl}/protected`, requestOptions);
			const result = await response.json();
			if (response.status !== 200) {
				Swal.fire({
					title: "Tu sesión ha caducado",
					html: "Serás redirigido al lobby en breve",
					timer: 1500,
					theme: "dark",
					didOpen: () => {
						Swal.showLoading();
					},
					willClose: () => {
						navigate("/");
					}
				});
			} else {
				setUserLogged(result);
				setIsLogged(true);
			}
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		userAuth();
	}, []);

	return (
		<>
			{isLogged ? (
				<div className="d-flex vh-100 ">
					<Sidebar />
					<Outlet />
				</div>
			) : null}
		</>
	);
};
