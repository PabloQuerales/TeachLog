import { useEffect, useState } from "react";
import useStore from "../store";
import { useParams } from "react-router-dom";
import { RegisterClass } from "../components/RegisterClass";
import "../styles/studentDetail.css";

export const StudentDetails = () => {
	const { backendUrl } = useStore();
	const pathname = useParams();

	const [student, setStudent] = useState([]);
	const [studentDetails, setStudentDetails] = useState([]);

	const [classesThisMonth, setClassesThisMonth] = useState(0);
	const [classesLastMonth, setClassesLastMonth] = useState(0);
	const [totalTimeThisMonth, setTotalTimeThisMonth] = useState(0);
	const [totalTimeLastMonth, setTotalTimeLastMonth] = useState(0);
	const [totalTimeOverall, setTotalTimeOverall] = useState(0);

	const [balanceThisMonth, setBalanceThisMonth] = useState(0);
	const [balanceLastMonth, setBalanceLastMonth] = useState(0);
	const [balanceOverall, setBalanceOverall] = useState(0);

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
			let resultReverse = result.reverse();
			setStudentDetails(resultReverse);
			const now = new Date();
			const currentMonth = now.getMonth();
			const currentYear = now.getFullYear();

			let lastMonth = currentMonth - 1;
			let lastMonthYear = currentYear;
			if (lastMonth < 0) {
				lastMonth = 11;
				lastMonthYear--;
			}

			const filteredClassesThisMonth = result.filter((detail) => {
				const detailDate = new Date(detail.date);
				return detailDate.getMonth() === currentMonth && detailDate.getFullYear() === currentYear;
			});

			setClassesThisMonth(filteredClassesThisMonth.length);

			const filteredClassesLastMonth = result.filter((detail) => {
				const detailDate = new Date(detail.date);
				return detailDate.getMonth() === lastMonth && detailDate.getFullYear() === lastMonthYear;
			});
			setClassesLastMonth(filteredClassesLastMonth.length);
			const lastMonthlyTimeSum = filteredClassesLastMonth.reduce((sum, detail) => sum + detail.time, 0);
			setTotalTimeLastMonth(lastMonthlyTimeSum);

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

	useEffect(() => {
		if (student && student.price !== undefined) {
			const price = parseFloat(student.price);

			setBalanceThisMonth(totalTimeThisMonth * price);
			setBalanceLastMonth(totalTimeLastMonth * price);
			setBalanceOverall(totalTimeOverall * price);
		}
	}, [student, totalTimeThisMonth, totalTimeLastMonth, totalTimeOverall]);

	if (!student) {
		return <div className="text-white">Cargando detalles del estudiante...</div>;
	}
	const formatToDDMMYY = (dateString) => {
		const date = new Date(dateString);
		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0"); // Meses son 0-indexados
		const year = String(date.getFullYear()).slice(-2); // Últimos dos dígitos del año
		return `${day}/${month}/${year}`;
	};

	return (
		<>
			<div className="container p-0 d-flex flex-column vw-100 align-items-center">
				<div className="user-header">
					<img src={`https://api.dicebear.com/9.x/initials/svg?seed=${student.name}`} className="user-avatar" />
					<i className="bi bi-gear user-avatar-edit-icon" onClick={() => console.log("Editar perfil")}></i>
				</div>
				<div className="user-content container d-flex flex-column justify-content-start">
					<div className="row justify-content-around ">
						<div className="card col-4 m-3 mb-0" style={{ maxWidth: "400px" }}>
							<div className="card-body">
								<h2 className="card-title title text-center">Información</h2>
								<div className="row">
									<div className="col-7">
										<p className="title fs-4">{student.name}</p>
									</div>
									<div className="col-5">
										<p className="fs-4 ms-1">
											Nivel <span className="title">{student.level} </span>
										</p>
									</div>
								</div>
								<div className="row text-center">
									<div className="col">
										<p className="fw-bold">
											Persona de Contacto <span className="title">{student.contact_name}</span>
										</p>
									</div>
									<div className="col">
										<p className="fw-bold">
											Teléfono de Contacto
											<br />
											<span className="title">{student.contact_phone}</span>
										</p>
									</div>
								</div>
								<div className="row text-center">
									<div className="col">
										<p className="fw-bold">
											Precio por Hora
											<br />
											<span className="title">
												{student.price} {student.coin}
											</span>
										</p>
									</div>
									<div className="col">
										<p className="fw-bold">
											Status
											<br />
											<span className="title"> {student.status ? "Activo" : "Inactivo"}</span>
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="card m-3 col-4 mb-0 " style={{ maxWidth: "400px" }}>
							<div className="card-body">
								<h2 className="card-title title text-center">Resumen de Clases</h2>
								<div className="row">
									<div className="col">
										<p className="fw-bold text-center">
											Clases este mes
											<br />
											<span className="title">{classesThisMonth === 0 ? "No se han registrado clases este mes" : classesThisMonth}</span>
										</p>
									</div>
									<div className="col">
										<p className="fw-bold text-center">
											Tiempo este mes
											<br />
											<span className="title">{totalTimeThisMonth} horas</span>
										</p>
									</div>
								</div>
								<div className="row">
									<div className="col">
										<p className="fw-bold text-center">
											Clases mes anterior
											<br />
											<span className="title">{classesLastMonth}</span>
										</p>
									</div>
									<div className="col">
										<p className="fw-bold text-center">
											Tiempo mes anterior
											<br />
											<span className="title">{totalTimeLastMonth} horas</span>
										</p>
									</div>
								</div>
								<div className="row">
									<div className="col">
										<p className="fw-bold text-center">
											Total de Clases
											<br />
											<span className="title">{studentDetails.length}</span>
										</p>
									</div>
									<div className="col">
										<p className="fw-bold text-center">
											Total de Tiempo
											<br />
											<span className="title">{totalTimeOverall} horas</span>
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="card m-3 col-4 mb-0" style={{ maxWidth: "400px" }}>
							<div className="card-body text-center">
								<h2 className="card-title title text-center">Balance</h2>
								<div className="row d-flex align-items-center mb-3">
									<div className="col fw-bold">
										<p>Mes en curso</p>
									</div>
									<div className="col fw-bold">
										<p>Mes Anterior</p>
									</div>
									<div className="col fw-bold">Total Generado</div>
								</div>
								<div className="row">
									<div className="col title">
										{balanceThisMonth} {student.coin}
									</div>
									<div className="col title">
										{balanceLastMonth} {student.coin}
									</div>
									<div className="col title">
										{balanceOverall} {student.coin}
									</div>
								</div>
							</div>
						</div>
						<div className="card m-3 col-4 mb-0" style={{ maxWidth: "400px" }}>
							<div className="card-body text-center">
								<div className="row align-items-center">
									<div className="col-10">
										<h3 className="card-title title text-center m-2">Últimos Registros</h3>
									</div>
									<div className="col">
										<RegisterClass student={student} getStudent={getStudent} getStudentDetails={getStudentDetails} />
									</div>
								</div>
								<div className="row scrollmenu-y">
									{studentDetails.map((detail) => {
										return (
											<>
												<div className="col-4 p-1 pb-2  ">
													<div className="card bg-secondary">
														<p className="m-0">
															Fecha
															<br />
															<span className="title">{formatToDDMMYY(detail.date)}</span>
														</p>
														<p className="fw-bold">{detail.time} hrs</p>
													</div>
												</div>
											</>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
