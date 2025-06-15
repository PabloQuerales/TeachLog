import useStore from "../store";
export const Students = () => {
	const { userLogged, backendUrl } = useStore();

	const getStudents = async () => {
		const requestOptions = {
			method: "GET",
			redirect: "follow"
		};

		try {
			const response = await fetch(`${backendUrl}/students/${userLogged.id}`, requestOptions);
			const result = await response.text();
			console.log(result);
		} catch (error) {
			console.error(error);
		}
	};

	const newStudent = async () => {
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		const raw = JSON.stringify({
			name: "Pedro",
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
			redirect: "follow"
		};

		try {
			const response = await fetch(`${backendUrl}/new_student/${userLogged.id}`, requestOptions);
			const result = await response.json();
			console.log(result);
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<>
			<div>
				{userLogged.students.map((student, index) => {
					return <h1 key={index}>{student.name}</h1>;
				})}
				<button className="btn btn-secondary" onClick={getStudents}>
					Boton para registrar
				</button>
			</div>
		</>
	);
};
