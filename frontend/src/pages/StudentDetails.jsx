import useStore from "../store";
import { useParams } from "react-router-dom";

export const StudentDetails = () => {
	const { backendUrl, userLogged } = useStore();
	const pathname = useParams();
	const getStudent_Details = async () => {
		const requestOptions = {
			method: "GET",
			redirect: "follow"
		};

		try {
			const response = await fetch(`${backendUrl}/student-details/student/${pathname.id}`, requestOptions);
			const result = await response.json();
			console.log(result);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<button onClick={getStudent_Details}> PRUEBA GET</button>
			<button onClick={() => console.log(pathname.id)}> PRUEBA PATH</button>
			<h1>STUDENT ID: {userLogged.id}</h1>
		</>
	);
};
