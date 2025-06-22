import useStore from "../store";

export const NewStudent = (props) => {
	const { backendUrl, userLogged } = useStore();

	const newStudent = async () => {
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		const raw = JSON.stringify({
			name: "Juan H",
			price: "30",
			coin: "EU",
			contact_name: "Joanna",
			contact_phone: "+31631261468",
			level: "C1"
		});

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		try {
			const response = await fetch(`${backendUrl}/new_student/${userLogged.id}`, requestOptions);
			if (response.status == 200) {
				props.getStudents();
			}
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<button className="btn btn-dark" onClick={newStudent}>
			Crear Estudiante
		</button>
	);
};
