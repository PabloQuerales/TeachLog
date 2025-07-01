import "../styles/deletStudents.css";
import useStore from "../store";

export const DeletStudents = (props) => {
	const { backendUrl } = useStore();
	const deleteStudent = async () => {
		const requestOptions = {
			method: "PUT",
			redirect: "follow"
		};

		try {
			const response = await fetch(`${backendUrl}/delete_student/${props.studentId}`, requestOptions);
			if (response.status === 200) {
				props.getStudents();
			}
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<>
			<div className="tooltip-wrapper">
				<button type="submit" className="btn btn-danger btn-sm w-50 " onClick={deleteStudent}>
					<i className="bi bi-trash3-fill"></i>
				</button>
				<span className="tooltip-text">Eliminar estudiante</span>
			</div>
		</>
	);
};
