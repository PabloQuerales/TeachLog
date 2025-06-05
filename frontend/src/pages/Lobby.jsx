import { useEffect, useState } from "react";
import useStore from "../store";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Sidebar } from "../components/sidebar";
import { UserProfile } from "../components/UserProfile";

export const Lobby = () => {
	const { backendUrl, setUserLogged } = useStore();
	const navigate = useNavigate();
	const [isLogged, setIsLogged] = useState(false);

	const auth = async () => {
		const requestOptions = {
			method: "GET",
			redirect: "follow",
			credentials: "include"
		};

		try {
			const response = await fetch(`${backendUrl}/protected`, requestOptions);
			if (response.status !== 200) {
				Swal.fire({
					title: "Tu sesión ha caducado",
					html: "Serás redirigido al lobby en breve",
					timer: 1500,
					didOpen: () => {
						Swal.showLoading();
					},
					willClose: () => {
						navigate("/");
					}
				});
			} else {
				setIsLogged(true);
			}
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		auth();
		setUserLogged(JSON.parse(localStorage.getItem("userLogged")));
	}, []);

	return (
		<>
			{isLogged ? (
				<div className="d-flex vh-100">
					<Sidebar />
					<UserProfile />
				</div>
			) : (
				<></>
			)}
		</>
	);
};
