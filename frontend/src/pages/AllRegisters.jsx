import { useEffect, useState } from "react";
import useStore from "../store";
import "../styles/cardStudents.css";

export const AllRegisters = () => {
	const { backendUrl, userLogged } = useStore();
	const [allDetails, setAllDetails] = useState([]);

	const getAllDetails = async () => {
		const requestOptions = {
			method: "GET",
			redirect: "follow"
		};

		try {
			const response = await fetch(`${backendUrl}/student-details/user/${userLogged.id}`, requestOptions);
			const result = await response.json();
			setAllDetails(result.reverse());
			console.log(result);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		getAllDetails();
	}, []);
	const formatToDDMMYY = (dateString) => {
		const date = new Date(dateString);
		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const year = String(date.getFullYear()).slice(-2);
		return `${day}/${month}/${year}`;
	};
	return (
		<div className="container mt-5">
			<div className="row scrollmenu">
				{allDetails.map((detail) => {
					return (
						<div className="col-2" key={detail.id}>
							<div className="card">
								<div className="card-body">
									<div className="text-center">
										<h5 className="card-title title text-nowrap overflow-hidden text-truncate">{detail.student_name}</h5>
									</div>
									<div className="text-center m-1">
										<p className="title">{formatToDDMMYY(detail.date)}</p>
										<p className="m-0 fw-bold">
											{detail.hourly_rate * detail.time} {detail.student_coin}
										</p>
										<p className="fw-bold">{detail.time} hrs</p>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
