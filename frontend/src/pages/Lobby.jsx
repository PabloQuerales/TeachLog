import React, { useEffect } from "react";
import useStore from "../store";
export const Lobby = () => {
	const { backendUrl } = useStore();

	const auth = async () => {
		const requestOptions = {
			method: "GET",
			redirect: "follow",
			credentials: "include"
		};

		try {
			const response = await fetch(`${backendUrl}/protected`, requestOptions);
			const result = await response.text();
			console.log(result);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		auth();
	}, []);
	return (
		<>
			<h1>Este es el Lobby</h1>;<span>Hola mundo</span>
		</>
	);
};
