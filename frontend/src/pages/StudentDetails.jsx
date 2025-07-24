import { useEffect, useState } from "react";
import useStore from "../store";
import { useParams } from "react-router-dom";

export const StudentDetails = () => {
	const { backendUrl } = useStore();
	const pathname = useParams();
	const [student, setStudent] = useState([]);
	const [studentDetails, setStudentDetails] = useState([]);

	const getStudent = async () => {
		const requestOptions = {
			method: "GET",
			redirect: "follow"
		};

		try {
			const response = await fetch(`${backendUrl}/student/${pathname.id}`, requestOptions);
			const result = await response.json();
			setStudent(result);
		} catch (error) {
			console.error(error);
		}
	};
	const getStudentDetails = async () => {
		const requestOptions = {
			method: "GET",
			redirect: "follow"
		};

		try {
			const response = await fetch(`${backendUrl}/student-details/student/${pathname.id}`, requestOptions);
			const result = await response.json();
			console.log(result);
			setStudentDetails(result);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		getStudent();
		getStudentDetails();
	}, []);
	return (
		<>
			<div className="container-fluid">
				<div className="row">
					<div className="col">
						<h1>STUDENT NAME: {student.name}</h1>
					</div>
				</div>
				<div className="row">
					<div className="col d-flex flex-column align-items-center">
						{studentDetails.map((detail) => {
							return <p key={detail.id}>date:{detail.date}</p>;
						})}
					</div>
					<div className="col">
						<p>Details: {studentDetails.length}</p>
					</div>
				</div>
			</div>
		</>
	);
};
