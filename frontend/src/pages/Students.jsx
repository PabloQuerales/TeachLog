import useStore from "../store";
import { CardStudents } from "../components/CardStudents";
import { useEffect, useState } from "react";

export const Students = () => {
	const [students, setStudents] = useState([]);
	const { userLogged, backendUrl } = useStore();

	const getStudents = async () => {
		const requestOptions = {
			method: "GET",
			redirect: "follow"
		};

		try {
			const response = await fetch(`${backendUrl}/students/${userLogged.id}`, requestOptions);
			const result = await response.json();
			setStudents(result);
		} catch (error) {
			console.error(error);
		}
	};

	const newStudent = async () => {
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		const raw = JSON.stringify({
			name: "Joanna",
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
			const result = await response.json();
			if (response.status == 200) {
				getStudents();
			}
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		getStudents();
	}, []);
	return (
		<>
			<div>
				<div className="container">
					{students.map((student, index) => {
						return <CardStudents key={index} student={student} />;
					})}
				</div>
				<button className="btn btn-secondary" onClick={() => console.log(students)}>
					Boton para registrar
				</button>
				<button className="btn btn-secondary" onClick={newStudent}>
					Boton
				</button>
			</div>
		</>
	);
};
