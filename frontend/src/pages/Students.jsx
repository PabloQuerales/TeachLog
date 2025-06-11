import useStore from "../store";
export const Students = () => {
	const { userLogged, backendUrl } = useStore();
	const newStudent = async () => {
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		const raw = JSON.stringify({
			name: "Rodrigo",
			price: "100",
			coin: "PEN",
			contact_name: "Samantha",
			contact_phone: "+31631261468",
			level: "B2"
		});

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
			credentials: "include"
		};

		try {
			const response = await fetch(`${backendUrl}/new_student`, requestOptions);
			const result = await response.json();
			console.log(result);
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<>
			<h1>aqui van los estudiantes</h1>

			<button onClick={newStudent}>Boton para registrar</button>
			{userLogged.students.map((students) => {
				<h1>aqui van los estudiantes</h1>;
				<h2>{students} hola prueba</h2>;
			})}
		</>
	);
};
