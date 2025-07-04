import useStore from "../store";
import { CardStudents } from "../components/CardStudents";
import { NewStudent } from "../components/NewStudent";
import { RegisterClass } from "../components/RegisterClass";
import { useEffect, useState } from "react";
import "../styles/students.css";

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
	useEffect(() => {
		getStudents();
	}, []);
	return (
		<>
			<div className="container h-100 d-flex flex-column justify-content-around">
				<div className="scrollmenu p-3">
					{students.map((student, index) => {
						return <CardStudents key={index} student={student} getStudents={getStudents} />;
					})}
				</div>
				<div className="d-flex justify-content-evenly">
					<NewStudent getStudents={getStudents} />
					<RegisterClass />
				</div>
			</div>
		</>
	);
};
