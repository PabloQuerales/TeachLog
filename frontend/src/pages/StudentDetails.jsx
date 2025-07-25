import { useEffect, useState } from "react";
import useStore from "../store";
import { useParams } from "react-router-dom";
import { RegisterClass } from "../components/RegisterClass";

export const StudentDetails = () => {
	const { backendUrl } = useStore();
	const pathname = useParams();
	const [student, setStudent] = useState([]);
	const [studentDetails, setStudentDetails] = useState([]);
	const [classesThisMonth, setClassesThisMonth] = useState(0);
	const [totalTimeThisMonth, setTotalTimeThisMonth] = useState(0); // Nuevo estado para tiempo total del mes
	const [totalTimeOverall, setTotalTimeOverall] = useState(0);

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
			setStudentDetails(result);
			const now = new Date();
			const currentMonth = now.getMonth();
			const currentYear = now.getFullYear();

			const filteredClassesThisMonth = result.filter((detail) => {
				const detailDate = new Date(detail.date);
				return detailDate.getMonth() === currentMonth && detailDate.getFullYear() === currentYear;
			});

			setClassesThisMonth(filteredClassesThisMonth.length);

			const monthlyTimeSum = filteredClassesThisMonth.reduce((sum, detail) => sum + detail.time, 0);
			setTotalTimeThisMonth(monthlyTimeSum);

			const overallTimeSum = result.reduce((sum, detail) => sum + detail.time, 0);
			setTotalTimeOverall(overallTimeSum);
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
			<div className="container p-0 d-flex flex-column vw-100 align-items-center">
				<div className="user-header">
					<img src={`https://api.dicebear.com/9.x/initials/svg?seed=${student.name}`} className="user-avatar" />
				</div>
				<div className="user-content container d-flex flex-column justify-content-center">
					<div className="row justify-content-around">
						<div className="card col-4 m-3">
							<div className="card-body">
								<h2 className="card-title title text-center">Información</h2>
								<h3 className="title">{student.name}</h3>
								<p>
									Precio por Hora: {student.price} {student.coin}
								</p>
								<p>Persona de Contacto: {student.contact_name}</p>
								<p>Teléfono de Contacto: {student.contact_phone}</p>
								<p>Nivel: {student.level}</p>
								<p>Teléfono de Contacto: {student.contact_phone}</p>
								<p>Status: {student.status ? "Activo" : "Inactivo"}</p>
							</div>
						</div>
						<div className="card m-3 col-4">
							<div className="card-body">
								<h2 className="card-title title text-center">Resumen de Clases</h2>
								<p>Clases este mes: {classesThisMonth === 0 ? "No se han registrado clases este mes" : classesThisMonth}</p>
								<p>Tiempo este mes: {totalTimeThisMonth} horas</p>
								<p className="title">CLASES TOTALES : {studentDetails.length}</p>
								<p className="title">TIEMPO TOTAL: {totalTimeOverall} horas</p>
							</div>
						</div>
						<div className="card m-3 col-4">
							<div className="card-body text-center">
								<h5 className="card-title">Dinero acumulado en MES EN CURSO AQUI</h5>
							</div>
						</div>
						<div className="card m-3 col-4">
							<div className="card-body text-center">
								<h5 className="card-title">Total dinero generado</h5>
								<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
							</div>
						</div>
					</div>
					<div className="d-flex justify-content-center">
						<RegisterClass student={student} getStudent={getStudent} getStudentDetails={getStudentDetails} />
					</div>
				</div>
			</div>
		</>
	);
};
