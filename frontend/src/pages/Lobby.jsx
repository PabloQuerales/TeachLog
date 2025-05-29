import React, { useEffect } from "react";
import useStore from "../store";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Sidebar } from "../components/sidebar";

export const Lobby = () => {
	const { backendUrl, setUserLoged } = useStore();
	const navigate = useNavigate();

	const auth = async () => {
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
					didOpen: () => {
						Swal.showLoading();
					},
					willClose: () => {
						navigate("/");
					}
				});
			} else {
				setUserLoged(result.user);
			}
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		auth();
	}, []);
	return (
		<>
			<Sidebar />
		</>
	);
};
