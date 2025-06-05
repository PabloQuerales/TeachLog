import React, { useEffect, useState } from "react";
import useStore from "../store";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Sidebar } from "../components/sidebar";

export const Lobby = () => {
	const { backendUrl, userLoged } = useStore();
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
		if (isLogged) {
			console.log(userLoged);
		}
	}, [userLoged]);

	return (
		<>
			<div className="d-flex vh-100">{isLogged ? <Sidebar /> : <></>}</div>
		</>
	);
};
